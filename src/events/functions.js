'use strict'
import {$toDoInput, $btnAddToDo, $toDoList} from "../dom/app.js"

let API_SERVER = "http://localhost:3000/toDoList/";

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
  await fetch(`http://localhost:3000/toDoList/${id}`, {method: "DELETE"});
};

const updateTask = async (id, task) => {
  try{
    await fetch(`http://localhost:3000/toDoList/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Cache-Control": "no-cache" },
      body: JSON.stringify(task)
    });
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al editar la tarea");
  };  
};

window.taskCompleted = async (id, completed) => {
  try{
    await fetch(`http://localhost:3000/toDoList/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Cache-Control": "no-cache"},
      body: JSON.stringify({completed})
    })
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al completar la tarea")
  };
  
};


const showTasks = async () => {
  let tasks = await (await fetch(API_SERVER)).json();
  tasks.forEach(task => {
    $toDoList.innerHTML += `
    <div style="display:flex;">
      <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="taskCompleted(${task.id}, this.checked)">
      <li>${task.title}</li>
      <button onclick="deleteTask(${task.id})">Eliminar</button>
      <button onclick="updateTask(${task.title})">Editar</button>
    </div>
    `;
  });

};


$btnAddToDo.addEventListener("click", addToDo);
showTasks();
