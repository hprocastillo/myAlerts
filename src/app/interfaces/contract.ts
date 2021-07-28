import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Contract {
  id?: string;
  customerId: string;
  code: string;
  typeContractId: string;//from typeContracts collection
  supplierId: string; //from suppliers collection
  reasonId: string; // from reasons collection
  agreedPayment: string;
  observations: string;
  attachments: boolean;
  fileUrl?: string;
  dateStart: Timestamp;
  dateEnd: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string; //from session
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
