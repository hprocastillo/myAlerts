import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {TypeContract} from "../interfaces/type-contract";
import {Supplier} from "../interfaces/supplier";

@Injectable({
  providedIn: 'root'
})
export class TypeContractService {
  typeContracts: Observable<TypeContract[]>;
  typeContractsCollection: AngularFirestoreCollection<TypeContract>;

  constructor(private readonly afs: AngularFirestore) {
    this.typeContractsCollection = afs.collection<TypeContract>('typeContracts', ref => ref.orderBy('name', 'asc'));
    this.typeContracts = this.typeContractsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TypeContract;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveTypeContract(typeContract: TypeContract, typeContractId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = typeContractId || this.afs.createId();
        const data = {id, ...typeContract};
        const result = await this.typeContractsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getTypeContractById(typeContractId: string) {
    return this.afs.collection<TypeContract>('typeContracts').doc(typeContractId).valueChanges();
  }

  getTypeContract(): any {
    return this.typeContracts;
  }

  deleteTypeContract(contractId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.typeContractsCollection.doc(contractId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
