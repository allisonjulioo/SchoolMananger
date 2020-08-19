import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { HttpUtilsService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesService extends HttpUtilsService {
  public currentMenu$: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentMenu = this.currentMenu$.asObservable();
  constructor(public afs: AngularFirestore) {
    super('classes');
  }
}
