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
        this.addUserURL = 'http://192.168.7.72:4000/addUser'
    }
    // setData = (data) =>{
    //     if(data.status) this.currentStatus = data.status;
    //     if(data.name) this.currentName = data.name; 
    //     if( this.currentName && this.currentStatus ) this.sendData();
    // }
    setName = (name) =>{
        this.currentName = name;
        this.sendData(this.addUserURL, this.currentName);
    }
    setStatus = (status) =>{
        if(this.currentName) this.currentStatus = status;
        this.sendData(this.updateURL, `${this.currentName}/${this.currentStatus}`)
    }

    sendData = async (url, param) =>{ 
            await fetch(`${url}/${param}`, {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'applications/json'
                    } 
                })
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        // })
        
    }
    sendClosingInfo = async () => {
        console.log('e');
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

    

