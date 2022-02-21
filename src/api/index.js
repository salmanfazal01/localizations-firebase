import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Add a new locale file to localas database
export const addLocaleFile = async (fileName, languages) => {
  const newLocaleRef = doc(collection(db, "locales"));

  return await setDoc(newLocaleRef, {
    _filename: fileName,
    ...languages,
    timestamp: serverTimestamp(),
    id: newLocaleRef.id,
  }).catch((err) => console.error(err));
};

export const updateLocaleField = async (id, lang, word, update) => {
  const itemRef = doc(db, "locales", id);
  return await updateDoc(itemRef, {
    [`${lang}.${word}`]: update,
  }).catch((err) => console.error(err));
};

export const updateLocaleFields = async (id, word, data) => {
  const itemRef = doc(db, "locales", id);

  const _data = Object.keys(data).reduce((acc, lang) => {
    if (lang !== "word") acc[`${lang}.${word}`] = data[lang];
    return acc;
  }, {});

  return await updateDoc(itemRef, _data, { merge: true }).catch((err) =>
    console.error(err)
  );
};

export const addNewLocale = async (id, word, data) => {
  console.log(id, word, data);

  const _data = Object.keys(data).reduce((acc, lang) => {
    if (lang !== "word") acc[`${lang}.${word}`] = data[lang];
    return acc;
  }, {});

  const itemRef = doc(db, "locales", id);

  return await updateDoc(itemRef, _data, { merge: true }).catch((err) =>
    console.error(err)
  );
};
