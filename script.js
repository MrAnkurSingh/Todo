let taskData={};

const todo=document.querySelector("#todo")
const progress=document.querySelector("#progress")
const done=document.querySelector("#done")
const addtaskbtn=document.querySelector("#add-new-task")

const tasks=document.querySelectorAll('.task');
let dragElement=null;


function addTask(title,desc,column){
       const div=document.createElement("div");
   div.classList.add("task")
   div.setAttribute("draggable","true")

   div.innerHTML=`
   <h2>${title}</h2>
   <p>${desc}</p>
   <button>Delete</button>
   `
   column.appendChild(div)

   div.addEventListener('drag',(e)=>{
    dragElement=div;

   })
   const deleteBtn=div.querySelector('button');
   deleteBtn.addEventListener('click',()=>{
    div.remove();
    updateTaskCount();
   })
}

function updateTaskCount(){
    const cols=[ todo, progress, done ]
    cols.forEach(col=>{
        const tasks=Array.from(col.querySelectorAll('.task'));
        const count=col.querySelector(".right")
        taskData [ col.id ]=tasks.map(task=>{
            return {
                title: task.querySelector('h2').innerText,
                desc: task.querySelector('p').innerText
            }
        })
        localStorage.setItem("Tasks",JSON.stringify(taskData))
        count.innerText=tasks.length;

     })
}

if(localStorage.getItem("Tasks")){
    const data=JSON.parse(localStorage.getItem("Tasks"));

    for(const col in data){
        const column=document.querySelector(`#${col}`);
        data[col].forEach(task=>{
            
           addTask(task.title,task.desc,column);    
    

    })
    }
    updateTaskCount();
}


tasks.forEach(task=>{
    task.addEventListener('drag',(e)=>{
        dragElement=task;
    })
})

const cols=[ todo, progress, done ]

function addDragEventsOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add('hover-over');
    })
    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove('hover-over');
    })
    column.addEventListener('dragover',(e)=>{
        e.preventDefault();
    })
    column.addEventListener('drop',(e)=>{
        e.preventDefault();
    column.appendChild(dragElement);
    
    column.classList.remove('hover-over')

     updateTaskCount();

    })
   
}

addDragEventsOnColumn(todo)
addDragEventsOnColumn(progress)
addDragEventsOnColumn(done)


const toggleModalButton=document.querySelector('#toggle-modal');
const modal=document.querySelector('.modal')
const modalBg=document.querySelector('.bg')

toggleModalButton.addEventListener("click",()=>{
    modal.classList.toggle("active")
})
modalBg.addEventListener("click",()=>{
    modal.classList.remove("active")
})

addtaskbtn.addEventListener('click',()=>{
    const taskTitle=document.querySelector("#task-title-input").value
    const taskDesc=document.querySelector("#task-desc-input").value

    addTask(taskTitle,taskDesc,todo);

    updateTaskCount();

   modal.classList.remove('active')

   document.querySelector("#task-title-input").value="";
   document.querySelector("#task-desc-input").value="";
})