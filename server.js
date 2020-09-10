const express = require('express');
const path = require('path');
let app = express();
let cors = require('cors');

let user = {
    name: null,
    status: null
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

app.listen( 4000, () => console.log('jestem na porcie 4000'));
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
});
app.get('/updateCup/:name/:status', (req, res) =>{
  
    if(req.params.name) user.name = req.params.name;
    if(req.params.status) user.status = req.params.status;
    console.log(user)
    res.set({
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'applications/json'
      })
      
    res.send(user);
    
    
})