import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilsService {
  public afs: AngularFirestore;
  constructor(@Inject('collection') public collection: string) {}

  public get(): Observable<any[]> {
    return this.afs.collectionGroup(this.collection).valueChanges();
  }
}
