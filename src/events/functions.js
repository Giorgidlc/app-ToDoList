import {$toDoInput, $btnAddToDo, $toDoList} from "../dom/app.js"

let contadora = 0

const addToDo = () => {
  
  const toDoInput = $toDoInput.value;
  if (toDoInput === "") {
    return alert("Introduce una tarea");
  } else {
    $toDoInput.value = "";
    const task = {
      method:"POST",
      headers: { 
            "Content-Type": "application/json"
            },
      body: JSON.stringify({
        id:contadora,
        text: toDoInput
      })
    }

    fetch("http://localhost:3000/toDoList",task)
    .then( (result) => result.json())
    .then((data) => console.log(data))

   contadora++
  }
  
}

const showTask = ()=>{
    fetch("http://localhost:3000/toDoList")
    .then( (result) => result.json())
    .then((data) => {
      data.forEach(element => {
        $toDoList.innerHTML += `<li>${element.text}<button class="btnDelete">Eliminar</button></li>`
      });
      
    })
  
}



$btnAddToDo.addEventListener("click", addToDo )

document.addEventListener("DOMContentLoaded",showTask)