function newData(){
    const id = JSON.parse(localStorage.getItem("selectedTaskId"));
    const tasksData = JSON.parse(localStorage.getItem("tasksData"));
    const task = tasksData.find(t => t.id == id);

   

    const title = document.querySelector('.title > h2')
    const details = document.querySelector('.desc > p')
    title.textContent = task.title
    details.textContent = task.details
}

newData()