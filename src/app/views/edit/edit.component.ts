import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { PupilsService } from 'src/app/services/pupils/pupils.service';
import { TeachersService } from 'src/app/services/teachers/teachers.service';

@Component({
  selector: 'track-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  service = `${this.activatedRoute.snapshot.params.type}Service`;
  constructor(
    public afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private pupilsService: PupilsService,
    private classesService: ClassesService,
    private teachersService: TeachersService
  ) {}
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    responsible_name: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getAll();
  }
  onSubmit(): void {
    this[this.service]
      .create(this.profileForm.value)
      .then((res) => console.log(res));
  }
  delete(id: string): void {
    this[this.service].delete(id).then((res) => console.log(res));
  }
  public getAll(): void {
    this[this.service].getById('ALixbjrDTST9d2e9kDyc').subscribe(
      (doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          console.log('No such document!');
        }
      },
      (error) => {
        console.log('Error getting document:', error);
      }
    );
  }
}
