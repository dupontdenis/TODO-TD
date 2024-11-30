document.querySelector("form").onsubmit = () => {
  // Create new item for list
  const li = document.createElement("li");
  li.innerHTML = document.querySelector("#task").value;

  // Add new item to task list
  document.querySelector("#tasks").append(li);

  // Stop form from submitting
  return false;
};
