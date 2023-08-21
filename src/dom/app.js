export let $toDoInput = document.getElementById("toDoInput");
export let $btnAddToDo = document.querySelector(".addToDo");
export let $toDoList = document.querySelector(".toDoList__list");





















































/* async function getTasks() {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const tasks = await response.json();
      console.log(tasks);
    } catch (error) {
      console.error(error);
    }
  }
  

  const addTask = async (title) => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
      });
      const task = await response.json();
      console.log(task);
    } catch (error) {
      console.error(error);
    }
  }
   */