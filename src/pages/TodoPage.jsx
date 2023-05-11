import Todos from '../components/TodosComponent/Todos';
import AddTodo from '../components/AddTodo/AddTodo';

import style from './TodoPage.module.scss';

export default function TodoPage() {
  return (
    <div className={style.container}>
      <section className={style.todoHeader}>
        <h1>Todo List</h1>
        <span>Add things to do</span>
      </section>
      <section className={style.todos}>
        <Todos />
      </section>
      <section className={style.addTodo}>
        <AddTodo />
      </section>
    </div>
  );
}
