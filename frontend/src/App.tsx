
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import TodoProvider from "./context/todoContext"
import TestTodo from "./components/TestTodo"
import Header2 from "./components/Header2"

function App() {



  return (
    <TodoProvider>
      <main className="m-10">
          <Header />
          <TodoList />
          {/* Login hier einbinden? */}
          {/* <Login /> */}  
      </main>
    </TodoProvider>
  )
}

export default App
