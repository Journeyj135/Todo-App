const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');


let allTodos = getTodos();
updateTodoList;

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});


function addTodo() {
    const todoText = todoInput.value;
    if(todoText.length > 0) {
        allTodos.push(todoText);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}


function updateTodoList() {
    todoListUl.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    });
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLi = document.createElement('li');
    todoLi.className = "todo";

    todoLi.innerHTML = `<input type="checkbox" id="${todoId}">
                <label class='custom-checkbox' for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todo};
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
                </button>`

    const deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener('click', ()=>{
        deleteTodoItem(todoIndex);
    })
    return todoLi;
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todosJson);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}