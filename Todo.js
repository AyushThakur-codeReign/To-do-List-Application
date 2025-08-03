
const btn = document.getElementById("btn");
const body = document.body;
const form = document.getElementById("myform");
const input = document.getElementById("input");
const list = document.getElementById("list");

const STORAGE_KEY = "todo";


btn.addEventListener("click", () => {
  body.classList.toggle("dark");
  btn.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}


function createTodoElement(task, index) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.index = index;

  const span = document.createElement("span");
  span.textContent = task;


  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "small edit";
  editBtn.setAttribute("aria-label", `Edit task: ${task}`);

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
    
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = span.textContent;
      inputEdit.className = "edit-input";
      li.replaceChild(inputEdit, span);
      editBtn.textContent = "Save";
      inputEdit.focus();
    } else {
     
      const inputEdit = li.querySelector("input");
      const newTask = inputEdit.value.trim();
      if (newTask === "") {
        alert("Task cannot be empty");
        inputEdit.focus();
        return;
      }
      todos[index] = newTask;
      saveTodos();
      span.textContent = newTask;
      li.replaceChild(span, inputEdit);
      editBtn.textContent = "Edit";
    }
  });


  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "small delete";
  delBtn.setAttribute("aria-label", `Delete task: ${task}`);
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  return li;
}


function renderTodos() {
  list.innerHTML = "";
  todos.forEach((task, idx) => {
    const li = createTodoElement(task, idx);
    list.appendChild(li);
  });
}


renderTodos();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (task === "") {
    alert("Task cannot be empty");
    return;
  }
  todos.push(task);
  saveTodos();
  renderTodos();
  input.value = "";
  input.focus();
});
