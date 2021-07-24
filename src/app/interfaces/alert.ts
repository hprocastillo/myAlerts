import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Alert {
  id?: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
  nameAlert: string;
  dateTimeAlert: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
