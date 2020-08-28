import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'scm-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  @Input() field: any;
  @Input() form: any;

  get isValid(): boolean {
    return this.form.controls[this.field.name]?.valid;
  }
  get isDirty(): boolean {
    return this.form.controls[this.field.name]?.dirty;
  }
  constructor() {}

  ngOnInit(): void {}
}
