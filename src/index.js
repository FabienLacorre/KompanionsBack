const express = require('express')
var cors = require('cors')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

const corsOptions ={
  origin: '*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

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