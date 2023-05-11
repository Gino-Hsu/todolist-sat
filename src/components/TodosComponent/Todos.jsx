import { Fragment, useState, useRef, useEffect } from 'react';
import TodoItem from './TodoItem/TodoItem';
import { useTodosContext } from '../../context/TodosContext';

import style from './Todos.module.scss';

export default function Todos() {
  const [isMoveDown, setIsMoveDown] = useState(false);
  const { addTodoComplete, todoItems } = useTodosContext();
  const todoListRef = useRef();

  // 取的 isDone 的 todos 陣列
  const todoIsDoneArr = todoItems.filter(todo => !!todo.isDone);
  // 取的 unDone 的 todos 陣列
  const todoUnDoneArr = todoItems.filter(todo => !todo.isDone);
  // 完成項目的比率
  const progressRatio = todoIsDoneArr.length / todoItems.length;
  // 完成項目的百分比，取四捨五入整數位，當沒有項目時為 NaN，取百分比為 0
  const progressPercentage = Math.round(progressRatio * 100) || 0;

  // MoveDown 切換紐 event handler
  const handleToggleMoveDown = () => {
    setIsMoveDown(!isMoveDown);
  };

  useEffect(() => {
    if (addTodoComplete === 'done') {
      // 當新增 TODO 完成後，滾動至最底部
      const newTodoElement = todoListRef.current.lastChild;
      newTodoElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [addTodoComplete]);

  return (
    <div className={style.container}>
      <div className={style.progress}>
        <span>{`${progressPercentage}%`}</span>
        <div className={style.progressBar}>
          <div
            className={style.progressBarComplete}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <section className={style.todoLists} ref={todoListRef}>
        {/* 若 isMoveDown 為 false，全部的 todos map 做渲染*/}
        {!isMoveDown &&
          todoItems.map(todo => (
            <Fragment key={todo.id}>
              <TodoItem todo={todo} />
            </Fragment>
          ))}
        {/* 若 isMoveDown 為 true，isDone 和 unDone 分開 map 做渲染 */}
        {!!isMoveDown && (
          <>
            {todoUnDoneArr.map(todo => (
              <Fragment key={todo.id}>
                <TodoItem todo={todo} />
              </Fragment>
            ))}
            {todoIsDoneArr.map(todo => (
              <Fragment key={todo.id}>
                <TodoItem todo={todo} />
              </Fragment>
            ))}
          </>
        )}
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
