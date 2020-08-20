import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { PupilsService } from 'src/app/services/pupils/pupils.service';
import { TeachersService } from 'src/app/services/teachers/teachers.service';
import { DynamicFormService } from './../../services/dynamic-form/dynamic-form.service';

@Component({
  selector: 'track-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnDestroy, OnInit {
  collection = this.activatedRoute.snapshot.params.type;
  id = this.activatedRoute.snapshot.params.id;
  service = `${this.collection}Service`;
  isNewRegister = this.id === 'new';
  public form: FormGroup;
  unsubcribe: any;
  public fields: any[];
  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pupilsService: PupilsService,
    private classesService: ClassesService,
    private teachersService: TeachersService,
    private dynamicFormService: DynamicFormService
  ) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }
  async ngOnInit(): Promise<void> {
    if (!this.isNewRegister) {
      this.getDataFromCollection(this.id);
    }
    this.fields = this.dynamicFormService.getForm(this.collection);
    this.dynamicFormService.currentForm.subscribe((form) => {
      console.log(form);
      // this.form.patchValue(form);
    });
  }

  getDataFromCollection(id: string): void {
    this[this.service].getById(id).subscribe((res: FormGroup) => {
      this.dynamicFormService.currentForm$.next(res);
    });
  }
  onSubmit(value: FormControl): void {
    if (this.isNewRegister) {
      this.create(value);
    } else {
      this.update(value);
    }
  }
  create(value: FormControl): void {
    this[this.service]
      .create(value)
      .then(() => this.router.navigate(['main', 'list', this.collection]));
  }
  update(value: FormControl): void {
    this[this.service]
      .update(value, this.id)
      .then(() => this.router.navigate(['main', 'list', this.collection]));
  }
  ngOnDestroy(): void {
    // this.unsubcribe();
  }
}
