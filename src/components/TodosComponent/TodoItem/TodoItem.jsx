import { BsX } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';
import { updateIsDone, deleteTodo } from '../../../api/todos';
import { useTodosContext } from '../../../context/TodosContext';

import style from './TodoItem.module.scss';

export default function TodoItem({ todo }) {
  const { handleTodoIsDone, handleTodoFilter } = useTodosContext();

  // 點擊"勾選框"的 event handler
  const handleTodoChecked = e => {
    e.stopPropagation();
    const toggleIsDone = !todo.isDone; // toggle isDone 為 true/false
    // 跟新 firebase 單筆 todo 資料
    updateIsDone({ id: todo.id, isDone: toggleIsDone })
      .then(() => {
        // 完成資料庫跟新後，前端直接做 re-render，這裡選擇不再重新跟資料庫要資料
        handleTodoIsDone({ id: todo.id, isDone: toggleIsDone });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 點擊"刪除鍵"的 event handler
  const handleTodoDelete = e => {
    e.stopPropagation();
    // 刪除 firebase 單筆 todo
    deleteTodo({ id: todo.id })
      .then(() => {
        // 完成資料庫刪除後，前端直接做 re-render，這裡選擇不再重新跟資料庫要資料
        handleTodoFilter({ id: todo.id });
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className={style.container}>
      <div
        className={style.checkboxContainer}
        onClick={e => handleTodoChecked(e)}
      >
        <input
          type='checkbox'
          className={todo.isDone ? style.checkbox__done : style.checkbox}
        />
        {todo.isDone && (
          <div className={style.checkIcon}>
            <HiCheck />
          </div>
        )}
      </div>

      <h3 className={todo.isDone ? style.title__done : style.title}>
        {todo.title}
      </h3>
      <div className={style.deleteIcon} onClick={e => handleTodoDelete(e)}>
        <BsX />
      </div>
    </div>
  );
}
