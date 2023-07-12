import express, { Request, Response } from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import cors from 'cors';
import morgan from 'morgan';
import expressSession from 'express-session';

import apiRouter from './routes/api';
import './passport/passport-setup';

import errorHandler from './middleware/errorHandler';
import authProtect from './middleware/authProtect';
import passport from 'passport';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const corsOptions={ origin: true, credentials: true}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(morgan('dev'));
app.use(
  expressSession({
    secret: 'lala',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/api/v1', apiRouter);

app.get('/api/v1/test', authProtect, (req: any, response: Response) => {
  return response
    .status(200)
    .json({ success: true, data: 'test_success', user: req.user });
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(errorHandler);

export default app;
