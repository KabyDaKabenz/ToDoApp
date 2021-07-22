//constants and variables
const addToDo = document.querySelector('.add')
const noStatusContainer = document.querySelector('.no-status')
const containers = document.querySelectorAll('.status')
const toDos = document.querySelectorAll('.element')
const delete_btns = document.querySelectorAll('.delete')
const edit_btns = document.querySelectorAll('.edit_btn')
let dragging = null

// Event handlers
const createToDo = (e, content) => {
    if(content === '' || content === null) return
    const ToDoDiv = document.createElement('div')
    const ToDoText = document.createElement('div')
    const delete_btn = document.createElement('span')
    const edit_btn_div = document.createElement('span')
    const edit_btn = document.createElement('img')
   
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
    edit_btn_div.classList.add('edit_btn')
    edit_btn_div.addEventListener('click', updateToDo)
    
    edit_btn.classList.add('edit')
    edit_btn.src = "https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
    
    edit_btn_div.appendChild(edit_btn)
    ToDoDiv.appendChild(ToDoText)
    ToDoDiv.appendChild(edit_btn_div)
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
   if(e.target.classList.contains('edit')){
        e.preventDefault()
    }
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
        parent.classList.remove(parent.classList[2])
    }
}

function updateToDo(e){
    const newToDo = prompt('Edit To Do', e.target.parentElement.previousElementSibling.innerText)
    if (newToDo === '' || newToDo === null) return
    e.target.parentElement.previousElementSibling.innerText = newToDo
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
    delete_btn.addEventListener('click', e => {
        updateOnDelete(e)
        deleteToDo(e)
    })
})

edit_btns.forEach(edit_btn => {
    edit_btn.addEventListener('click', updateToDo)
})