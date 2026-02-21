function toggleCard(){
    const allElem = document.querySelectorAll('.elem');
    const close = document.querySelectorAll('.back')
    const fullElem = document.querySelectorAll('.fullElem')

    allElem.forEach((elem , idx)=>{
        elem.addEventListener('click' , ()=>{
            fullElem[idx].style.display = 'block'    
        });
    })

    close.forEach((closeElem , idx)=>{
        closeElem.addEventListener('click' , ()=>{
            fullElem[idx].style.display = 'none'    
        })
    })
}

toggleCard();

const form = document.querySelector('form');
const ip = document.querySelectorAll('.ip');

let tasksData = [];

//localstorage logic

function localStorageLogic(){
    if(localStorage.getItem('tasksData')){
        renderTaskLocalStorage()
        
    }else{
        console.log("Tasks List is empty");
    }
    form.addEventListener('submit' , (e)=>{
        e.preventDefault();
        if(ip[0].value.trim('') === '' || ip[1].value.trim('') === '') {
            alert('Task is empty')
            return;
        };
        if(ip[0].value.length > 40) {
            alert("Word limit exceeded")
            return;
        }
        
        newTask();
    })
}
localStorageLogic();

function newTask(){
    const id = Date.now();
    tasksData.push({
        id : id,
        title : ip[0].value,
        details : ip[1].value,
        important : ip[2].checked,
        completed : false, 
        
    })
    
    localStorage.setItem('tasksData' , JSON.stringify(tasksData))
    renderTask(id)
    
    
    
}

function renderTask(id){
    // Create main task div
    const task = document.createElement("div");
    task.classList.add("task");

    task.dataset.id = id;

    // Create heading
    const heading = document.createElement("h5");
    heading.classList.add('task-title')
    

    if(ip[2].checked === true) {
        task.classList.add("imp-task")
        const resHeadingWrapper = document.createElement("div");
        resHeadingWrapper.classList.add('res-heading-wrapper');

        const superTag = document.createElement("sup");
        superTag.classList.add('h5-sup')
        superTag.textContent = 'Imp'
        heading.textContent = ip[0].value;

        resHeadingWrapper.append(heading)
        resHeadingWrapper.append(superTag)
        task.appendChild(resHeadingWrapper);
    }
    else{
        task.appendChild(heading);
        heading.textContent = ip[0].value;
    }

    // Create button wrapper
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-wrapper");

    // Create Complete button
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("completed-task-btn");
    completeBtn.textContent = "Complete";

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-task-btn");
    deleteBtn.textContent = "Delete";

    // Append buttons inside wrapper
    btnWrapper.appendChild(completeBtn);
    btnWrapper.appendChild(deleteBtn);

    // Append heading + wrapper inside task
    
    task.appendChild(btnWrapper);

    // Finally append task somewhere (example)
    document.querySelector(".all-task").appendChild(task);

    ip[0].value = '';
    ip[1].value = '';
}

function removeTask(){
    const allTask = document.querySelector('.all-task');

    allTask.addEventListener('click' , (e)=>{
        if(e.target.classList.contains('delete-task-btn')) {
            const task = e.target.closest('.task');
            const id = Number(task.dataset.id);
            tasksData = tasksData.filter(data => data.id !== id);
            localStorage.setItem('tasksData' , JSON.stringify(tasksData))
            task.remove();
            
        }

        
        if(e.target.classList.contains('completed-task-btn')) {
        
            const task = e.target.closest('.task');
            const taskTitle = task.querySelector('.task-title')
            
            if(e.target.classList.contains('task-completed')) {
                e.target.classList.remove('task-completed');
        
                tasksData.forEach(taskData => {
                    if(taskData.id === Number(task.dataset.id)){
                        taskData.completed = false;
                    }
                })
                taskTitle.classList.remove('task-strikethrough');
                e.target.textContent = 'Complete'
            }
            else {
                tasksData.forEach(taskData => {
                    if(taskData.id === Number(task.dataset.id)){
                        taskData.completed = true;

                    }
                })
                taskTitle.classList.add('task-strikethrough');
                e.target.classList.add('task-completed');
                e.target.textContent = 'Completed';

            }
            localStorage.setItem('tasksData', JSON.stringify(tasksData))
        }
    })
}

function renderTaskLocalStorage(){
    tasksData = JSON.parse(localStorage.getItem('tasksData'));
    
    tasksData.forEach(tasksData => {
        // Create main task div
    const task = document.createElement("div");
    task.classList.add("task");

    task.dataset.id = tasksData.id;

    // Create heading
    const heading = document.createElement("h5");
    heading.classList.add('task-title')
    

    if(tasksData.important === true) {
            task.classList.add("imp-task")
            const resHeadingWrapper = document.createElement("div");
            resHeadingWrapper.classList.add('res-heading-wrapper');

            const superTag = document.createElement("sup");
            superTag.classList.add('h5-sup')
            superTag.textContent = 'Imp'
            heading.textContent = tasksData.title;

            resHeadingWrapper.append(heading)
            resHeadingWrapper.append(superTag)
            task.appendChild(resHeadingWrapper);
        }
        else{
            task.appendChild(heading);
            heading.textContent = tasksData.title;
        }

        // Create button wrapper
        const btnWrapper = document.createElement("div");
        btnWrapper.classList.add("btn-wrapper");

        // Create Complete button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("completed-task-btn");
        completeBtn.textContent = "Complete";

        // complete btn localstorage logic
        if(tasksData.completed) {
            heading.classList.add("task-strikethrough");
            completeBtn.classList.add("task-completed");
            completeBtn.textContent = "Completed";
        } else {
            completeBtn.textContent = "Complete";
        }

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-task-btn");
        deleteBtn.textContent = "Delete";

        // Append buttons inside wrapper
        btnWrapper.appendChild(completeBtn);
        btnWrapper.appendChild(deleteBtn);

        // Append heading + wrapper inside task
        
        task.appendChild(btnWrapper);

        // Finally append task somewhere (example)
        document.querySelector(".all-task").appendChild(task);
    });
}
removeTask()    



function redirectToNewPage(){
    const allTask = document.querySelector('.all-task');

    allTask.addEventListener('click' , (e)=>{
    const title = e.target.closest('.task-title')

    if(title) {
        const task = title.closest('.task');
        const {id} = task.dataset;

        localStorage.setItem('selectedTaskId', JSON.stringify(id));
        window.location.href = "../more-info.html";
    }
})
}

redirectToNewPage();