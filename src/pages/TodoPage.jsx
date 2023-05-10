import Todos from '../components/TodosComponent/Todos';

import style from './TodoPage.module.scss';

// TODO: todo items Dummy data
const TODOITEMS = [
  {
    id: 1,
    title: 'Learn react-router',
    isDone: false,
  },
  {
    id: 2,
    title: 'Learn to create custom hooks',
    isDone: true,
  },
  {
    id: 3,
    title: 'Learn to use context',
    isDone: true,
  },
  {
    id: 5,
    title: 'test patchTodo',
    isDone: false,
  },
];

export default function TodoPage() {
  return (
    <div className={style.container}>
      <section className={style.todoHeader}>
        <h1>Todo List</h1>
        <span>Add things to do</span>
      </section>
      <section className={style.todos}>
        <Todos todoItems={TODOITEMS} />
      </section>
    </div>
  );
}
