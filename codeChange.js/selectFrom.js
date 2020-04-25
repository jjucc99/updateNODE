const selectElement = document.querySelector('select');
const hi = document.querySelector('h1');

function hiEverybody(country){
    if(country === 'KR'){
        hi.innerText = "안녕하세요"
    }
    else if(country === 'GR'){
        hi.innerText = 'Γεια σας'
    }
    else if(country === 'TR'){
        hi.innerText = 'Merhaba'
    }
    else{
        hi.innerText ='Hei'
    }
}

function setItem(event){
    const key = event.target.name;
    const value = event.target.value;
    localStorage.setItem(key, value)
    
    hiEverybody(value)
}

function init(){
    selectElement.addEventListener('change', setItem)
}

init()