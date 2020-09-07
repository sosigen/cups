const popup = document.querySelector('.pop-up');
const closeButton = document.querySelector('#closeButton')
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
})