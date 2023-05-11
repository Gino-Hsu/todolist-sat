import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { createTodo } from '../../api/todos';
import { useTodosContext } from '../../context/TodosContext';

import style from './AddTodo.module.scss';

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState('');
  const { handleRerenderTodos, handleCompleteStatePending, addTodoComplete } =
    useTodosContext();

  const handleOnSubmit = e => {
    e.stopPropagation();
    // 當輸入為'空白'時，不進行提交
    if (newTodo.trim() === '') return;

    // 點擊提送按鈕時跟新 addTodoComplete 為 'pending'
    handleCompleteStatePending('pending');

    // firebase 創建新的 todo
    createTodo({ newTodo })
      .then(() => {
        // 創建成功後，清空輸入框
        setNewTodo('');
        // 創建成功後，跟新 Todos & re-render
        handleRerenderTodos();
      })
      .catch(err => {
        console.error(err);
        return;
      });
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Add to list</h2>
      <div className={style.inputContainer}>
        <input
          type='text'
          className={style.input}
          onChange={e => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button
          onClick={e => handleOnSubmit(e)}
          disabled={addTodoComplete === 'pending' ? true : false}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
