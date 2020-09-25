//select classes in the DOM and assign variables to them
const todoInput  = document.querySelector('.todo-input');
const todoButton  = document.querySelector('.todo-button');
const todoList  = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//get the todo's from local storage if any on loading the DOM
document.addEventListener('DOMContentLoaded',getTodos);
//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

//functions to be called by event listeners

function addTodo(event){
    
    //prevent natural page behaviour
    event.preventDefault();

    // on clicking plus, you want to add a div containing your todo 
    //the div has an li and two icons for checked and trash
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create the li to display your todos
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value
    
    //add the todo to local storage
    saveLocalTodos(todoInput.value);
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //completed task  button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"</i>'
    todoDiv.appendChild(completedButton)

    //create a trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"</i>'
    todoDiv.appendChild(trashButton)

    //append div to the todolist
    todoList.appendChild(todoDiv);
    //clear the input field

}
//delete functionality
function deleteTodo(e){
    //get the element targeted by an even listener i.e item clicked
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        //the parent element is the li with the todo
        todo = item.parentElement;
        //animate the deletion
        todo.classList.add("fall");
        //remove it from local storage
        removeLocalTodos(todo);
        todo.addEventListener('transitioned',e => {
            todo.remove();
        });
        
      
    }
    if (item.classList[0] ==='complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed');
        console.log(todo);
    }
}
function filterTodo(e){
    //get an array object of all the todos
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
        }
    });

}

//function to save todos to local storage

function saveLocalTodos(todo){
    //check if a todo already exists
    let todos;
    if (localStorage.getItem("todos") === null){
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
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //create the li
    todos.forEach(function(todo){
        //create the todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create the todo li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        //completed tasks button
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"</i>'
        todoDiv.appendChild(completedButton)
    
        //trash item button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"</i>'
        todoDiv.appendChild(trashButton)
    
        //append div to the final todolist
        todoList.appendChild(todoDiv);

    });  
}
//remove todos from local storage
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
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




