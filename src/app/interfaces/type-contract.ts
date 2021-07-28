import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface TypeContract {
  id?:string;
  name:string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string; //from session
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
