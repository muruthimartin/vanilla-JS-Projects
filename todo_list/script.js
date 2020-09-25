
const todoInput  = document.querySelector('.todo-input');
const todoButton  = document.querySelector('.todo-button');
const todoList  = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//add a todo when you click the plus button
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event){
    //prevent form from submiting
    event.preventDefault();
    // on clicking plus, you want to add a div containing your todo 
    //item in an li and an option to delete
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create the li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo);
    //add the todo to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"</i>'
    todoDiv.appendChild(completedButton)

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"</i>'
    todoDiv.appendChild(trashButton)

    //append div to the todolist
    todoList.appendChild(todoDiv);
    //clear the input field
    todoInput.value = "";

}
//delete functionality
function deleteCheck(e){
    //delete a todo
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        //the parent element is the li with the todo
        todo = item.parentElement;
        //animate
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitioned',()=>{
            todo.remove();
        });
        
      
    }
    if (item.classList[0] ==='complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed');
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;

        }
    });

}

//function to save todos to local storage

function saveLocalTodos(todo){
    //check if a todo already exists
    let todos;
    if (localStorage.getItem(todos) === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));
}
//load todos from local storage
function getTodos(){
    let todos;
    if (localStorage.getItem(todos) === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create the li
    todos.forEach(function(todo){
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"</i>'
        todoDiv.appendChild(completedButton)
    
        //check trash button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"</i>'
        todoDiv.appendChild(trashButton)
    
        //append div to the todolist
        todoList.appendChild(todoDiv);

    });  
}
//remove todos from local storage
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem(todos) === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //get the todo text
    //todo is the div, todo.children[0] is the li
    const todoIndex = todo.children[0].innerText;
    //check the array of data and remove the selected element
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));

}




