import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Contract} from "../interfaces/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  contracts: Observable<Contract[]>;
  contractsCollection: AngularFirestoreCollection<Contract>;

  constructor(private readonly afs: AngularFirestore) {
    this.contractsCollection = afs.collection<Contract>('contracts', ref => ref.orderBy('dateEnd', 'desc'));
    this.contracts = this.contractsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contract;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveContract(contract: Contract, contractId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = contractId || this.afs.createId();
        const data = {id, ...contract};
        const result = await this.contractsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getContracts(): any {
    return this.contracts;
  }

  deleteContract(contractId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractsCollection.doc(contractId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
