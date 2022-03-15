require('dotenv').config();
require('./mongoose');
const express = require('express')
const cors = require('cors')
const routes = require('./routes');
const bodyParser = require('body-parser')

const app = express();
const port = 8090;
const corsOptions ={
  origin: '*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.listen(port, () => {
  console.log(`Running on 8090`)
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);