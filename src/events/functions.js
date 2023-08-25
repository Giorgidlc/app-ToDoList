'use strict'
import { $toDoInput, $btnAddToDo, $toDoList, $editList, $editListContent } from "../dom/app.js"

const API_SERVER = "http://localhost:3000/toDoList/";

const addToDo = async () => {
  const toDoInput =  $toDoInput.value;
  if (toDoInput === "") return alert("Introduce una tarea");
  $toDoInput.value = "";
  try {
    let listItems =  { title: toDoInput, description: "", completed: false };
    await fetch(API_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
      body: JSON.stringify(listItems)
    });
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al agregar la tarea");
  }
  $toDoInput.innerHTML = ""; 
  
};

let getTasks = async () => {
  let data = await (await fetch(API_SERVER)).json();
    return data
}

window.deleteTask = async (id) => {
  await fetch(`${API_SERVER}${id}`, {method: "DELETE"});
};

window.updateTask = async (id) => {
  let $newTitle = document.getElementById("editTitle").value;
  let $newDescription = document.getElementById("editDescription").value;
  try{
    await fetch(`${API_SERVER}${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Cache-Control": "no-cache" },
      body: JSON.stringify({title: $newTitle, description: $newDescription})
    });
  }catch (error) {
    console.error(error);
  };  
};

window.cancelChanges = async () => {
  try{
    $editList.style.display = await "none";  
  }catch (error) {
    console.error(error);
    alert("Ocurrió un error al cancelar la actualización");
  }; 
};

window.openEditForm = async (id) => {
  let task = await (await fetch(`${API_SERVER}${id}`)).json();
  $editList.innerHTML += `
    <form class="form-edit">
      <label class="editTitle" for="editTitle">Título de tarea</label>
      <input type="text" id="editTitle" placeholder="Cambia el nombre de la tarea aquí" value="${task.title}">
      <label class="editDescription" for="editDescription">Descripción de tarea</label>
      <input type="text" id="editDescription" placeholder="Coloca una descripción aquí" value="${task.description}">
      <div class="form-edit__btns">
        <button class="btnOk" onclick="updateTask(${id})">Accept</button>
        <button class="btnCancel" onclick="cancelChanges()">Cancel</button>
      </div>
    </form>`;
    $editListContent.style.display = "block";
}

window.taskCompleted = async (id, completed) => {
  try{
    await fetch(`${API_SERVER}${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Cache-Control": "no-cache"},
      body: JSON.stringify({completed})
    })
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al completar la tarea")
  };
};

window.createFilterControls = async () => {
  let tasks = await (await fetch(API_SERVER)).json();
  if (tasks.length > 1) {
    let filterControls = `
      <label for="sortBy">Ordenar por:</label>
      <select id="sortBy">
        <option value="none">Ninguno</option>
        <option value="done">Logrado</option>
        <option value="pending">Pendiente</option>
      </select>

      <button onclick="showTasksFilter()">Aplicar filtro</button>
    `;
    document.getElementById("filterContainer").innerHTML = filterControls;
  }
};

createFilterControls();

const showTasks = async () => {
  let tasks = await (await fetch(API_SERVER)).json();
  tasks.forEach(task => {
    $toDoList.innerHTML += `
    <div class="toDoList__list">
      <div class="toDoList__listContent">
        <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="taskCompleted(${task.id}, this.checked)">
        <li class="list">${task.title}</li>
      </div>
      <div class="toDoList__listBtns">
        <button class="listBtn__edit" onclick="openEditForm(${task.id})"></button>
        <button class="listBtn__delete" onclick="deleteTask(${task.id})"></button>
      </div>
    </div>
    `;
  });
 
};

window.showTasksFilter = async () => {
  let filterBy = document.getElementById("sortBy").value;
  let tasks = await (await fetch(API_SERVER)).json();
  if (filterBy == "pending") {

     if ( tasks = tasks.filter(task => !task.completed)) {
      $toDoList.innerHTML = "";
      tasks.forEach(task => {
        $toDoList.innerHTML += `
        <div class="toDoList__list">
          <div class="toDoList__listContent">
            <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="taskCompleted(${task.id}, this.checked)">
            <li>${task.title}</li>
          </div>
          <div class="toDoList__listBtns">
            <button class="listBtn__edit" onclick="openEditForm(${task.id})"></button>
            <button class="listBtn__delete" onclick="deleteTask(${task.id})"></button>
          </div>
        </div>
        `;
      });
  }
  
} else if (filterBy == "done") {
  if ( tasks = tasks.filter(task => task.completed)) {
    $toDoList.innerHTML = "";
    tasks.forEach(task => {
      $toDoList.innerHTML += `
      <div class="toDoList__list">
        <div class="toDoList__listContent">
          <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="taskCompleted(${task.id}, this.checked)">
          <li>${task.title}</li>
        </div>
        <div class="toDoList__listBtns">
          <button class="listBtn__edit" onclick="openEditForm(${task.id})"></button>
          <button class="listBtn__delete" onclick="deleteTask(${task.id})"></button>
        </div>
      </div>
      `;
    });
}   
} else {
  return $toDoList.innerHTML = "", showTasks(); 
}
};

$btnAddToDo.addEventListener("click", addToDo); 
showTasks();




