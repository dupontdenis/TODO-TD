// Define a template string for the list item with remove, edit, and save buttons
const template = (id, data) => `
  <li class="d-flex justify-content-between align-items-center" style="cursor: pointer;" data-id="${id}">
    <span class="task-text">${data}</span>
    <div>
      <button class="btn btn-warning btn-sm" data-edit>Edit</button>
      <button class="btn btn-success btn-sm d-none" data-save>Save</button>
      <button class="btn btn-danger btn-sm" data-remove>Remove</button>
    </div>
  </li>
`;

const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const submitButton = form.querySelector("button[type='submit']");

// Disable the submit button initially
submitButton.disabled = true;

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const liHTML = template(task.id, task.data);
    document.querySelector("#tasks").insertAdjacentHTML("beforeend", liHTML);
    addEventListenersToTask(document.querySelector(`li[data-id="${task.id}"]`));
  });
});

// Add event listener to the input field to enable/disable the button
taskInput.addEventListener("input", () => {
  const isInputEmpty = taskInput.value.trim() === "";
  submitButton.disabled = isInputEmpty;
  submitButton.classList.toggle("btn-secondary", isInputEmpty);
  submitButton.classList.toggle("btn-primary", !isInputEmpty);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the task value
  const taskValue = taskInput.value;

  // Generate a unique ID for the task using uuid
  const taskId = uuid.v4();

  // Create new list item by replacing the placeholder with the actual task value
  const liHTML = template(taskId, taskValue);

  // Add new item to task list
  document.querySelector("#tasks").insertAdjacentHTML("beforeend", liHTML);

  // Save task to local storage
  saveTaskToLocalStorage({ id: taskId, data: taskValue });

  // Clear input field and reset the button
  taskInput.value = "";
  submitButton.disabled = true;
  submitButton.classList.toggle("btn-secondary", true);
  submitButton.classList.toggle("btn-primary", false);

  // Add event listeners to the new task item
  addEventListenersToTask(document.querySelector(`li[data-id="${taskId}"]`));
});

function addEventListenersToTask(taskElement) {
  const editButton = taskElement.querySelector("[data-edit]");
  const saveButton = taskElement.querySelector("[data-save]");
  const removeButton = taskElement.querySelector("[data-remove]");

  editButton.addEventListener("click", () => {
    const taskText = taskElement.querySelector(".task-text");
    const currentText = taskText.textContent;

    // Replace task text with an input field
    taskText.innerHTML = `<input type="text" class="form-control edit-input" value="${currentText}">`;
    editButton.classList.add("d-none");
    saveButton.classList.remove("d-none");
  });

  saveButton.addEventListener("click", () => {
    const taskText = taskElement.querySelector(".task-text");
    const editInput = taskElement.querySelector(".edit-input");
    const newText = editInput.value.trim();

    if (newText !== "") {
      // Replace input field with the new task text
      taskText.textContent = newText;
      editButton.classList.remove("d-none");
      saveButton.classList.add("d-none");

      // Update task in local storage
      updateTaskInLocalStorage(taskElement.dataset.id, newText);
    } else {
      alert("Task cannot be empty.");
    }
  });

  removeButton.addEventListener("click", () => {
    taskElement.remove();
    removeTaskFromLocalStorage(taskElement.dataset.id);
  });
}

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskId, newData) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].data = newData;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTaskFromLocalStorage(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
