// Firebase CRUD
import { db } from '../firebase-config';
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

// Firebase collection
const todosCollectionRef = collection(db, 'todos');

// 取得所有 todos
export const getTodos = async () => {
  try {
    // 對 firebase 中項目的創建時間 (createAt) 進行排序 ('asc' 遞增)
    const queryData = query(todosCollectionRef, orderBy('createAt', 'asc'));
    // 取得所有排序後的 todos
    const data = await getDocs(queryData);

    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw error;
  }
};

// 新增單筆 todo
export const createTodo = async data => {
  try {
    await addDoc(todosCollectionRef, {
      title: data.newTodo,
      isDone: false,
      createAt: serverTimestamp(), // todo 創建時間
    });
  } catch (error) {
    throw error;
  }
};

// 跟新單筆 todo 的 isDone
export const updateIsDone = async ({ id, isDone }) => {
  try {
    const todoDoc = doc(db, 'todos', id); // 依 id 取得單筆 todo
    const newFields = { isDone: isDone }; // 建立新的 isDone
    await updateDoc(todoDoc, newFields);
  } catch (error) {
    throw error;
  }
};

// 刪除單筆 todo
export const deleteTodo = async ({ id }) => {
  try {
    const todoDoc = doc(db, 'todos', id); // 依 id 取得單筆 todo
    await deleteDoc(todoDoc);
  } catch (error) {
    throw error;
  }
};
