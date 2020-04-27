const pendingList = document.querySelector('.toDoPending'),
    toDoForm = document.querySelector('.todoForm'),
    toDoInput = toDoForm.querySelector('input'),
    finishedList = document.querySelector('.toDoFinished');


let pendingToDo = [];
let finishedToDo =[];


//pending

//우리가 구현해야 하는 것 => finishedList 
//우리가 해야하는 것 => 1. loadToDo함수가 finshedList을 불러서 데이터를 가공해야한다.
//                  =>2. 정보를  가공할 때 pendingList와 분리해 가공해야 한다.
//                  =>3. pendingList의 element가 finishedList에 전달되야 한다.
//                  =>4. finishedList의 element가 pending에게 전달되어햐 한다.



//paintToDo의 btn의 click 이벤트에 불려지는 함수.
//기록된 정보를 지우는 함수 
function pendingdeleteToDo(event){
    const btn  = event.target;
    const li = btn.parentNode;

    pendingList.removeChild(li);
    
    const cleanToDo = pendingToDo.filter(function(element, index, all){
        return element.id !== parseInt(li.id)
    })
    pendingToDo = cleanToDo;
    PendingSaveToDo(pendingToDo)
}


//data을 저장하는 함수 정보 업데이트나 정보 추가 할때 불리는 함수이다.
//odject을 프로그램이 읽을 수 있도록 하기 위해서 text로 바꿔주는 json 메소드를 사용한다.
function PendingSaveToDo(pendingToDo){
    localStorage.setItem('PENDING', JSON.stringify(pendingToDo))
} 

//handleSubmit func and loadToDo func 에 정보를 전달받아
//화면에 출력하는 함수 화면에 출력하고 난 다음에는 정보의 저장을 위해
//data을 saveToDo에 전달하는 역할까지 맏고 있다.
function paintPendingToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const finishBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = pendingToDo.length + 1;
    
    li.id = newId;

    span.innerText = text
    
    delBtn.addEventListener(`click`, pendingdeleteToDo);
    delBtn.innerText = '❌';
    
    finishBtn.addEventListener(`click`, finishChangeToDo);
    finishBtn.innerText = '✅';
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    
    
    pendingList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }
    pendingToDo.push(toDoObj);
    const cleanToDo = pendingToDo.filter(function(element, index, all){
        return element.text !== undefined
    })
    pendingToDo = cleanToDo;
    PendingSaveToDo(pendingToDo)
}

//form에서 submit이 일어날 때마다 호출되는 함수.
// 입력된 정보를 paintPendingToDo 함수에게 전달한다.

// loadToDo의 콜백함수.
// 반복적으로 불리는 함수이며 object마다 정보를 가공한다.
function PaintParsePending(element, index, all){
    paintPendingToDo(element.text);
}


function pendingChangeToDo(event){
    const btn  = event.target;
    console.log(btn.parentNode);
    const li = btn.parentNode;
    const oldId = li.id;
    const text = li.childNodes[0].innerText;
    const id = Math.floor(Math.random(100))


    const extartToDo = finishedToDo.filter(function(element, index, all){
        return element.text === text
    })

    pendingToDo.push(extartToDo);
    PendingSaveToDo(pendingToDo);

    const cleanToDo = finishedToDo.filter(function(element, index, all){
        return element.text !== text
    })
    finishedToDo = cleanToDo;
    PendingSaveToDo(finishedToDo);
    paintPendingToDo(text)
    finishedList.removeChild(li)
}




//handle


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPendingToDo(currentValue);
    toDoInput.value = "";
}





// finished






function PaintParseFinshed(elemnt, index, all){
    paintFinishedToDo(elemnt.text)
}

function paintFinishedToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const finishBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = finishedToDo.length + 1;
    
    li.id = newId;

    span.innerText = text
    
    delBtn.addEventListener(`click`, finishedDeleteToDo);
    delBtn.innerText = '❌';
    
    finishBtn.addEventListener(`click`, pendingChangeToDo);
    finishBtn.innerText = '⏮';
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    
    
    finishedList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }
    finishedToDo.push(toDoObj);
    const cleanToDo = finishedToDo.filter(function(element, index, all){
        return element.text !== undefined
    })
    finishedToDo = cleanToDo;
    PendingSaveToDo(finishedToDo)
}

function finishChangeToDo(event){
    const btn  = event.target;
    const li = btn.parentNode;
    const text = li.childNodes[0].innerText
    const id = Math.floor(Math.random(100))

    
    const extartToDo = pendingToDo.filter(function(element, index, all){
        return element.text === text
    })
    
    finishedToDo.push(extartToDo);
    finishedSaveToDo(finishedToDo);
    
    const cleanToDo = pendingToDo.filter(function(element, index, all){
        return element.text !== text
    })


    pendingToDo = cleanToDo;
    PendingSaveToDo(pendingToDo)

    paintFinishedToDo(text, id);
    pendingList.removeChild(li)
}

function finishedSaveToDo(finishedToDo){
    localStorage.setItem('FINISHED', JSON.stringify(finishedToDo))
}

function finishedDeleteToDo(event){
    const btn  = event.target;
    const li = btn.parentNode;

    finishedList.removeChild(li);
    
    const cleanToDo = finishedToDo.filter(function(element, index, all){
        return element.id !== parseInt(li.id)
    })
    finishedToDo = cleanToDo;
    finishedSaveToDo(finishedToDo)
}

//loadToDo 함수는 localstorage에 접근하여 object의 유무를 확인한다.
//object가 있으면 todoList을 오브젝트 형식으로 반환하여 정보를 전달한 후
//화면에 전달한다.

function loadToDo(){
    const toDoPending = localStorage.getItem('PENDING');
    const toDofinished = localStorage.getItem('FINISHED');
    if(toDoPending !== null){
        const parsePending = JSON.parse(toDoPending);
        parsePending.forEach(PaintParsePending);
        if(toDofinished !== null){
            const parseFinished = JSON.parse(toDofinished);
            parseFinished.forEach(PaintParseFinshed);
        }
    }
}

// form에 정보가 전달 되면 handleSubmit 함수가 실행된다.
// 이와 더불어  loadToDo 함수를 부른다.
function init(){
    loadToDo();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();