import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export const load = async () => {
  const db = getFirestore();
  const q = query(collection(db, "questions"));

  const querySnapshot = await getDocs(q);

  const questions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
  }));

  return {
    questions,
  };
};
