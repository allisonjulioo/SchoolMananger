import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from './../../../../services/dynamic-form/dynamic-form.service';

@Component({
  selector: 'track-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  isHovering: boolean;
  progress: number;
  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty(): boolean {
    return this.form.controls[this.field.name].dirty;
  }
  constructor(private dynamicFormService: DynamicFormService) {}
  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.field.value = event.target.result;
      };
    }
  }
  public toggleHover(e: Event): void {
    console.log(e);
  }
  ngOnInit(): void {
    this.dynamicFormService.inTransfer.subscribe((res) => {
      if (res?.type === 'uploaded') {
        console.log(res?.data);
        this.field.value = res?.data;
        this.form.patchValue({ picture: res?.data });
        console.log(this.field, this.form);
      }
      this.progress = parseInt(
        ((res?.data.bytesTransferred * 100) / res?.data.totalBytes).toFixed(0),
        0
      );
      console.log(this.progress);
    });
  }
}
