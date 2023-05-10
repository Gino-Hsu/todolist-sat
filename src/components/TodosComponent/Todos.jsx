import { Fragment, useState, useRef, useEffect } from 'react';
import TodoItem from './TodoItem/TodoItem';
import { useTodosContext } from '../../context/TodosContext';

import style from './Todos.module.scss';

export default function Todos({ todoItems }) {
  const [isMoveDown, setIsMoveDown] = useState(false);
  const { addTodoComplete } = useTodosContext();
  const todoListRef = useRef();

  const handleToggleMoveDown = () => {
    setIsMoveDown(!isMoveDown);
  };

  useEffect(() => {
    if (addTodoComplete === true) {
      // 當新增 TODO 完成後，滾動至最底部
      const newTodoElement = todoListRef.current.lastChild;
      newTodoElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [addTodoComplete]);

  return (
    <div className={style.container}>
      <div className={style.progress}>
        <span>50%</span>
        <div className={style.progressBar}>
          <div className={style.progressBarComplete} />
        </div>
      </div>
      <section className={style.todoLists} ref={todoListRef}>
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
