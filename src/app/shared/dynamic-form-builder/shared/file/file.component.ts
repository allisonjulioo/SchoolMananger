import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'track-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty(): boolean {
    return this.form.controls[this.field.name].dirty;
  }
  constructor() {}

  ngOnInit(): void {}
  ngOnChange(): void {
    console.log(this.field.value);
    // this.field.value.
  }
}
