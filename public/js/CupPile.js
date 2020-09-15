class CupPile{
    constructor(){
        this.optionLabels = document.querySelectorAll('.option');
        this.options = document.querySelectorAll('#optionBox > input[type=radio]');
        for(let option of this.options) option.addEventListener('click', this.updateStatus);
        
    }
    getStatus = () =>{
        let current;
        console.log(this.options)
        for(let option of this.options){
            if(option.checked) current = option.id;
        }
        console.log(current)
        return current;
    }
    updateStatus = () =>{
        cupClient.setStatus(this.getStatus())
    }
}
const cupPile = new CupPile();
