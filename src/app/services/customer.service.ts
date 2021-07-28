import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Supplier} from "../interfaces/supplier";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Customer} from "../interfaces/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Observable<Customer[]>;
  customersCollection: AngularFirestoreCollection<Customer>;

  constructor(private readonly afs: AngularFirestore) {
    this.customersCollection = afs.collection<Supplier>('customers', ref => ref.orderBy('name', 'asc'));
    this.customers = this.customersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Customer;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveCustomer(customer: Customer, customerId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = customerId || this.afs.createId();
        const data = {id, ...customer};
        const result = await this.customersCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getCustomerById(customerId: string) {
    return this.afs.collection<Customer>('customers').doc(customerId).valueChanges();
  }

  getCustomers(): any {
    return this.customers;
  }

  deleteCustomer(customerId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.customersCollection.doc(customerId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
