import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'track-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
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
}
