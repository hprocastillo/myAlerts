import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Alert {
  id?: string;
  nameAlert: string;
  dateAlert: string;
  timeAlert: string;
  dateTimeAlert: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;//from session
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
