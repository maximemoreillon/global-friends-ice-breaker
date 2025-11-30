import { currentUser } from "$lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  Firestore,
} from "firebase/firestore";
import { defaults, superValidate } from "sveltekit-superforms";
import { zod, zod4, zod4Client } from "sveltekit-superforms/adapters";
import z from "zod";

async function getQuestion(db: Firestore) {
  // TODO: filter questions from users that are checked in
  const q = query(collection(db, "questions"));

  const querySnapshot = await getDocs(q);

  const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length);

  const randomDoc = querySnapshot.docs[randomIndex];

  return { id: randomDoc.id, playText: randomDoc.data().playText };
}

async function getTarget(db: Firestore, questionId: string) {
  // TODO: where condition to only fetch users that have answered
  // TODO: only fetch users that have answers
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length);

  const randomDoc = querySnapshot.docs[randomIndex];

  const answer = randomDoc.data().answers[questionId];

  return { id: randomDoc.id, answer };
}

export const load = async () => {
  const db = getFirestore();

  const question = await getQuestion(db);

  const target = await getTarget(db, question.id);
  return { question, target };
};
