const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTask(taskText, taskDate.value, taskTime.value);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

function createTask(taskText, date, time) {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
        <div class="task-info">
            <div class="task-name">${taskText}</div>
            <div class="task-date">
                ${date || "No date"} ${time || "No time"}
            </div>
        </div>

        <div class="task-buttons">
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    const completeBtn = li.querySelector(".complete-btn");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", function () {
        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {
            completeBtn.textContent = "Completed";
        } else {
            completeBtn.textContent = "Complete";
        }
    });

    editBtn.addEventListener("click", function () {
        const currentTask = li.querySelector(".task-name").textContent;

        const newTask = prompt("Edit your task:", currentTask);

        if (newTask !== null && newTask.trim() !== "") {
            li.querySelector(".task-name").textContent = newTask.trim();
        }
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });
}