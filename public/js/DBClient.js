class DBClient{
    constructor(){
        this.currentStatus = null;
        this.currentName = null;
        this.requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'applications/json'
            }
        };
        this.updateURL = 'http://192.168.7.72:4000/updateStatus';
        this.addUserURL = 'http://192.168.7.72:4000/addUser';
        this.closingURL = 'http://192.168.7.72:4000/closing';
    }
    setName = (name) =>{
        this.currentName = name;
        this.sendData(this.addUserURL, this.currentName);
    }
    setStatus = (status) =>{
        if(this.currentName) this.currentStatus = status;
        this.sendData(this.updateURL, `${this.currentName}/${this.currentStatus}`)
    }

    sendData = async (url, param) =>{ 
        await fetch(`${url}/${param}`, this.requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
        })
        
    }
    getData = async() =>{
        await fetch('http://192.168.7.72:4000/listAll', this.requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
    }
}
const cupClient = new DBClient();

    

