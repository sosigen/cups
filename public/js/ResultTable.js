// let test = [
//     { name: 'asdasd', status: 'wait', _id: 'Z3BByJN5twwOqrvK' },
//     { name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', status: 'error', _id: 'zj1xnvtfAzubyz05' },
//     { name: 'haj', status: 'ok', _id: 'zj1xnvtfAzubyz05' },
//     { name: 'hoj', status: 'wait', _id: 'zj1xnvtfAzubyz05' },
//     { name: 'hyj', status: 'error', _id: 'zj1xnvtfAzubyz05' },
//     { name: 'wiem co pomyslales', status: 'ok', _id: 'zj1xnvtfAzubyz05' }
// ];

//klasa obslugujaca tabele - liste uzytkownikow
class ResultTable{
    constructor(){
        this.box = document.querySelector('#resultTable');
        this.data = null;
        this.fullStatusNames = {
            ok: 'gotowe',
            wait: 'w trakcie',
            error: 'problem'
        }
        window.setInterval(this.refresh, 1000)
    }
    //metoda wstawiająca tabelę do dokumentu HTML
    render = () =>{
      this.box.innerHTML = 
      `<thead>
            <tr>
                <th>#</th>
                <th>Imie</th>
                <th>Status</th>
            </tr>
        </thead>`
        for(let i in this.data){
            this.box.append(this.makeRow(this.data[i], Number(i)+1));
        }
    }
    //metoda tworząca pojedynczy wierz tabeli
    makeRow = (user, idx) =>{
        let row = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.innerText = idx;
        row.append(idCell);

        let nameCell = document.createElement('td');
        nameCell.innerText = user.name;
        row.append(nameCell);

        let statusCell = document.createElement('td');
        statusCell.innerHTML = `<span class='${user.status}'>${this.fullStatusNames[user.status]}</span>`;
        row.append(statusCell);

        return row;
    }
    //pobranie danych z bazy i ponowne renderowanie 
    //odswiezonej wersji listy
    refresh = async () =>{
        this.data = await cupClient.getData();
        this.render();
        
    }

}

let resultTable = new ResultTable();
resultTable.render();
