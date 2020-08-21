import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SideMenu } from 'src/app/models/side-menu/side-menu';
import { HttpUtilsService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends HttpUtilsService {
  public currentMenu$: BehaviorSubject<SideMenu> = new BehaviorSubject(null);
  public currentMenu = this.currentMenu$.asObservable();
  constructor(public afs: AngularFirestore) {
    super('users');
  }

  public getUser(id: string): Observable<any> {
    return this.afs
      .collection('/users', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(map((res) => res));
  }
}
