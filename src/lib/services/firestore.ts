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
  getDoc,
} from "firebase/firestore";

// getData
export async function getData<T>(collectionName: string): Promise<T[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(
    (d) => ({ id: d.id, ...(d.data() as Omit<T, "id">) }) as T
  );
}

// getDetail
export async function getDetail<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef: DocumentReference<DocumentData> = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as Omit<T, "id">) } as T;
  }
  return null;
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
