const pendingList = document.querySelector('#toDoPending'),
    toDoForm = document.querySelector('.todoForm'),
    toDoInput = toDoForm.querySelector('input'),
    finishList = document.querySelector('#toDoFinished');


let pendingToDo = [];

let finishToDo =[];


//localstotyge에 접근해서 정보를 불러오는 함수
function loadToDo(){
    const Pending = localStorage.getItem('PENDING');
    const finished = localStorage.getItem('FINISHED');
    if(Pending !== null){
        const parsePending = JSON.parse(Pending);
        parsePending.forEach(ParsePending);
        if(finished !== null){
            const parseFinished = JSON.parse(finished);
            parseFinished.forEach(ParseFinshed);
        }
    }
}

function ParsePending(element, index, all){
    paintPending(element.text);
}

function ParseFinshed(element){
    paintFinish(element.text)
}

//input 안에 정보를 집어 넣었을 경우 localstoryge에 저장하는 함수
function handleSubmit(event){
    event.preventDefault();

    const currentValue = toDoInput.value;
    paintPending(currentValue);
    toDoInput.value = "";
}



//정보를 삭제하는 함수
function deleteToDo(event){
    const btn  = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    //pending delete
    if(ul.id === 'toDoPending'){

        pendingList.removeChild(li);
        
        const cleanToDos = pendingToDo.filter(function(element){
            return element.id !== parseInt(li.id)
        })
        pendingToDo = cleanToDos;
        localStorage.setItem('PENDING', JSON.stringify(pendingToDo))

    }
    //finished delete
    else{
        finishList.removeChild(li);

        const cleanToDos = pendingToDo.filter(function(element){
            return element.id !== parseInt(li.id)
        })
        finishToDo = cleanToDos;
        localStorage.setItem('FINISHED', JSON.stringify(finishToDo))

    }
}




//value를 바꿔주는 함수.
function changetoDo(event){
    const btn  = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    const text = li.childNodes[0].innerText;

    //pending => finish
    if(ul.id === 'toDoPending'){
        //pending에서 finish로 정보를 전달한다.
        paintFinish(text);

        
        const cleanToDos = pendingToDo.filter(function(element){
            return element.id !== parseInt(li.id);
        })
        
        pendingToDo = cleanToDos;
        localStorage.setItem('PENDING', JSON.stringify(pendingToDo))

        pendingList.removeChild(li);
    }
    //finish => pending
        else{

        paintPending(text);

        
        const cleanToDos = finishToDo.filter(function(element){
            return element.id !== parseInt(li.id);
        })
        
        finishToDo = cleanToDos;
        localStorage.setItem('FINISHED', JSON.stringify(finishToDo))

        finishList.removeChild(li);
    }
}




//pending value를 인터페이스로 바꿔주는 함수
function paintPending(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const changeBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = Math.floor(Math.random()*1000);

    
    delBtn.addEventListener(`click`, deleteToDo);
    delBtn.innerText = '❌';
    
    span.innerText = text;

    changeBtn.addEventListener('click', changetoDo)
    changeBtn.innerText = '✅'

    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(changeBtn);
    pendingList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }
    pendingToDo.push(toDoObj);
    localStorage.setItem('PENDING', JSON.stringify(pendingToDo))
}




//finish value를 pending value로 바꿔주는 함수 

function paintFinish(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const changeBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = Math.floor(Math.random()*1000);

    
    delBtn.addEventListener(`click`, deleteToDo);
    delBtn.innerText = '❌';
    
    span.innerText = text;

    changeBtn.addEventListener('click', changetoDo)
    changeBtn.innerText = '⏮'

    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(changeBtn);
    finishList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }
    finishToDo.push(toDoObj);
    localStorage.setItem('FINISHED', JSON.stringify(finishToDo))
}


function init(){
    loadToDo();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();




