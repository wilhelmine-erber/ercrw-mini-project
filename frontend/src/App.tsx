
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import TodoProvider from "./context/todoContext"
import TestTodo from "./components/TestTodo"

function App() {



  return (
    <TodoProvider>
      <main className="m-10">
          <Header />
          <TodoList />
          {/* Login hier einbinden? */}
          {/* <Login /> */}  
          <TestTodo /> 
      </main>
    </TodoProvider>
  )
}

export default App
