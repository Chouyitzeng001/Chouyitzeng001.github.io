//Selectors to .class名
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners 監聽器 當我按下開關時啟動addTodo這個function
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded',getTodos);

//Functions
function addTodo(event) {
    //prevent form from submitting
    //如果事件可以被取消，就取消事件（即取消事件的預設行為）。但不會影響事件的傳遞，事件仍會繼續傳遞。
    event.preventDefault();
    //建立 DIV Element
    const todoDiv = document.createElement("div");
    //新增DIV class名稱todo
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement("li");
    //建立文字內容 使用Input回傳內容
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTROAGE
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    //append 到todoDiv
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    //append 到todoDiv
    todoDiv.appendChild(trashButton);
    //總和功能append to list
    todoList.appendChild(todoDiv);
    //todoInput預設值"空白"
    todoInput.value = "";
};


//建立Delete 刪除內容
function deleteCheck(e){
    // console.log(e.target);//查詢class >>F12
    const item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-btn'){
        //parentElement 属性就是在 DOM 层次结构定义的上下级关系，如果元素A包含元素B，
        //那么元素B就可以通过 parentElement 属性来获取元素A。
        const todo = item.parentElement; 
        //Animation動態 
        todo.classList.add("fall");//執行CSS "fall"
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            //'transitionend'當Elem元素的transition屬性完成就執行函数
            todo.remove();
        });
    };
    //CHECK MARK
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    };
};

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                //contains如果A元素包含B元素，则返回true，否则false。
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        };
    });
};

function saveLocalTodos(todo){
    //check--Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    //check--Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //建立 DIV Element
        const todoDiv = document.createElement("div");
        //新增DIV class名稱todo
        todoDiv.classList.add("todo");
        //Create li
        const newTodo = document.createElement("li");
        //建立文字內容 使用Input回傳內容
        newTodo.innerText = todo.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        //append 到todoDiv
        todoDiv.appendChild(completedButton);
        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        //append 到todoDiv
        todoDiv.appendChild(trashButton);   
        //總和功能append to list
        todoList.appendChild(todoDiv);
    });
};
//刪除存取Storage值
function removeLocalTodos(todo){
    //check--Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        //JSON.parse()方法把會把一個 JSON 字串轉換成 JavaScript 的數值或是物件。
    }
    const todoIndex = todo.children[0].innerText;
    // console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex), 1);
    // //.splice(todos.indexof(todoIndex)你想移除的ELEM ,1 我想只要移除一個
    localStorage.setItem("todos", JSON.stringify(todos));
    //JSON.stringify()方法將 JavaScript 值轉換為 JSON 字符串
};  

// localStorage.getItem(key):获取指定key本地存储的值；   //  获取指定key 本地存储数据的值。

// localStorage.setItem(key,value)：将value存储到key字段； // 获取指定value 存储到key 字段

// localStorage.removeItem(key):删除指定key本地存储的值；  // 删除指定key 本地存储的值
