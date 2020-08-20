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
  constructor() {}
  public isChecked(key: string, listKey: string): boolean {
    return key === listKey;
  }
  ngOnInit(): void {}
}
