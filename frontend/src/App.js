import './App.css';
import Todo from './components/Todo';
import Tasks from './components/Tasks';
import { TodoContextProvider } from './context/TodoContext';

function App() {
  return (
    <div>
      <TodoContextProvider>
        <div className="container mx-auto p-7 w-screen h-screen flex flex-row gap-7">
          <div className="w-2/5 h-full">
            <Todo />
          </div>
          <div className="w-3/5 h-full">
            <Tasks />
          </div>
        </div>
      </TodoContextProvider>
    </div>
  );
}

export default App;
