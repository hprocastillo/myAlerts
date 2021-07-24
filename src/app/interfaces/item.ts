import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Item {
  id?: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
  itemName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
