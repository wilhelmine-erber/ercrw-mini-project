import express from 'express';
import { getCurrentUser, register, login, logout, updateUser } from '../controllers/user';


const app = express.Router();



// -> /user
app.route('/')
  .get(getCurrentUser)

// -> /user
app.route('/')
  .patch(updateUser)

// -> /user/register
app.route('/register')
  .post(register)

// -> /user/login
app.route('/login')
  .post(login)

// -> /user/logout
app.route('/logout')
  .post(logout)

export default app;