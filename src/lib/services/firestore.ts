import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";

// getData
export async function getData<T>(collectionName: string): Promise<T[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(
    (d) => ({ id: d.id, ...(d.data() as Omit<T, "id">) }) as T
  );
}

// addData
export async function addData<T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

// updateData (fix type)
export async function updateData<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef: DocumentReference<DocumentData> = doc(db, collectionName, id);
  await updateDoc(docRef, data as DocumentData);
}

// deleteData
export async function deleteData(
  collectionName: string,
  id: string
): Promise<void> {
  const docRef: DocumentReference<DocumentData> = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
