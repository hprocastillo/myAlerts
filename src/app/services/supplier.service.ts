import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Supplier} from "../interfaces/supplier";
import {Customer} from "../interfaces/customer";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliers: Observable<Supplier[]>;
  suppliersCollection: AngularFirestoreCollection<Supplier>;

  constructor(private readonly afs: AngularFirestore) {
    this.suppliersCollection = afs.collection<Supplier>('suppliers', ref => ref.orderBy('name', 'asc'));
    this.suppliers = this.suppliersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Supplier;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveSupplier(supplier: Supplier, supplierId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = supplierId || this.afs.createId();
        const data = {id, ...supplier};
        const result = await this.suppliersCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }


  getSupplierById(supplierId: string) {
    return this.afs.collection<Supplier>('suppliers').doc(supplierId).valueChanges();
  }

  getSuppliers(): any {
    return this.suppliers;
  }

  deleteSupplier(supplierId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.suppliersCollection.doc(supplierId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
