const popup = document.querySelector('.pop-up');
const closeButton = document.querySelector('#closeButton');
const submitButton = document.querySelector('#sendName');
const nameInput = document.querySelector('#name');
let readyCups;
const closePopUp = () => {
    popup.style.display = 'none';
    if(!readyCups) readyCups = new CupPile();
}
closeButton.addEventListener('click', () => {
    closePopUp();
    
})
submitButton.addEventListener('click', () =>{
    cupClient.setData({name:nameInput.value});
    closePopUp();
})  
