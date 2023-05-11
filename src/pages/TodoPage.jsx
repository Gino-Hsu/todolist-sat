import Todos from '../components/TodosComponent/Todos';
import AddTodo from '../components/AddTodo/AddTodo';
import { useTodosContext } from '../context/TodosContext';

import style from './TodoPage.module.scss';

export default function TodoPage() {
  const { addTodoComplete } = useTodosContext();

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

      {/* 當提送狀態為 "pending" 時，渲染 loading 元素 */}
      {addTodoComplete === 'pending' && (
        <div className={style.loading}>
          <div className={style.spinner}>
            <div className={style.bubbleOne} />
            <div className={style.bubbleTwo} />
          </div>
        </div>
      )}
    </div>
  );
}
