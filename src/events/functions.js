import {$toDoInput, $btnAddToDo, $toDoList} from "../dom/app.js"

const API_SERVER = "http://localhost:3000/toDoList/";

const addToDo = async (task) => {
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
  showTasks();
}

/* const deleteTask =  async (id) => {
  console.log("esto borra")

}; */

function deleteTask(id) {
  console.log("hola")
};


 

let getTasks = async () => {
  let data = await (await fetch(API_SERVER)).json();
    return data
}



let showTasks = async () => {
  let tasks = await getTasks();
  tasks.forEach(task => {
    return  $toDoList.innerHTML += `
      <li>${task.title}</li>
      <button onclick="deleteTask()">Eliminar</button>`
  })
 
};

const updateTask = async (id, task) => {

};   


$btnAddToDo.addEventListener("click", addToDo);
showTasks();
