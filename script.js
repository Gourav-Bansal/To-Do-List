const taskInput = document.getElementById("taskInput"); 
const addButton = document.getElementById("addButton");
const tasks = [];
let searchText = "";
let currentFilter = "all";
const emptyState = document.getElementById("emptyState");

addButton.addEventListener("click", function(){
    
    const task = taskInput.value;
    taskInput.value=" ";
    tasks.push({
        text : task,
        completed : false
    });
    // console.log("Button clicked");
    displayTask();   
    taskCount();
    // console.log(tasks) 
});

let taskList = document.getElementById("taskList");

function displayTask(){

    if(tasks.length === 0){
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
        }
        
    taskList.innerHTML = ""

    for(let i=0; i<tasks.length; i++){

        if (!tasks[i].text.toLowerCase().includes(searchText)) {
            continue;
        }

        if (currentFilter === "active" && tasks[i].completed) {
            continue;
        }

        if (currentFilter === "completed" && !tasks[i].completed) {
            continue;
        }

        const li = document.createElement("li");
        li.classList.add("task-item");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        checkBox.checked = tasks[i].completed;

        checkBox.addEventListener("change", function(){
            tasks[i].completed = checkBox.checked;
            displayTask();
            taskCount();
        });
        
        const span = document.createElement("span");
        span.id = "txt";
        span.innerHTML = tasks[i].text;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function(){
            // console.log("Delete");
            tasks.splice(i,1);
            displayTask();
            taskCount();
        })

        const leftSection = document.createElement("div");
        leftSection.classList.add("left-section");
        leftSection.appendChild(checkBox);
        leftSection.appendChild(span);

        li.appendChild(leftSection);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
                   
    }
};

const completedTask = document.getElementById("completed-task");
const leftTask = document.getElementById("left-task");

function taskCount(){
    let completed = 0;
    let left = 0;

    for(let i=0; i<tasks.length; i++){
        if(tasks[i].completed){
            completed++ ;
        } else {
            left++ ;
        }
    }

    completedTask.innerHTML = completed;
    leftTask.innerHTML = left ;
};

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function(){
    
    searchText = searchInput.value.toLowerCase();
    displayTask();

});

const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");

allButton.addEventListener("click", function(){
    currentFilter = "all";
    displayTask();
})

activeButton.addEventListener("click", function(){
    currentFilter = "active";
    displayTask();
});

completedButton.addEventListener("click", function(){
    currentFilter = "completed";
    displayTask();
});

// function setActiveButton(button){
//     allButton.classList.remove("active");
//     activeButton.classList.remove("active");
//     completedButton.classList.remove("active");
//     button.classList.add("active");
// }




