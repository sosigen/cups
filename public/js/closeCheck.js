window.addEventListener('beforeunload', function (e) { 
    e.preventDefault();
    cupClient.sendClosingInfo();
    e.returnValue = ''; 
}); 