class CupPile{

    constructor(){
        this.cups = document.querySelectorAll('.fa')
        this.cupSize = 700;
        this.counter = 0;
        this.slides = document.querySelector('#slides');
        this.running = false;
        window.addEventListener("keydown", e => { this.moveSlide(e) } );
        window.addEventListener("transitionend", this.repeatSlides);
        this.backgrounds = {
            error: '#EF476F',
            wait: '#FFD166',
            ok: '#06D6A0'
        }
    }
    moveSlide = (event) => {
        if(!this.running){
            this.running = true;
            this.slides.style.transition = "transform 0.5s ease-in-out"
            switch(event.key){
                case "ArrowRight":
                    this.counter++;            
                    break;
                case "ArrowLeft":
                    this.counter--;
                    break;
            }
            this.changeBack();
            this.slides.style.transform = `translateX(${(-this.cupSize * this.counter)}px)`
        }

    }
    repeatSlides = () => {
        this.running = false;
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
    changeBack = () => {
        let current = this.cups[this.counter].id;
        if(current.includes('Clone')){
            current = current.slice(0, -5)
        }
        document.body.style.background = this.backgrounds[current];
    }

}
const readyCups = new CupPile()