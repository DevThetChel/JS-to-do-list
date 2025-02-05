import { completedTasks } from "./complete.js";

const addTaskButton = document.querySelector(".js-add-task");

const formElement = document.querySelector(".form");

// getting toDoList

const toDoList = JSON.parse(localStorage.getItem("list")) || [];

// Preventing Default for the form.

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

showToDo();

function showToDo() {
  let listHTML = "";
  if (toDoList.length < 1) {
    document.querySelector(".tasks-list").innerHTML =
      "No task for now. Gonna take a rest today?";
  } else {
    toDoList.forEach((task, index) => {
      listHTML += ` 

        <li data-id="${index}" class="task-list">
          <div class="task-detail">
          <p>${task.name} (${task.date}) 
          </p>
          <div class="updated">
          <button class="completed">
          <i class="fa-solid fa-square-check"></i>
         </button>
          <button class="trash-button">
          <i id="trash" class="fa-sharp fa-solid fa-trash"></i>
          </button></div>
          </div>
        </li>`;
    });

    document.querySelector(".tasks-list").innerHTML = listHTML;
    displayIconsToUpdate();

    document.querySelectorAll("#trash").forEach((trash, index) => {
      trash.addEventListener("click", () => {
        deleteTask(index);
      });
    });

    document.querySelectorAll(".completed").forEach((tick, index) => {
      tick.addEventListener("click", () => {
        markCompleted(index);
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

function displayIconsToUpdate() {
  const taskList = document.querySelectorAll(".task-list");

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
}

function deleteTask(id) {
  toDoList.splice(id, 1);
  localStorage.setItem("list", JSON.stringify(toDoList));
  showToDo();
}

// let matchingItem;

function markCompleted(id) {
  const task = toDoList[id].name;
  console.log(`${id} completed, ${task}`);
  console.log(toDoList[id]);

  // completedTasks.forEach((task) => {
  //   if (task.id === id) {
  //     matchingItem = task;
  //   }
  // });

  completedTasks.push({
    id: id,
    name: toDoList[id].name,
    date: toDoList[id].date,
  });
  toDoList.splice(id, 1);

  localStorage.setItem("list", JSON.stringify(toDoList));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  showToDo();
  console.log(completedTasks);
}
