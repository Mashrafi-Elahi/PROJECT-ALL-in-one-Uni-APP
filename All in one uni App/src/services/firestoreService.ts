
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';

// Generic types for better type safety
export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

// Service for handling Firestore operations
class FirestoreService {
  // Create a new document
  async create(collectionName: string, data: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  // Update an existing document
  async update(collectionName: string, id: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  }

  // Delete a document
  async delete(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document in ${collectionName}:`, error);
      throw error;
    }
  }

  // Get all documents from a collection
  async getAll(collectionName: string): Promise<FirestoreDocument[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error);
      throw error;
    }
  }

  // Get a single document by ID
  async getById(collectionName: string, id: string): Promise<FirestoreDocument | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  }

  // Query documents based on conditions
  async query(
    collectionName: string, 
    conditions: { field: string; operator: "==" | "<" | ">" | "<=" | ">="; value: any }[], 
    orderByField?: string, 
    isDescending?: boolean
  ): Promise<FirestoreDocument[]> {
    try {
      let q = collection(db, collectionName);
      
      // Apply conditions
      let queryRef = query(q, ...conditions.map(c => where(c.field, c.operator, c.value)));
      
      // Apply ordering if specified
      if (orderByField) {
        queryRef = query(queryRef, orderBy(orderByField, isDescending ? 'desc' : 'asc'));
      }
      
      const querySnapshot = await getDocs(queryRef);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error querying documents from ${collectionName}:`, error);
      throw error;
    }
  }
}

export const firestoreService = new FirestoreService();
