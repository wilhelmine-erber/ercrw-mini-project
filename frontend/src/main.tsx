import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todo from './pages/Todo.tsx'
import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import {UserProvider} from './context/userContext.tsx'

const isAuthenticated = false

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<App />} />
          <Route path='/:id' element={<Todo />} />
          <Route path='/login' element={<Login />} />

          {/* geschützte Routen */}

          <Route path='/profile' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
          />
          <Route path='/profile/:id' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
