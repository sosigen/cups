const express = require('express'), app = express();
const path = require('path');
const cors = require('cors');
const Datastore = require('nedb'), db = new Datastore('database.db');
let interactionRights = {
  read: true,
  write: true
};
db.loadDatabase();
// db.remove({ }, { multi: true }, function (err, numRemoved) {
//   db.loadDatabase(function (err) {
//     // done
//   });
// });
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json({
  type: ['application/json', 'text/plain']
  }));

app.listen( 4000, () => console.log('jestem na porcie 4000'));

const updateStatus = function(nameParam, statusParam){
  db.find({ name: nameParam }, (err, docs) => {
    if(err) console.log(error);
    else if(docs.length !== 0) {
      db.update({name: nameParam}, {$set:{status: statusParam}}, {}, (err, numReplaced) => {
        if(err) console.log(error);
      });
    }
  });
  
  return true;
}

const addUser = async function(userName, func){
  interactionRights.write = false;
  db.find({ name: userName }, function (err, docs) {
    if(err) throw new Error(error);
    func(docs, userName);
  })
}

app.get('/', (req, res) =>{
  res.sendFile(__dirname + "/public/index.html")
});

app.get('/addUser/:name', (req, res) =>{
  let manageResult = (docs, userName) =>{
    if(docs.length !== 0) res.send({result: false})
    else{
      let user = {
        name: null,
        status: null
      };
      user.name = userName;
      user.status = 'wait';
      db.insert(user);
      interactionRights.write = true;
      res.send({result: true});
    }
  }
  if(interactionRights.write){
    addUser(req.params.name, manageResult)
  }
  else{
    setTimeout(() =>{
      addUser(req.params.name, manageResult);
    }, 0)
  }
})
app.get('/updateStatus/:name/:status', (req, res) =>{
  let resolve = updateStatus(req.params.name, req.params.status);
  res.set({
    'Accept':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'applications/json'
  });
  res.send({result: resolve});
})

app.get('/closing/:name', (req, res) =>{
  db.remove({ name: req.params.name }, {}, (err, numRemoved) => {
    if(err) console.log(err);
  });
});

app.get('/listAll', (req, res) =>{
  console.log('req' + req);
  console.log('hej');
  db.find({}, (err, docs) =>{
    if(err) console.log(err)
    console.log(docs)
    res.send({docs: docs})
  })
})
