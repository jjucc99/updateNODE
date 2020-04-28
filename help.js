const taskForm = document.querySelector(".js-form"),
    taskInput = taskForm.querySelector("input")
pendingTaskList = document.querySelector(".js-pendingTaskList");
finishedTaskList = document.querySelector(".js-finishedTaskList");
​
const PENDINGTASKS_LS = 'PENDING';
const FINISHEDTASKS_LS = 'FINISHED';
​
function filterFn(task) {
    return task.id === 1;
}
​
let tasks = [];
​
function deletePendingTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingTaskList.removeChild(li);
    const cleanTasks = tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    tasks = cleanTasks;
    saveTasks();
}
​
function deleteFinishedTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedTaskList.removeChild(li);
    const cleanTasks = tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    tasks = cleanTasks;
    saveTasks();
}
​
function finishedTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedTaskList.apeendChild(li);
    const movingTasks = tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    tasks = movingTasks;
    saveTasks();
}
​
function saveTasks() {
    localStorage.setItem(PENDINGTASKS_LS, JSON.stringify(tasks));
    localStorage.setItem(FINISHEDTASKS_LS, JSON.stringify(tasks));
}
​
​
function pendingTask(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button")
    const span = document.createElement("span");
    const newId = tasks.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePendingTask);
    checkBtn.innerText = "✅"
    checkBtn.addEventListener("click", finishedTask);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    pendingTaskList.appendChild(li);
    const tasksObj = {
        text: text,
        id: newId
    };
    tasks.push(tasksObj);
    saveTasks();
​
}
function finishedTask(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button")
    const span = document.createElement("span");
    const newId = tasks.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinishedTask);
    checkBtn.innerText = "⏪"
    checkBtn.addEventListener("click", pendingTask);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    finishedTaskList.appendChild(li);
    const tasksObj = {
        text: text,
        id: newId
    };
    tasks.push(tasksObj);
    saveTasks();
​
}
​
​
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = taskInput.value;
    pendingTask(currentValue);
    taskInput.value = "";
}
​
function loadTasks() {
    const loadedTasks = localStorage.getItem(PENDINGTASKS_LS);
    if (loadedTasks !== null) {
        const parsedTasks = JSON.parse(loadedTasks);
        parsedTasks.forEach(function (task) {
            pendingTask(task.text);
        });
    }
}
​
function init() {
    loadTasks();
    taskForm.addEventListener("submit", handleSubmit)
}
​
init();