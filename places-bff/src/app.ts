import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import placesRouter from './routes/places';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/places', placesRouter);

app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('OH NOES!');
});

export default app;
