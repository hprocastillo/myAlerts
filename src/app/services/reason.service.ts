import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Reason} from "../interfaces/reason";
import {Supplier} from "../interfaces/supplier";

@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  reasons: Observable<Reason[]>;
  reasonsCollection: AngularFirestoreCollection<Reason>;

  constructor(private readonly afs: AngularFirestore) {
    this.reasonsCollection = afs.collection<Reason>('reasons', ref => ref.orderBy('description', 'desc'));
    this.reasons = this.reasonsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reason;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveReason(reason: Reason, reasonId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = reasonId || this.afs.createId();
        const data = {id, ...reason};
        const result = await this.reasonsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
  getReasonById(reasonId: string) {
    return this.afs.collection<Reason>('reasons').doc(reasonId).valueChanges();
  }
  getReason(): any {
    return this.reasons;
  }

  deleteReason(reasonId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.reasonsCollection.doc(reasonId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
