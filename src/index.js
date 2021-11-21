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

app.get('/pets/dummy', (req, res) => {
  console.log("PASS IN THE DUMMY REQUEST");
  res.send({
    id: 0,
    userId: 0,
    name: 'Dummy',
  })
})