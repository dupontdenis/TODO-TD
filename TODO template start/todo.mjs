// Define a template string for the list item without buttons
const template = (data) => `
  <li class="d-flex justify-content-between align-items-center" style="cursor: pointer;">
    <span class="task-text">${data}</span>
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
  if (isInputEmpty) {
    submitButton.classList.add("btn-secondary");
    submitButton.classList.remove("btn-primary");
  } else {
    submitButton.classList.remove("btn-secondary");
    submitButton.classList.add("btn-primary");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the task value
  const taskValue = taskInput.value;

  // Create new list item by replacing the placeholder with the actual task value
  const liHTML = template(taskValue);

  // Add new item to task list
  document.querySelector("#tasks").insertAdjacentHTML("beforeend", liHTML);

  // Clear input field and reset the button
  taskInput.value = "";
  submitButton.disabled = true;
  submitButton.classList.add("btn-secondary");
  submitButton.classList.remove("btn-primary");
});
