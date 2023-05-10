import { BsX } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';

import style from './TodoItem.module.scss';

export default function TodoItem({ todo }) {
  return (
    <label className={style.container}>
      <div className={style.checkboxContainer}>
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
      <div className={style.deleteIcon}>
        <BsX />
      </div>
    </label>
  );
}
