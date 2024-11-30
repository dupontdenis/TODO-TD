// Define a template string for the list item with remove and edit buttons
const template = (id, data) => `
  <li class="d-flex justify-content-between align-items-center" style="cursor: pointer;" data-id="${id}">
    <span class="task-text">${data}</span>
    <div>
      <button class="btn btn-warning btn-sm" data-edit>Edit</button>
      <button class="btn btn-danger btn-sm" data-remove>Remove</button>
    </div>
  </li>
`;

const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const submitButton = form.querySelector("button[type='submit']");

// Disable the submit button initially
submitButton.disabled = true;

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

  // Clear input field and reset the button
  taskInput.value = "";
  submitButton.disabled = true;
  submitButton.classList.toggle("btn-secondary", true);
  submitButton.classList.toggle("btn-primary", false);
});

// Add event listener to the task list to handle remove and edit button clicks
document.querySelector("#tasks").addEventListener("click", (event) => {
  const target = event.target;

  if (target.hasAttribute("data-remove")) {
    target.closest("li").remove();
  }

  if (target.hasAttribute("data-edit")) {
    const li = target.closest("li");
    const taskText = li.querySelector(".task-text");
    const currentText = taskText.textContent;

    // Replace task text with an input field
    taskText.innerHTML = `<input type="text" class="form-control edit-input" value="${currentText}">`;
    target.textContent = "Save";
    target.setAttribute("data-save", "");
    target.removeAttribute("data-edit");

    // Add a return statement to prevent further execution
    return;
  }

  if (target.hasAttribute("data-save")) {
    const li = target.closest("li");
    const editInput = li.querySelector(".edit-input");
    const newText = editInput.value.trim();

    if (newText !== "") {
      // Replace input field with the new task text
      li.querySelector(".task-text").textContent = newText;
      target.textContent = "Edit";
      target.setAttribute("data-edit", "");
      target.removeAttribute("data-save");
    } else {
      alert("Task cannot be empty.");
    }
  }
});
