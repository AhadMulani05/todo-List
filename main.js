const btn = document.querySelector("#addTaskBtn");
const textUser = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

btn.addEventListener("click", () => addTask());
textUser.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = textUser.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText); // Add task to the list
    saveTaskToStorage(taskText); // Store in localStorage

    textUser.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTaskFromStorage(taskText);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

function saveTaskToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task)); // Re-add tasks to the list
}