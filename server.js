const express = require('express'), app = express();
const path = require('path');
const cors = require('cors');
const Datastore = require('nedb'), db = new Datastore('database.db');

// zmienne sluzace do wykrywania i usuwania nieaktywnych uzytkownikow
// gdy user przedluza swoja sesje (request na keepInBase) inkrementuje globalny licznik
// gdy licznik osiagnie limit zeruje sie i odswieza tabele
// jesli w zbiorze tych zapytan (activeList) nie znajdzie sie jakis uzytkownik
// to znaczy ze zamknal karte i trzeba go usunac z tabeli
// w przeciwnym wypadku jest usuwany z tabeli 
let activeList = new Set();
let counter = 0;
let limit = 100;

//wyzerowanie rekordów w bazie przy starcie serwera
db.remove({ }, { multi: true }, function (err, numRemoved) {
  db.loadDatabase();
});
db.loadDatabase();


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json({
  type: ['application/json', 'text/plain']
}));
app.listen( 4000, () => console.log('jestem na porcie 4000'));

//funkcja zmieniająca status uzytkownika name, jesli takowy istnieje
const updateStatus = function(name, status){
  db.find({ name: name }, (err, docs) => {
    if(err) console.log(error);
    else if(docs.length !== 0) {
      db.update({name: name}, {$set:{status: status}}, {}, (err, numReplaced) => {
        if(err) console.log(error);
      });
    }else {
      return false;
    }
  });
  return true;
}



//callback podawany w addUser, funkcja tworzaca uzytkownika
//i dodajaca go do bazy
const manageAddResult = (docs, res, userName) =>{
  if(docs.length !== 0) res.status(304).send({result: false})
  else{
    let user = {
      name: null,
      status: null,
    };
    user.name = userName;
    user.status = 'wait';
    db.insert(user);
    res.sendStatus(201);
  }
}

//sprawdza czy uzytkownik znajduje sie w bazie,
//jesli tak wywoluje callback
const addUser = async function(userName, res, callback){
  db.find({ name: userName }, function (err, docs) {
    callback(docs, res, userName);
  })
}
// funkcja usuwa podanego uzytkownika z bazy
const removeUser = async function(user){
  db.remove({ name: user }, {}, (err, numRemoved) => {
    if(err) console.log(err);
  });
}

//strona startowa
app.get('/', (req, res) =>{
  res.status(200).sendFile(__dirname + "/public/index.html");
});

//strona z lista uzytkownikow
app.get('/userList', (req, res) => {
  res.status(200).sendFile(__dirname + "/public/table.html");
})

//zapytanie dodajace uzytkownika
app.post('/addUser/:name', (req, res) =>{
  addUser(req.params.name, res, manageAddResult)
})

//zmiana statusu uzytkownika
app.patch('/updateStatus/:name/:status', (req, res) =>{
  let resolve = updateStatus(req.params.name, req.params.status);
  if(resolve) res.sendStatus(200);
  else res.sendStatus(304);
})


//inkrementacja licznika oraz reset licznika
//wraz z wywolaniem funkcji resetujacej liste aktywnych uzytkownikow
const updateAlive = async function(name, bool, res){
      activeList.add(name);
      if(++counter > limit){
        counter = 0;
        await removeInactive();
      }
}

//funkcja resetuje liste aktywnych uzytkownikow
//jesli ktos nie znajduje się na liscie, a jest w bazie
//zostaje z niej usuniety
const removeInactive = async function(){
  await db.find({}, (err, docs) =>{
    for( user of docs){
      if(!activeList.has(user.name)) removeUser(user.name); 
    }
     activeList.clear();
   
  })
}

//zapytanie przedluzajace 'sesje' uzytkownika
app.patch('/keepInBase/:name', (req, res) =>{
  updateAlive(req.params.name);
  res.sendStatus(200);
});

//zapytanie zwracajace baze w odpowiedzi
app.get('/listAll', (req,res) =>{
  db.find({}, (err, docs) =>{
    if(err) console.log(err)
    res.status(200).send(docs);
  })
})





