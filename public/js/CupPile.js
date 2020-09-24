class CupPile{
    constructor(){
        this.optionLabels = document.querySelectorAll('.option');
        this.options = document.querySelectorAll('#optionBox > input[type=radio]');
        for(let option of this.options) option.onclick = this.updateStatus;
    }
    getStatus = () =>{
        let current;
        for(let option of this.options){
            if(option.checked) current = option.id;
        }
        return current;
    }
    updateStatus = () =>{
        let status = this.getStatus();
        cupClient.setStatus(status);
    }
}
const cupPile = new CupPile();
