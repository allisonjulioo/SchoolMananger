import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'track-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent implements OnChanges, OnInit {
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
  public ngOnChanges(changes: any): void {
    if (changes?.field?.currentValue) {
      this.field.value = changes.field.currentValue.value;
      console.log(changes.field.currentValue);
    }
  }
}
