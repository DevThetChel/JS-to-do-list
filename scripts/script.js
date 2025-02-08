import { completedTasks } from "./complete.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

const addTaskButton = document.querySelector(".js-add-task");

const formElement = document.querySelector(".form");

// getting toDoList

let toDoList = JSON.parse(localStorage.getItem("list")) || [];

// Preventing Default for the form.

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

const today = new dayjs().format("YYYY-MM-DD");
const lastRunDate = localStorage.getItem("lastRunDate");

if (lastRunDate !== today) {
  generateDailyTasks();
} else {
  console.log("already run");
}

function generateDailyTasks() {
  const dailyTasks = [
    "React",
    "JS",
    "Work",
    "Workout",
    "Chinese",
    "Guitar",
    "Book",
    "Teach",
  ];

  dailyTasks.map((task) =>
    toDoList.push({
      id: nanoid(),
      name: task,
      date: today,
    })
  );

  localStorage.setItem("list", JSON.stringify(toDoList));
  localStorage.setItem("lastRunDate", today);

  console.log(toDoList);
}

showToDo();

function showToDo() {
  let listHTML = "";
  if (toDoList.length < 1) {
    document.querySelector(".tasks-list").innerHTML =
      "No task for now. Gonna take a rest today?";
  } else {
    toDoList.forEach((task) => {
      listHTML += ` 

        <li data-id="${task.id}" class="task-list">
          <div class="task-detail">
          <p>${task.name} (${task.date}) 
          </p>
          <div class="updated">
          <button data-name=${task.name} data-id="${task.id}" class="completed">
          <i class="fa-solid fa-square-check"></i>
         </button>
          <button data-id="${task.id}" class="trash-button">
          <i id="trash" class="fa-sharp fa-solid fa-trash"></i>
          </button></div>
          </div>
        </li>`;
    });

    document.querySelector(".tasks-list").innerHTML = listHTML;
    displayIconsToUpdate();
    document.querySelectorAll(".trash-button").forEach((trash) => {
      const id = trash.dataset.id;

      trash.addEventListener("click", () => {
        deleteTask(id);
      });
    });

    document.querySelectorAll(".completed").forEach((tick) => {
      // console.log(tick.dataset.id);
      tick.addEventListener("click", () => {
        const id = tick.dataset.id;
        const name = tick.dataset.name;
        console.log(name);
        markCompleted(id);
      });
    });
  }
}

// Managing add to list function

export function addToList() {
  const inputValue = document.querySelector(".add-task").value;
  const dateValue = document.querySelector(".date-input").value;

  if (!inputValue) {
    alert("Please add a task.");
  } else if (!dateValue) {
    alert("Please choose a date");
  } else {
    toDoList.push({
      id: nanoid(),
      name: inputValue,
      date: dateValue,
    });

    console.log(toDoList);
    document.querySelector(".add-task").value = "";
  }
  showToDo();

  localStorage.setItem("list", JSON.stringify(toDoList));
}

addTaskButton.addEventListener("click", () => {
  addToList();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addToList();
  }
});

// Showing trash and check box icon when each item is hovered

displayIconsToUpdate();

export function displayIconsToUpdate() {
  const taskList = document.querySelectorAll(".task-list");

  taskList.forEach((task, index) => {
    const taskId = Number(task.dataset.id);
    // console.log(taskId);

    const updateElement = task.querySelector(".updated");

    task.addEventListener("mouseover", () => {
      updateElement.style.display = "block";
    });
    task.addEventListener("mouseout", () => {
      updateElement.style.display = "none";
    });
  });
}

export function deleteTask(id) {
  console.log(`${id} deleted`);

  const newList = toDoList.filter((task) => task.id !== id);

  toDoList = newList;

  localStorage.setItem("list", JSON.stringify(toDoList));
  console.log(toDoList);

  showToDo();
}

// let matchingItem;

export function markCompleted(id) {
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
  showToDo();
  console.log(completedTasks);
}
