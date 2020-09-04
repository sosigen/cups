class CupPile{
    constructor([...cups]){
        this.cups = cups;
        // this.cups.ok = cups[0];
        // this.cups.wait = cups[1];
        // this.cups.error = cups[2];
    }
    moveLeft = () => {
        const swap = (id1, id2, list=this.cups) =>{
            let temp = list[id1];
            list[id1] = list[id2];
            list[id2] = temp;
        }
        console.log(this.cups)
        swap(0,2);
        swap(0,1);
        console.log(this.cups)
    }
    moveRight(){

    }

}
let readyCups = new CupPile(Array.from(document.querySelectorAll('.fa')))