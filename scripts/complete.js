export let completedTasks =
  JSON.parse(localStorage.getItem("completedTasks")) || [];

if (document.querySelector(".completed-tasks-list")) {
  renderCompletedTasks();
}

function renderCompletedTasks() {
  let completedTasksHTML = "";
  if (completedTasks.length > 0) {
    completedTasks.map(
      (task) =>
        (completedTasksHTML += `<li><i id="check-square" class="fa-solid fa-square-check"></i>  ${task.name} (${task.date})</li>`)
    );
  } else {
    completedTasksHTML = "No completed task yet.";
  }

  document.querySelector(".completed-tasks-list").innerHTML =
    completedTasksHTML;
}

function clearHistory() {
  completedTasks = [];
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  renderCompletedTasks();
}

const clearButton = document.querySelector(".clear-history");

if (clearButton) {
  clearButton.addEventListener("click", () => {
    clearHistory();
  });
}
