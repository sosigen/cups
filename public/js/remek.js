let options = Array.from(document.querySelectorAll('i'));
let makeActive = option =>{
    console.log(option)
    // option.classList.add('zaznaczony');
}
for(option of options){
    option.addEventListener('click', () =>{
        makeActive(option)
    })
}