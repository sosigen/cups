const express = require('express');
const path = require('path');
let app = express();
const cors = require('cors');
const fs = require('fs');

let user = {
    name: null,
    status: null
}
const userList = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json({
  type: ['application/json', 'text/plain']
  }));

app.listen( 4000, () => console.log('jestem na porcie 4000'));
app.get('/', (req, res) =>{
  res.sendFile(__dirname + "/public/index.html")
});
app.get('/addUser/:name'), (req, res) =>{
  console.log(req.params)
}
app.get('/updateStatus/:name/:status', (req, res) =>{
  let reqName = req.params.name;
  let reqStatus = req.params.status;
  let change = false;
  if(reqName !== user.name) {
    user.name = reqName;
    change = true;
  }
  if(reqStatus !== user.status) {
    user.status = reqStatus;
    change = true;
  }
  if(change) fs.writeFileSync(`${__dirname}/public/txt/test.txt`, JSON.stringify(user), {flag: 'a'});

  res.set({
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'applications/json'
    })
  res.send(user);
})
app.get('/:name/closing', (req, res) =>{
  console.log('nohej')
  fs.readFile(`${__dirname}/public/txt/test.txt`, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  })
})