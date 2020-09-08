class DBClient{
    constructor(){
        this.currentStatus = '';
        this.currentName = 'mariusz';
        this.requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'applications/json'
            }
        };
    }
    setData = (data) =>{
        if(data.status) this.currentStatus = status;
        if(data.name) this.currentName = name; 
        if( name || status ) this.sendData()
    }
    sendData = () =>{
        console.log('hej')
            fetch(`http://localhost:4000/updateCup/hej/${this.currentStatus}`, this.requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
        })
        
    }
}
const cupClient = new DBClient();

    

