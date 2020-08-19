import { Inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilsService {
  public afs: AngularFirestore;
  public itemDoc: AngularFirestoreDocument;
  constructor(@Inject('collection') public collection: string) {}

  public getById(id: string): any {
    return this.afs.collection(this.collection).doc(id).get();
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
}
