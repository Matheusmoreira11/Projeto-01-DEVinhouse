

const listContainer = get('.list-container')
const inputTextEl = get('input')
const btnAdd = get('.js-btn-add')

let todosArray = loadLocalStorage() || []

loadLocalStorage()
atualizarLista()

btnAdd.addEventListener('click', event => {
  InputArray()
  atualizarLista()
  saveLocalStorage()
})

function get (selector) {
    return document.querySelector(selector)
} 

function InputArray(){
  todosArray = [...todosArray,{text:inputTextEl.value,done:false}]
  inputTextEl.value = null
  inputTextEl.focus()
}

function saveLocalStorage() {
  localStorage.setItem('listTarefas', JSON.stringify(todosArray))
}

function loadLocalStorage() {
    return JSON.parse(localStorage.getItem('listTarefas'))
  }

function atualizarLista () {
  listContainer.innerHTML = null
  todosArray.forEach((objetoLista,index) => {
    const listItem = itemLista(objetoLista,index)
    listContainer.insertAdjacentElement('afterbegin', listItem)
  } )
}

function itemLista (objetoLista,index) {
  const newListItem = document.createElement('div')
  newListItem.classList.add('list-item')
  
  const checkBox = NewCheckbox(objetoLista)
  const textSpan = NewSpan(objetoLista)
  const deleteButton = NewDeleteButton(objetoLista,index)
  
  newListItem.insertAdjacentElement('afterbegin',checkBox)
  newListItem.insertAdjacentElement('beforeend',textSpan)
  newListItem.insertAdjacentElement('beforeend',deleteButton)
  
  newListItem.addEventListener('click', event => {
    alternarStyle(objetoLista)
    atualizarLista()
  })
  
  return newListItem
}

function deleteConfirme() {
  var del = confirm("Tem certeza que deseja exluir essa tarefa");
  if (del === true){
      alert ("Tarefa será deletada")
  } else {
      alert("Tarefa não será deletada mas ficara marcada")
      return newListItem
  }
}

function alternarStyle(objetoLista) {
  objetoLista.done = !objetoLista.done
}

function NewDeleteButton (objetoLista,index) {
  const newDeleteButton = document.createElement('button')
  newDeleteButton.classList.add('delete-button')
  newDeleteButton.innerHTML = '&times'
  
  newDeleteButton.addEventListener('click', event => {
    deleteConfirme()
    atualizarLista()
    deleteItem(index)    
    saveLocalStorage()
  })
  
  return newDeleteButton
}

function deleteItem(index) {
  const newArrayStart = todosArray.slice(0,index)
  const newArrayEnd = todosArray.slice(index+1)
  todosArray = [...newArrayStart,...newArrayEnd]
}

function NewSpan(objetoLista) {
  const newTextSpan = document.createElement('span')
  newTextSpan.innerText = objetoLista.text
  
  if (objetoLista.done) { 
    newTextSpan.classList.add('done')
  }
  return newTextSpan
}

function NewCheckbox(objetoLista) {
  const newCheckbox = document.createElement('input')
  newCheckbox.setAttribute('type','checkbox')
  
  if (objetoLista.done) { 
    newCheckbox.setAttribute('checked', true)
  }
  saveLocalStorage()
  return newCheckbox
}

