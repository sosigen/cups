//klasa odpowiedzialna za obsługę okienka pobierajacego nazwe
//i przekazanie go do klienta serwerowego
class LoginPanel{
    constructor(){
        this.popup = document.querySelector('.pop-up');
        this.tableButton = document.querySelector('#showTableButton');
        this.submitButton = document.querySelector('#sendName');
        this.nameInput = document.querySelector('#name');
        this.readyCups = undefined;
        this.submitButton.addEventListener('click', this.handleSubmit) 
    }
    //to dzieje sie po zatwierdzeniu przyciskiem
    handleSubmit = async () =>{
        //jesli input nie jest pusty, wysyla jego zawartosc do klienta serwerowego
        if(this.checkUsername(this.nameInput.value)) {
            //wyslanie nazwy do klienta i stworzenie 'sesji'
            const updated = await cupClient.setName(this.nameInput.value);
            const sessionKeeper = new ImAlive();
            //jesli serwer oznajmil, ze nazwa jest duplikatem trzeba ponownie podac nazwe
            if(updated.status === 304) {
                alert('Taki login już istnieje. Spróbuj ponownie');
                this.nameInput.value = '';
            }else{
                this.closePopUp();
            }
        }
        else {
            alert('Nieprawidłowy login. Spróbuj ponownie');
            this.nameInput.value = '';
        }
    }
    //zamkniecie okienka oraz stworzenie obiektu obslugujacego
    //input uzytkownika
    closePopUp = () => {
        this.popup.style.display = 'none';
        if(!this.readyCups) this.readyCups = new CupPile();
    }
    //sprawdzanie poprawnosci nazwy (tylko litery i spacja, dlugosc miedzy 3 a 30)
    checkUsername = (username) =>{
        let isMatching = /^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ ]{3,30})$/.test(username);
        return isMatching;
    }
}
const loginPanel = new LoginPanel();