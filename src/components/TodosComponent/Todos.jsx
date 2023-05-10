import { Fragment, useState } from 'react';
import TodoItem from './TodoItem/TodoItem';

import style from './Todos.module.scss';

export default function Todos({ todoItems }) {
  const [isMoveDown, setIsMoveDown] = useState(false);

  const handleToggleMoveDown = () => {
    setIsMoveDown(!isMoveDown);
  };

  return (
    <div className={style.container}>
      <div className={style.progress}>
        <span>50%</span>
        <div className={style.progressBar}>
          <div className={style.progressBarComplete} />
        </div>
      </div>
      <section className={style.todoLists}>
        {todoItems.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem todo={todo} />
          </Fragment>
        ))}
      </section>
      <div className={style.border} />
      <div className={style.toggleContainer}>
        <span>Movie done things to end?</span>
        <div
          className={
            isMoveDown ? style.toggleMoveDone__checked : style.toggleMoveDone
          }
          onClick={handleToggleMoveDown}
        >
          <div className={style.circle} />
        </div>
      </div>
    </div>
  );
}
