const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'play with kids',
  dueDate: '2022-12-25'
}]

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    const  { name, dueDate } = todoObject
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onClick="
        todoList.splice(${i}, 1);
        renderTodoList();"
        class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html
  }

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML
}

function addToDo() {
  const inputElement = document.querySelector(".js-name-input")
  const dateElement = document.querySelector(".js-due-date-input")

  const name = inputElement.value
  const dueDate = dateElement.value

  todoList.push({
    name, dueDate
  })

  inputElement.value = '';
  dateElement.value = '';

  renderTodoList();
}