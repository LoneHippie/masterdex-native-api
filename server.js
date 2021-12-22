const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //avoids depreciation issues
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Successfully connected to DB'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
});