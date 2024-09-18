
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import TodoProvider from "./context/todoContext"


function App() {


  return (
    <TodoProvider>
      <main className="m-10">
          <Header />
          <TodoList />
      </main>
    </TodoProvider>
  )
}

export default App
