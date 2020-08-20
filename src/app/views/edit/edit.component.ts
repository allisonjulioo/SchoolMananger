import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pupilsService: PupilsService,
    private classesService: ClassesService,
    private teachersService: TeachersService
  ) {}
  get f(): any {
    return this.pupilsForm.controls;
  }

  pupilsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    responsible_name: new FormControl('', Validators.required),
  });
  classessForm = new FormGroup({
    age_range: new FormControl('', Validators.required),
    end_time: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    responsible_teacher: new FormControl('', Validators.required),
    start_time: new FormControl('', Validators.required),
  });
  teachersForm = new FormGroup({
    name: new FormControl('', Validators.required),
    classes: new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      responsible_teacher: new FormControl('', Validators.required),
    }),
  });
  ngOnInit(): void {
    if (!this.isNewRegister) {
      this.getDataFromCollection(this.id);
    }
  }
  getDataFromCollection(id: string): void {
    this[this.service].getById(id).subscribe((res: FormGroup) => {
      this.pupilsForm.patchValue(res);
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
      .create(this.pupilsForm.value)
      .then(() => this.router.navigate(['main', 'list', this.collection]));
  }
  update(): void {
    this[this.service]
      .update(this.pupilsForm.value, this.id)
      .then(() => this.router.navigate(['main', 'list', this.collection]));
  }
}
