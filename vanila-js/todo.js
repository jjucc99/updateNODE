const toDoList = document.querySelector('#js-toDoList'),
    toDoForm = document.querySelector('.js-todoForm'),
    toDoInput = toDoForm.querySelector('input'); 

const TODOS_LS = 'toDos'; 

let toDos = [];

function deleteToDo(event){
    const btn  = event.target;
    const li = btn.parentNode;
    const mother =li.parentNode;
    console.log(mother.id);
    console.log(mother.className);

    toDoList.removeChild(li);
    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    })
    toDos = cleanToDos;
    saveToDos()
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
} 

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;

    delBtn.addEventListener(`click`, deleteToDo);
    delBtn.innerText = '❌';
    span.innerText = text

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function PaintParseToDo(element, index, all){
    paintToDo(element.text);
}

function loadToDo(){
    const loadTodo = localStorage.getItem(TODOS_LS);
    
    if(loadTodo !== null){
        const parseToDos = JSON.parse(loadTodo);
        parseToDos.forEach(PaintParseToDo);
    }
}


function init(){
    loadToDo();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();