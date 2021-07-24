import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {User} from "../interfaces/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private readonly afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getUserById(userId: string) {
    return this.afs.collection<User>('users', ref => ref.where('id', '==', userId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {id, ...data};
        })));
  }

  getUsers(): any {
    return this.users;
  }
}
