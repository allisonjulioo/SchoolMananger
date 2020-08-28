import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'scm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  unsubcribe: any;
  public fields: any[] = [
    {
      type: 'file',
      name: 'picture',
      label: '',
      value: 'form?.picture',
      onUpload: this.onUpload.bind(this),
    },
    {
      type: 'text',
      name: 'name',
      label: 'Nome',
      value: 'form?.name',
      required: true,
    },
    {
      type: 'number',
      name: 'age',
      label: 'Idade',
      value: 'form?.age',
      required: true,
    },
    {
      type: 'text',
      name: 'photoUrl',
      label: 'Avatar',
      value: 'form?.photoUrl',
      required: true,
    },
    {
      type: 'text',
      name: 'role',
      label: 'Ocupação',
      value: 'form?.role',
      required: true,
    },
  ];
  constructor() {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      this.fields = JSON.parse(update.fields);
    });
  }
  onUpload(event: Event): void {
    /**
     * @todo
     * Event upload
     */
  }
  ngOnInit(): void {}
  onSubmit(value: FormControl | any): void {
    /**
     * @todo
     * Event submit
     */
  }
}
