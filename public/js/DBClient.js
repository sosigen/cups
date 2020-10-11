//klasa odpowiedzialna za komunikację z serwerem
class DBClient{
    constructor(){
        this.currentStatus = null;
        this.currentName = null;
        this.requestOptions = {
              'Accept': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'applications/json'
        };
        this.updateURL = '/updateStatus';
        this.addUserURL = '/addUser';
        this.sessionURL = '/keepInBase';
    }
    //przypisuje imie i/lub nazwisko uzytkownka do zmiennej 
    //i wysyla zapytanie tworzace uzytkownika
    setName = async (name) =>{
        this.currentName = name;
        const query = await this.sendData(this.addUserURL, this.currentName, 'POST');
        return query;
    }
    //zapisuje status, jesli uzytkownik ma nazwe
    //wysyla zapytanie zmienijace status dla uzytkownika o przechowywanej nazwie
    setStatus = async (status) =>{
        if(this.currentName) this.currentStatus = status;
        const query = this.sendData(this.updateURL, `${this.currentName}/${this.currentStatus}`, 'PATCH');
        return query;
    }
    //metoda wysylajaca dane
    //przyjmuje poczatek url, parametry i metode zapytania HTTP
    sendData = async (url, param, method) =>{ 
        return await fetch(`${url}/${param}`, {
            method: method,
            headers: this.requestOptions
        })
        .then(response => {return response})
        .catch(err => console.log(err))
        
    }
    //pobiera liste uzytkownikow z serwera
    getData = async () =>{
        let response = await fetch('/listAll', this.requestOptions);
        return response.json();
    }
}
const cupClient = new DBClient();

    

