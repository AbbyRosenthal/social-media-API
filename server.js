const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/api'));

//NEED TO FINISH THIS PART
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-media-API', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//use this to log mongo queries to be executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`))
