import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// getting today's date and updating the title.

const toDoList = JSON.parse(localStorage.getItem("list")) || [];

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

function showTasks(day, name) {
  if (day && !name) {
    matchingTasks = toDoList.filter((list) => list.date === day);

    tasksByDayHTML += matchingTasks.length
      ? matchingTasks.map((task) => `<li>${task.name}</li>`).join("")
      : "No task found for the given date";
  } else if (name && !day) {
    matchingTasks = toDoList.filter((list) => list.name === name);
    tasksByDayHTML += matchingTasks.length
      ? matchingTasks
          .map((task) => `<li>${task.name} (${task.date})</li>`)
          .join("")
      : "No task found for the given name";
    titleElement.innerHTML = `To-dos`;
  } else if (name && day) {
    matchingTasks = toDoList.filter(
      (list) => list.date === day && list.name === name
    );

    tasksByDayHTML += matchingTasks.length
      ? matchingTasks
          .map((task) => `<li>${task.name} (${task.date})</li>`)
          .join("")
      : "No task found for the given date and name";
  }

  const tasksByDayElement = document.querySelector(".tasks-by-day-list");
  tasksByDayElement.innerHTML = tasksByDayHTML;
}

showTasks(day);

// OR ------
// function showTasksByDay() {
//   matchingTasks = toDoList.filter((list) => list.date === day);

//   matchingTasks.length
//     ? matchingTasks.map((task) => (tasksByDayHTML += `<li>${task.name}</li>`))
//     : (tasksByDayHTML += "No task found for the given date");

//   const tasksByDayElement = document.querySelector(".tasks-by-day-list");
//   tasksByDayElement.innerHTML = tasksByDayHTML;
// }

// Search

// function showTasksByName(name, date) {
//   matchingTasks = toDoList.filter((list) => list.name === name);

//   tasksByDayHTML += matchingTasks.length
//     ? matchingTasks
//         .map((task) => `<li>${task.name} (${task.date})</li>`)
//         .join("")
//     : "No task found for the given name";

//   const tasksByDayElement = document.querySelector(".tasks-by-day-list");
//   tasksByDayElement.innerHTML = tasksByDayHTML;
// }

function searchForTasks() {
  console.log("Searching");
  const name = document.querySelector(".search-task").value;
  const date = document.querySelector(".date-input").value;
  day = date;

  titleElement.innerHTML = `To-dos (${day})`;

  tasksByDayHTML = "";

  showTasks(date, name);
}

const searchButton = document.querySelector(".js-search-task");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchForTasks();
});
