import { createContext, useContext, useState, useEffect } from 'react';
import { getTodos } from '../api/todos';

const TodosContext = createContext();

export default function TodosContextProvider({ children }) {
  const [todoItems, setTodoItems] = useState([]);
  const [addTodoComplete, setAddTodoComplete] = useState(false);

  // 初始取得所有 todos
  useEffect(() => {
    getTodos()
      .then(res => {
        setTodoItems(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // 新增 todo 後，取得最新資料，並一併 re-render 畫面
  const handleRerenderTodos = () => {
    getTodos()
      .then(res => {
        setTodoItems(res);
        setAddTodoComplete(true);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 初始化 addTodoComplete 為 false
  const handleInitComplete = () => {
    setAddTodoComplete(false);
  };

  return (
    <TodosContext.Provider
      value={{
        todoItems,
        handleRerenderTodos,
        addTodoComplete,
        handleInitComplete,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodosContext() {
  return useContext(TodosContext);
}
