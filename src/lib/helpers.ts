import type { DocumentData } from "firebase/firestore";

export function playerIsActive(doc: DocumentData) {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  return doc.data().lastCheckIn.seconds * 1000 > oneHourAgo.getTime();
}
