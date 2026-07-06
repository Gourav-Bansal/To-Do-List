const taskInput = document.getElementById("taskInput"); 
const addButton = document.getElementById("addButton");
const tasks = [];
let searchText = "";
let currentFilter = "all";

addButton.addEventListener("click", function(){
    
    const task = taskInput.value;
    tasks.push({
        text : task,
        completed : false
    });
    console.log("Button clicked");
    displayTask();   
    taskCount();
    console.log(tasks) 
});

let taskList = document.getElementById("taskList");

function displayTask(){
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

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        checkBox.checked = tasks[i].completed;

        checkBox.addEventListener("change", function(){
            tasks[i].completed = checkBox.checked;
            displayTask();
            taskCount();
        });
        
        const span = document.createElement("span");
        span.innerHTML = tasks[i].text;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";

        deleteButton.addEventListener("click", function(){
            console.log("Delete");
            tasks.splice(i,1);
            displayTask();
            taskCount();
        })

        li.appendChild(checkBox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
                   
    }
};

const completedTask = document.getElementById("completedTask");
const leftTask = document.getElementById("leftTask");

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





