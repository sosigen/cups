class LoginPanel{
    constructor(){
        this.popup = document.querySelector('.pop-up');
        this.closeButton = document.querySelector('#closeButton');
        this.submitButton = document.querySelector('#sendName');
        this.nameInput = document.querySelector('#name');
        this.readyCups = undefined;
        this.closeButton.addEventListener('click', e => {
            this.handleClick(e);
        })
        this.submitButton.addEventListener('click', e =>{
            this.handleClick(e);
        }) 
    }
    handleClick = event =>{
        if(event.target.id === 'closeButton') this.closePopUp();
        else{
            if(this.checkUsername(this.nameInput.value)) {
                this.closePopUp();
                cupClient.setName(this.nameInput.value);
            }
            else {
                alert('Nieprawidłowy login. Spróbuj ponownie');
                this.nameInput.value = '';
            }
        }
    }
    closePopUp = () => {
        this.popup.style.display = 'none';
        if(!this.readyCups) this.readyCups = new CupPile();
    }
    checkUsername = (username) =>{
        let isMatching = /^([a-zA-Z ]{3,30})$/.test(username);
        return isMatching;
    }
}
const loginPanel = new LoginPanel();