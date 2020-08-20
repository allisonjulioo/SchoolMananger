import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { PupilsService } from 'src/app/services/pupils/pupils.service';
import { TeachersService } from 'src/app/services/teachers/teachers.service';

@Component({
  selector: 'track-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  collection = this.activatedRoute.snapshot.params.type;
  id = this.activatedRoute.snapshot.params.id;
  service = `${this.collection}Service`;
  isNewRegister = this.id === 'new';
  public form: FormGroup;
  unsubcribe: any;
  public fields: any[] = [
    {
      type: 'file',
      name: 'picture',
      label: 'Picture',
      required: true,
      onUpload: this.onUpload.bind(this),
    },
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },

    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'in', label: 'India' },
        { key: 'us', label: 'USA' },
      ],
    },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' },
      ],
    },
    {
      type: 'checkbox',
      name: 'hobby',
      label: 'Hobby',
      required: true,
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' },
      ],
    },
  ];
  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pupilsService: PupilsService,
    private classesService: ClassesService,
    private teachersService: TeachersService
  ) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }
  ngOnInit(): void {
    if (!this.isNewRegister) {
      this.getDataFromCollection(this.id);
    }
  }
  onUpload(e): void {
    console.log(e);
  }
  getFields(): any[] {
    return this.fields;
  }
  getDataFromCollection(id: string): void {
    this[this.service].getById(id).subscribe((res: FormGroup) => {
      this.form.patchValue(res);
    });
  }
  onSubmit(): void {
    if (this.isNewRegister) {
      this.create();
    } else {
      this.update();
    }
  }
  create(): void {
    this[this.service]
      .create(this.form.value)
      .then(() => this.router.navigate(['main', 'list', this.collection]));
  }
  update(): void {
    this[this.service]
      .update(this.form.value, this.id)
      .then(() => this.router.navigate(['main', 'list', this.collection]));
  }
}
