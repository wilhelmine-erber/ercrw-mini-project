import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todo from './pages/Todo.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' index element={<App />}/>
      <Route path='/:id' element={<Todo />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
