const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();

app.enable('trust proxy');

app.use(cors());
app.options('*', cors());

app.use(cookieParser());

//limit reqs from unique IPs
const limiter = rateLimit({ //limits req per IP to 100 per hour
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests recieved from this IP, please try again in 1 hour'
});
//apply limiter to all routes that start with /api
app.use('/api', limiter);

//will log cookies in dev mode
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(req.cookies.jwt);
    }
    next();
});

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());