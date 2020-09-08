const express = require('express');
const path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

app.listen( 4000, () => console.log('port 4000'));
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
});
app.get('/updateCup/:name/:status', (req, res) =>{
    console.log(req.params);
    res.send(req.params);
})