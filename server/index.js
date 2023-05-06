const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
app.use(bodyParser.json());
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(cors(
    {
        origin:"*"
    }
));

dotenv.config();

//connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
    //i will put static site here
});

app.use('/api', require('./routes/accountRouter'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
