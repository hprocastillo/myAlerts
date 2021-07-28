import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Customer {
  id?: string;
  name: string;
  ruc: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string; //from session
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
