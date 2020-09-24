let test = [
    { name: 'asdasd', status: 'wait', _id: 'Z3BByJN5twwOqrvK' },
    { name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', status: 'error', _id: 'zj1xnvtfAzubyz05' },
    { name: 'haj', status: 'ok', _id: 'zj1xnvtfAzubyz05' },
    { name: 'hoj', status: 'wait', _id: 'zj1xnvtfAzubyz05' },
    { name: 'hyj', status: 'error', _id: 'zj1xnvtfAzubyz05' },
    { name: 'wiem co pomyslales', status: 'ok', _id: 'zj1xnvtfAzubyz05' }
];

class ResultTable{
    constructor(data){
        this.box = document.querySelector('#resultTable');
        this.data = data;
        this.fullStatusNames = {
            ok: 'wszystko gotowe',
            wait: 'jestem w trakcie',
            error: 'mamy problem :('
        }
    }
    render = () =>{
        for(let i in this.data){
            this.box.append(this.makeRow(this.data[i], i));
        }
    }
    makeRow = (user, idx) =>{
        let row = document.createElement('tr');
        row.classList = 'row';

        let idCell = document.createElement('td');
        idCell.classList = 'index';
        idCell.innerText = idx;
        row.append(idCell);

        let statusCell = document.createElement('td');
        let statusDot = document.createElement('div');
        statusDot.classList = `statusDot ${user.status}`;
        statusCell.append(statusDot);
        statusCell.innerText = this.fullStatusNames[user.status];
        row.append(statusCell);

        let nameCell = document.createElement('td');
        nameCell.innerText = user.name;
    }
}
let resultTable = new ResultTable(test);
resultTable.render();


// let row = document.createElement('div');
// row.classList = 'row'

// let id = document.createElement('div');
// id.classList = 'index';
// id.innerText = idx;
// row.append(id);

// let statusDot = document.createElement('div');
// statusDot.classList = `statusDot ${user.status}`;
// row.append(statusDot);

// let nameBar = document.createElement('div');
// nameBar.classList = 'nameBar';
// nameBar.innerText = user.name;
// row.append(nameBar);

// return row;