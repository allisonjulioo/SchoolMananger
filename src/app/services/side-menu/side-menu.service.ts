import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { SideMenu } from 'src/app/models/side-menu/side-menu';
import { HttpUtilsService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService extends HttpUtilsService {
  public currentMenu$: BehaviorSubject<SideMenu> = new BehaviorSubject(null);
  public currentMenu = this.currentMenu$.asObservable();
  constructor(public afs: AngularFirestore) {
    super('side-menu');
  }
}
