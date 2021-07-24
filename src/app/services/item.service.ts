import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Item} from "../interfaces/item";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Observable<Item[]>;
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as File;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveFile(item: Item, itemId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = itemId || this.afs.createId();
        const data = {id, ...item};
        const result = await this.itemsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getItems(): any {
    return this.items;
  }
}
