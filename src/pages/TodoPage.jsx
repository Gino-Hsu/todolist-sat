import { useEffect, useState } from 'react';
import Todos from '../components/TodosComponent/Todos';
import AddTodo from '../components/AddTodo/AddTodo';

import { getTodos } from '../api/todos';

import style from './TodoPage.module.scss';

export default function TodoPage() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    // 取得所有 TODOS 資料，並更新 todoItems state
    getTodos()
      .then(res => {
        setTodoItems(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className={style.container}>
      <section className={style.todoHeader}>
        <h1>Todo List</h1>
        <span>Add things to do</span>
      </section>
      <section className={style.todos}>
        <Todos todoItems={todoItems} />
      </section>
      <section className={style.addTodo}>
        <AddTodo />
      </section>
    </div>
  );
}
