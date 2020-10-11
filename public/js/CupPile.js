//klasa odpowiedzialna za pobieranie danych z DOM i przekazywanie ich 
//do obiektu wysylajacego dane do bazy
class CupPile{
    constructor(){
        this.optionLabels = document.querySelectorAll('.option');
        this.options = document.querySelectorAll('#optionBox > input[type=radio]');
        for(let option of this.options) option.onclick = this.debounce(this.updateStatus, 500);
    }
    //pobieranie statusu z radio inputow
    //id aktualnie zaznaczonego inputu = status
    getStatus = () =>{
        let current;
        for(let option of this.options){
            if(option.checked) current = option.id;
        }
        return current;
    }
    //status uzytkownika przekazywany do obiektu przesylajacego dane na serwer
    updateStatus = () =>{   
        let status = this.getStatus();
        cupClient.setStatus(status);

    }
    //limitowanie częstotliwości zapytań do czasu okreslonego w 'wait'
    debounce = (callback, wait) => {
        let timeout;
        return (...args) => {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(context, args), wait);
        };
    }
}
const cupPile = new CupPile();
