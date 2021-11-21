require('dotenv').config();
require('./mongoose');
const express = require('express')
var cors = require('cors')
const routes = require('./routes');
var bodyParser = require('body-parser')

const app = express();
const port = 3000;
const corsOptions ={
  origin: '*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.listen(port, () => {
  console.log(`Running on 3000`)
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

const Hoodie = {
  id: 1,
  name: 'Hoodie',
  type: 'Chat Europeen',
  img: 'assets/hoddie.jpg',
}

const Capuche = {
  id: 2,
  name: 'capuche',
  type: 'Lapin bélier',
  img: 'assets/capuche.jpg',
}

const PitPote = {
  id: 3,
  name: 'PtiPote',
  type: 'Poisson rouge',
  img: 'assets/ptipote.jpg',
}

app.get('/pets/dummy', (req, res) => {
  res.send([Hoodie, Capuche, PitPote]);
})