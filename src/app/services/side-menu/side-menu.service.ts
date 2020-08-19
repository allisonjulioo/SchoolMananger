import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpUtilsService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService extends HttpUtilsService {
  constructor(public afs: AngularFirestore) {
    super('side-menu');
  }
}
