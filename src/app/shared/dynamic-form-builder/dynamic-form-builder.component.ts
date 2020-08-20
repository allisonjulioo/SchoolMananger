import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'track-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss'],
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() public save: EventEmitter<any> = new EventEmitter();
  @Input() fields: any[] = [];
  form: FormGroup;
  constructor() {}

  async ngOnInit(): Promise<void> {
    const fieldsCtrls = {};
    let data = [];
    for (const field of this.fields) {
      if (field.type !== 'checkbox') {
        fieldsCtrls[field.name] = new FormControl(
          field.value || '',
          Validators.required
        );
      } else {
        const opts = {};
        field.options.then((val) => {
          data = val;
          for (const opt of data) {
            opts[opt.key] = new FormControl(opt);
          }
          fieldsCtrls[field.name] = new FormGroup(opts);
          this.form = new FormGroup(fieldsCtrls);
        });
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }
}
