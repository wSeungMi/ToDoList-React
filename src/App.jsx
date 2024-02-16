import TodoTemplate from './components/TodoTemplate';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-purple flex flex-col justify-center items-center">
        <TodoTemplate>
          <TodoCreate />
          <TodoList />
        </TodoTemplate>
      </div>
    </>
  );
}

export default App;
