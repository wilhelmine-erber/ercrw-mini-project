
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import TodoProvider from "./context/todoContext"
import Footer from './components/Footer'


function App() {


  return (
    <TodoProvider>
      <main className="m-10" data-theme='pastel'>
        <Header />
        <TodoList />
      </main>
        <Footer />
    </TodoProvider>
  )
}

export default App
