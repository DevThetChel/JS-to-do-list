import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// getting today's date and updating the title.

let toDoList = JSON.parse(localStorage.getItem("list")) || [];

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
  if (!day && !name) {
    tasksByDayHTML += "Please insert a name or a date to search.";
    titleElement.innerHTML = "To-dos";
  } else if (day && !name) {
    matchingTasks = toDoList.filter((list) => list.date === day);

    tasksByDayHTML += matchingTasks.length
      ? matchingTasks
          .map(
            (task) => `
              <li data-id="${task.id}" class="task-by-day">
              <div class="task-detail">
              <p>${task.name}
              </p>
              <div class="updated">
              <button data-id="${task.id}" class="completed">
              <i class="fa-solid fa-square-check"></i>
             </button>
              <button data-id="${task.id}" class="trash-button" >
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
            <li data-id="${task.id}" class="task-by-day">
              <div class="task-detail">
              <p>${task.name}  (${task.date})</p>
              <div class="updated">
              <button data-id="${task.id}" class="completed" >
              <i class="fa-solid fa-square-check"></i>
             </button>
              <button data-id="${task.id}" class="trash-button" >
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
            <li data-id="${task.id}" class="task-by-day">
              <div class="task-detail">
              <p>${task.name}  (${task.date})</p>
              <div class="updated">
              <button data-id="${task.id}" class="completed"
              >
              <i class="fa-solid fa-square-check"></i>
             </button>
              <button data-id="${task.id}" class="trash-button"
             >
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
  tasksByDayElement.innerHTML = "";

  tasksByDayElement.innerHTML = tasksByDayHTML;

  displayIconsToUpdate();

  tasksByDayElement.querySelectorAll(".trash-button").forEach((trash) => {
    const id = trash.dataset.id;

    trash.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(id);
      deleteTask(id);
    });
  });

  tasksByDayElement.querySelectorAll(".completed").forEach((tick) => {
    const id = tick.dataset.id;

    tick.addEventListener("click", (event) => {
      event.preventDefault();
      markCompleted(id);
      console.log(id);
    });
  });
}

showTasks(day);

function searchForTasks() {
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

function displayIconsToUpdate() {
  const taskList = document.querySelectorAll(".task-by-day");

  taskList.forEach((task) => {
    const updateElement = task.querySelector(".updated");

    task.addEventListener("mouseover", () => {
      updateElement.style.display = "block";
    });
    task.addEventListener("mouseout", () => {
      updateElement.style.display = "none";
    });
  });
}

// console.log(toDoList);

function deleteTask(id) {
  console.log(`${id} deleted`);
  const newList = toDoList.filter((task) => task.id !== id);

  toDoList = newList;

  localStorage.setItem("list", JSON.stringify(toDoList));
  tasksByDayHTML = "";
  showTasks(day);
}

// let matchingItem;

function markCompleted(id) {
  console.log(toDoList);

  const matchedTask = toDoList.filter((task) => task.id === id);

  completedTasks.push({
    id: matchedTask[0].id,
    name: matchedTask[0].name,
    date: matchedTask[0].date,
  });

  const newList = toDoList.filter((task) => task.id !== id);

  toDoList = newList;

  localStorage.setItem("list", JSON.stringify(toDoList));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  tasksByDayHTML = ""; // Clear the current HTML before re-rendering

  showTasks(day);
}
