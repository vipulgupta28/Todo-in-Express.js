const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fetch todos from the server
async function fetchTodos() {
  const response = await fetch('/todos');
  const todos = await response.json();

  // Clear the list and render todos
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${todo.task} 
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(listItem);
  });
}

// Add a new todo
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = todoInput.value;

  await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });

  todoInput.value = '';
  fetchTodos();
});

// Delete a todo
async function deleteTodo(id) {
  await fetch(`/todos/${id}`, {
    method: 'DELETE',
  });
  fetchTodos();
}

// Load todos on page load
fetchTodos();
