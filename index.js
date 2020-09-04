class CupPile{
    constructor(cups){
        this.cups = cups
        this.cupSize = 600;
        this.counter = 0;
        this.slides = document.querySelector('#slides');
        window.addEventListener("keydown", e => { this.moveSlide(e) } );
        window.addEventListener("transitionend", this.repeatSlides);
    }
    moveSlide = (event) => {
        this.slides.style.transition = "transform 0.5s ease-in-out"
        switch(event.key){
            case "ArrowRight":
                this.counter++;
                this.slides.style.transform = `translateX(${(-this.cupSize * this.counter)}px)`            
                break;
            case "ArrowLeft":
                this.counter--;
                this.slides.style.transform = `translateX(${(-this.cupSize * this.counter)}px)`
                break;
            default:
                console.log('nie strzalka')
                break;
        }
    }
    repeatSlides = () => {
        if(this.cups[this.counter].id === 'okClone'){
            this.slides.style.transition = 'none'
            this.counter = this.cups.length - this.counter;
            this.slides.style.transform = `translateX(${(-this.cupSize * this.counter)}px)`
        }
        if(this.cups[this.counter].id === 'waitClone'){
            this.slides.style.transition = 'none'
            this.counter = this.cups.length - 2;
            this.slides.style.transform = `translateX(${(-this.cupSize * this.counter)}px)`
        }
    }

}
let readyCups = new CupPile(Array.from(document.querySelectorAll('.fa')))