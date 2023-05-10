import { AiOutlinePlus } from 'react-icons/ai';

import style from './AddTodo.module.scss';

export default function AddTodo() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Add to list</h2>
      <div className={style.inputContainer}>
        <input type='text' className={style.input} />
        <button>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
