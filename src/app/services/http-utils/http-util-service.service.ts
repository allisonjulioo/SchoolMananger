import { Inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilsService {
  public afs: AngularFirestore;
  public itemDoc: AngularFirestoreDocument;
  constructor(
    @Inject('collection') public collection: string,
    private storage?: AngularFireStorage
  ) {}

  public getById(id: string): Observable<any> {
    return this.afs
      .collection(this.collection)
      .doc(id)
      .get()
      .pipe(
        map((res) => {
          return { id: res.id, ...res.data() };
        })
      );
  }
  public get(): any {
    return this.afs
      .collection(this.collection)
      .get()
      .pipe(
        map((res) => {
          const data = res.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          return data;
        })
      );
  }
  public async create(data: any): Promise<DocumentReference> {
    return await this.afs.collection(this.collection).add(data);
  }
  public update(data: any, id: string): Promise<void> {
    this.itemDoc = this.afs.doc(`${this.collection}/${id}`);
    return this.itemDoc.set(data);
  }
  public async delete(id: string): Promise<void> {
    this.itemDoc = this.afs.doc(`${this.collection}/${id}`);
    return this.itemDoc.delete();
    return this.itemDoc.delete();
  }
  public async upload(event): Promise<any> {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`images/${n}`, file);
    return task
      .snapshotChanges()
      .pipe(finalize(() => fileRef.getDownloadURL()));
  }
}
