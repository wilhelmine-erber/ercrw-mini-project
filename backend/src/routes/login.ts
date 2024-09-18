import express, { Request, Response, NextFunction } from 'express'
import {User} from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express.Router()

// -> /login
app.route('/')
.post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;

      const user = await User.findOne({ userName });

      if (!user) {
        throw new Error('User not found!');
      }

      // Vergleich des gehashten Passworts mit dem eingegebenen Passwort
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error('Invalid authentication');
      }

      // Token erstellen
      const token = jwt.sign(
        { iat: Date.now(), userId: user.id },
        process.env.JWT_SECRET!,
        { algorithm: 'HS256', expiresIn: '1m' }
      );

      res.json({ token });
    } catch (error) {
      next(error);
    }
  });


export default app