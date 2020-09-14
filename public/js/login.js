class LoginPanel{
    constructor(){
        this.popup = document.querySelector('.pop-up');
        this.closeButton = document.querySelector('#closeButton');
        this.submitButton = document.querySelector('#sendName');
        this.nameInput = document.querySelector('#name');
        this.readyCups = undefined;
        this.closeButton.addEventListener('click', () => {
            this.closePopUp();
        })
        this.submitButton.addEventListener('click', () =>{
            cupClient.setName(this.nameInput.value);
            this.closePopUp();
        }) 
    }
    closePopUp = () => {
        this.popup.style.display = 'none';
        if(!this.readyCups) this.readyCups = new CupPile();
    }
}
const loginPanel = new LoginPanel();