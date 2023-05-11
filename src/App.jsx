import TodosContextProvider from './context/TodosContext';
import TodoPage from './pages/TodoPage';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <TodosContextProvider>
        <TodoPage />
      </TodosContextProvider>
    </div>
  );
}

export default App;
