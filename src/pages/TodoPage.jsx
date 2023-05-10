import style from './TodoPage.module.scss';

export default function TodoPage() {
  return (
    <div className={style.container}>
      <section className={style.todoHeader}>
        <h1>Todo List</h1>
        <span>Add things to do</span>
      </section>
    </div>
  );
}
