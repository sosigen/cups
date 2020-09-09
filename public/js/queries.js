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
        this.url = 'http://localhost:4000/updateCup';
    }
    setData = (data) =>{
        if(data.status) this.currentStatus = data.status;
        if(data.name) this.currentName = data.name; 
        if( this.currentName && this.currentStatus ) this.sendData();
    }
    sendData = async () =>{ 
            await fetch(`${this.url}/${this.currentName}/${this.currentStatus}`, {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'applications/json'
                    } 
                })
            .then(response => response.json())
            .then(json => {
                console.log(json);
        })
        
    }
}
const cupClient = new DBClient();

    

