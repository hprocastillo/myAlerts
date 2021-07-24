import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import firebase from "firebase/app";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  async loginGoogle() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          const user = firebase.auth().currentUser;
          let userRef = firebase.firestore().collection('users').doc(user?.uid);
          userRef.set({
            id: user?.uid,
            userDisplayName: user?.displayName,
            userEmail: user?.email,
            userPhotoUrl: user?.photoURL
          }).then(function () {
          })
        });
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (err) {
      console.log(err);
    }
  }
}
