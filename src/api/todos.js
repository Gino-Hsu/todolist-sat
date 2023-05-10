// Firebase CRUD
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
// Firebase collection
const todosCollectionRef = collection(db, 'todos');

// 取得所有 TODOS
export const getTodos = async () => {
  try {
    const data = await getDocs(todosCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error);
  }
};
