import {$toDoInput, $btnAddToDo, $toDoList} from "../dom/app.js"

const addToDo = async () => {
  const toDoInput = $toDoInput.value;
  if (toDoInput === "") return alert("Introduce una tarea");
  $toDoInput.value = "";
  try {
    await fetch("http://localhost:3000/toDoList", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
      body: JSON.stringify({ title: toDoInput, description: "", completed: false })
    });
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al agregar la tarea");
  }
}

const showTask = async () => {
  const data = await (await fetch("http://localhost:3000/toDoList")).json();
  $toDoList.innerHTML = "";
  data.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/toDoList/${task.id}`, { method: "DELETE" });
    });
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/toDoList/${task.title}`, { method: "PUT" });
    });
    li.appendChild(deleteBtn);
    li.appendChild(btnEdit); 
    $toDoList.appendChild(li);
  });
}

$btnAddToDo.addEventListener("click", addToDo);
showTask();
