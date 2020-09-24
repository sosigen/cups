window.addEventListener('beforeunload', function (e) { 
    e.preventDefault();
    if(cupClient.currentName) cupClient.sendData(cupClient.closingURL, cupClient.currentName);
    e.returnValue = ''; 
}); 