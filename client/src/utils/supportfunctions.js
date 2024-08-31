import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 1, name: 'Chill', value: 'chill' },
  { id: 2, name: 'Jasp', value: 'jasp' },
  { id: 3, name: 'Rock', value: 'rock' },
  { id: 4, name: 'Melody', value: 'melody' },
  { id: 5, name: 'Karoke', value: 'karoke' },
];

export const filterByLanguage = [
    { id: 1, name: 'Hindi', value: 'hindi' },
    { id: 2, name: 'Punjabi', value: 'punjabi' },
    { id: 3, name: 'Bhojpuri', value: 'bhojpuri' },
    { id: 4, name: 'Haryanvi', value: 'haryanvi' },
    { id: 5, name: 'Telgu', value: 'telgu' },
];

export const deleteAnObject = (referenceUrl) => {
    const deleteRef = ref(storage, referenceUrl);
    deleteObject(deleteRef)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };