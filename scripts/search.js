import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// getting today's date and updating the title.

const toDoList = JSON.parse(localStorage.getItem("list")) || [];

const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Get date

function getDate() {
  const today = new dayjs().format("YYYY-MM-DD");

  return today;
}
const today = getDate();
const titleElement = document.querySelector(".search-title");

let day = today;

titleElement.innerHTML = `To-dos (${today})`;

// ShowTasks

let tasksByDayHTML = "";
let matchingTasks;

const formElement = document.querySelector(".search");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

function showTasks(day, name) {
  if (day && !name) {
    matchingTasks = toDoList.filter((list) => list.date === day);

    tasksByDayHTML += matchingTasks.length
      ? matchingTasks
          .map(
            (task, index) => `
              <li data-id="${index}" class="task-by-day">
              <div class="task-detail">
              <p>${task.name} 
              </p>
              <div class="updated">
              <button class="completed">
              <i class="fa-solid fa-square-check"></i>
             </button>
              <button class="trash-button">
              <i id="trash" class="fa-sharp fa-solid fa-trash"></i>
              </button></div>
              </div>
            </li>`
          )
          .join("")
      : "No task found.";
  } else if (name && !day) {
    matchingTasks = toDoList.filter((list) => list.name.toLowerCase() === name);
    tasksByDayHTML += matchingTasks.length
      ? matchingTasks
          .map(
            (task) => `
            <li class="task-by-day">${task.name}  (${task.date})</li>
              <li data-id="${index}" class="task-by-day">
              <div class="task-detail">
              <p>${task.name} 
              </p>
              <div class="updated">
              <button class="completed">
              <i class="fa-solid fa-square-check"></i>
             </button>
              <button class="trash-button">
              <i id="trash" class="fa-sharp fa-solid fa-trash"></i>
              </button></div>
              </div>
            </li>            
            `
          )
          .join("")
      : "No task found.";
    titleElement.innerHTML = `To-dos`;
  } else if (name && day) {
    matchingTasks = toDoList.filter(
      (list) => list.date === day && list.name.toLowerCase() === name
    );

    tasksByDayHTML += matchingTasks.length
      ? matchingTasks
          .map(
            (task) => `
            <li class="task-by-day">${task.name}  (${task.date})</li>
              <li data-id="${index}" class="task-by-day">
              <div class="task-detail">
              <p>${task.name} 
              </p>
              <div class="updated">
              <button class="completed">
              <i class="fa-solid fa-square-check"></i>
             </button>
              <button class="trash-button">
              <i id="trash" class="fa-sharp fa-solid fa-trash"></i>
              </button></div>
              </div>
            </li>           
            `
          )
          .join("")
      : "No task found.";
  }

  const tasksByDayElement = document.querySelector(".tasks-by-day-list");
  tasksByDayElement.innerHTML = tasksByDayHTML;

  displayIconsToUpdate();

  document.querySelectorAll("#trash").forEach((trash, index) => {
    trash.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTask(index);
    });
  });

  document.querySelectorAll(".completed").forEach((tick, index) => {
    tick.addEventListener("click", () => {
      markCompleted(index);
    });
  });
}

showTasks(day);

function searchForTasks() {
  console.log("Searching");
  const name = document.querySelector(".search-task").value;
  const date = document.querySelector(".date-input").value;
  day = date;

  titleElement.innerHTML = `To-dos (${day})`;

  tasksByDayHTML = "";
  const formattedName = name.toLowerCase();
  showTasks(date, formattedName);
}

const searchButton = document.querySelector(".js-search-task");

searchButton.addEventListener("click", () => {
  searchForTasks();
});

// Display trash icon and check icon when each list is clicked.

displayIconsToUpdate();

export function displayIconsToUpdate() {
  const taskList = document.querySelectorAll(".task-by-day");

  // console.log(taskList);

  taskList.forEach((task, index) => {
    const taskId = Number(task.dataset.id);
    // console.log(taskId);

    const updateElement = task.querySelector(".updated");

    task.addEventListener("mouseover", () => {
      if (index === taskId) {
        updateElement.style.display = "block";
      }
    });
    task.addEventListener("mouseout", () => {
      if (index === taskId) {
        updateElement.style.display = "none";
      }
    });
  });

  // console.log("run");
}

export function deleteTask(id) {
  console.log("deleted");
  toDoList.splice(id, 1);
  localStorage.setItem("list", JSON.stringify(toDoList));
  tasksByDayHTML = ""; // Clear the current HTML before re-rendering
  showTasks(day);
}

// let matchingItem;

export function markCompleted(id) {
  console.log("marked");

  const task = toDoList[id].name;
  console.log(`${id} completed, ${task}`);
  console.log(toDoList[id]);

  completedTasks.push({
    id: id,
    name: toDoList[id].name,
    date: toDoList[id].date,
  });
  toDoList.splice(id, 1);

  localStorage.setItem("list", JSON.stringify(toDoList));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  tasksByDayHTML = ""; // Clear the current HTML before re-rendering
  showTasks(day);
}
