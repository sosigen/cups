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
    }
    setName = (name) =>{
        this.currentName = name;
        this.sendData(this.addUserURL, this.currentName);
    }
    setStatus = (status) =>{
        console.log('nohej');
        if(this.currentName) this.currentStatus = status;
        this.sendData(this.updateURL, `${this.currentName}/${this.currentStatus}`)
    }

    sendData = async (url, param) =>{ 
            console.log(`${url}/${param}`)
            await fetch(`${url}/${param}`, {
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
    sendClosingInfo = async () => {
        await fetch(`192.168.72.2:4000/${this.currentName}/closing`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'applications/json'
            } 
        })
    }
}
const cupClient = new DBClient();

    

