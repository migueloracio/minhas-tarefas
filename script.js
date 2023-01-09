
// Seleção de elementos

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue

// Funções
let saveTodo = (text) => { //variavel da tarefa nova

    //recriando a div do texto
    let todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h5');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    //recriando o botao check
    let doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
    //recriando o botao editar
    let editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    //recriando o botao deletar   
    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value = "" //Limpar o campo de texto

    todoInput.focus() //Voltar a caixa de texto

}

//Etapa para esconder um formulário e mostrar outro

let toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

//Funcao no botao editar

const updateTodo = (text) => {
    let todos = document.querySelectorAll('.todo')
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h5')

        if(todoTitle.innerText == oldInputValue) {
            todoTitle.innerText = text
        }
    })
}

// Eventos

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputValue = todoInput.value; //variavel do valor

    // condicao
    if (inputValue) {
        //console.log(inputValue)
        saveTodo(inputValue)
    }

}
);

document.addEventListener('click', (e) => {
    let targetEl = e.target
    let parentEl = targetEl.closest('div')
    
    //Função para chamar o nome da tarefa no edit
    if(parentEl && parentEl.querySelector('h5')) {
        todoTitle = parentEl.querySelector('h5').innerText
    }

    //função Check
    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done')
    }

    //Função Remover
    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove()
    }

    //Função Edição
    if (targetEl.classList.contains('edit-todo')) {
        toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }


})

//Função no botao cancelar
cancelEditBtn.addEventListener('click' , (e) => {
    e.preventDefault()
    toggleForms()
} )

editForm.addEventListener('submit' , (e) => {
    e.preventDefault()
        const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
        }
    toggleForms()
})