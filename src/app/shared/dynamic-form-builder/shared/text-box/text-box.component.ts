import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'track-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent implements OnInit {
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
