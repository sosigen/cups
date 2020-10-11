//klasa przedluzajaca 'sesje' uzytkownika
class ImAlive{
    constructor(){
        this.closeCheck = window.setInterval(this.ExtendSession, 500);
    }
    ExtendSession = () =>{
        cupClient.sendData(cupClient.sessionURL, cupClient.currentName, 'PATCH');
    }
}
