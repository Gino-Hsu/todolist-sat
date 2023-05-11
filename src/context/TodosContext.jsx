import { createContext, useContext, useState, useEffect } from 'react';
import { getTodos } from '../api/todos';

const TodosContext = createContext();

export default function TodosContextProvider({ children }) {
  const [todoItems, setTodoItems] = useState([]);
  const [addTodoComplete, setAddTodoComplete] = useState(false);

  // 依創建時間進行排序 func
  const handleOnSort = data => {
    // 排序方式，正序
    const compareByCreateAt = (a, b) => {
      return a.createAt.seconds - b.createAt.seconds;
    };
    // 經過 sort 後的新資料
    const sortedData = [...data].sort(compareByCreateAt);
    return sortedData;
  };

  // 初始取得所有 todos
  useEffect(() => {
    getTodos()
      .then(res => {
        // 雖然資料庫中已對時間做排序，但為確保資料正確性，再進行排序後跟新 state
        setTodoItems(handleOnSort(res));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // 初始化 addTodoComplete 為 false
  const handleInitComplete = () => {
    setAddTodoComplete(false);
  };

  // 新增 todo 後，取得最新資料，並一併 re-render 畫面
  const handleRerenderTodos = () => {
    getTodos()
      .then(res => {
        setTodoItems(handleOnSort(res)); // 跟新 todo state
        setAddTodoComplete(true);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 跟新單筆 todo 的 isDone
  const handleTodoIsDone = ({ id, isDone }) => {
    // 建立新的 todos arr
    const newTodos = todoItems.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone,
        };
      } else {
        return todo;
      }
    });
    setTodoItems(newTodos); // 跟新 todo state
  };

  // 以 filter 刪除 todo 的 event handler
  const handleTodoFilter = ({ id }) => {
    // 篩選 todo id 不等於 id 的資料
    const filterTodos = todoItems.filter(todo => todo.id !== id);
    setTodoItems(filterTodos); // 跟新 todo state
  };

  return (
    <TodosContext.Provider
      value={{
        todoItems,
        handleRerenderTodos,
        addTodoComplete,
        handleInitComplete,
        handleTodoIsDone,
        handleTodoFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodosContext() {
  return useContext(TodosContext);
}
