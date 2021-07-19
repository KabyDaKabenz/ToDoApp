//constants and variables
const addToDo = document.querySelector('.add')
const noStatusContainer = document.querySelector('.no-status')
const containers = document.querySelectorAll('.status')
const toDos = document.querySelectorAll('.element')
const delete_btns = document.querySelectorAll('.delete')
let dragging = null

// Event handlers
const createToDo = (e, content) => {
    if(content === '' || content === null) return
    const ToDoDiv = document.createElement('div')
    const ToDoText = document.createElement('div')
    const delete_btn = document.createElement('span')
   
    ToDoDiv.classList.add('element')
    ToDoDiv.draggable = true
    
    ToDoText.innerText = content
    ToDoText.classList.add('ToDo')
    
    delete_btn.innerText = '\u00D7'
    delete_btn.classList.add('delete')
    delete_btn.addEventListener('click', (e) => {
        updateOnDelete(e)
        deleteToDo(e)
    })
    
    ToDoDiv.appendChild(ToDoText)
    ToDoDiv.appendChild(delete_btn)
    ToDoDiv.addEventListener('dragstart', dragStart)
    ToDoDiv.addEventListener('dragend', dragEnd)
    noStatusContainer.appendChild(ToDoDiv)
    e.target.parentElement.classList.add('red')
}

const deleteToDo = (e) => {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement)
}

function dragStart(e){
    dragging = e.target
}


function dragEnd(e){
    lightUpContainer(e)
    dragging = null
    
}

function dragOver(e){
    e.preventDefault()
}

function dragLeave(e){
    const parent = dragging.parentElement
    const prev_sibling = dragging.previousElementSibling
    const next_sibling = dragging.nextElementSibling
    if((prev_sibling === null || prev_sibling.classList.contains('add') 
       || prev_sibling.classList.contains('header')) && next_sibling === null){
        e.target.classList.remove(parent.classList[2])
    }
}

function dragDrop(e){
    if(e.target.classList.contains('add')) {
        document.querySelector('.no-status').appendChild(dragging)
        e.target.parentElement.classList.add('red')
        return
    }
    e.target.appendChild(dragging)
}

function lightUpContainer(e){
    if(e.target.parentElement.classList.contains('no-status')){
        e.target.parentElement.classList.add('red')
     } else if (e.target.parentElement.classList.contains('in-progress')){
        e.target.parentElement.classList.add('green')
    } else if(e.target.parentElement.classList.contains('will-do')) {
        e.target.parentElement.classList.add('blue')
    }
}

function updateOnDelete(e) {
    const parent = e.target.parentElement.parentElement
    const prev_sibling = e.target.parentElement.previousElementSibling
    const next_sibling = e.target.parentElement.nextElementSibling
    if((prev_sibling === null || prev_sibling.classList.contains('add') 
       || prev_sibling.classList.contains('header')) && next_sibling === null){
        console.log('gebna')
        parent.classList.remove(parent.classList[2])
    }
}

//Event Listeners
addToDo.addEventListener('click', (e) => {
    createToDo(e, prompt('Add new To Do'))
})

containers.forEach(container => {
    container.addEventListener('dragover', dragOver)
    container.addEventListener('dragleave', dragLeave)
    container.addEventListener('drop', dragDrop)
})

toDos.forEach(toDo => {
    toDo.addEventListener('dragstart', dragStart)
    toDo.addEventListener('dragend', dragEnd)
})

delete_btns.forEach(delete_btn => {
    delete_btn.addEventListener('click', (e) => {
        updateOnDelete(e)
        deleteToDo(e)
    })
})