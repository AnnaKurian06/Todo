let tasks = {
  Today: [],
  Work: [],
  Personal: []
};

let currentCategory = "";

function showTasks(category) {
  currentCategory = category;
  document.getElementById("taskBox").style.display = "block";
  document.getElementById("categoryTitle").innerText = category;

  updateTaskList();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText !== "") {
    tasks[currentCategory].push({ text: taskText, completed: false });
    input.value = "";
    updateTaskList();
  }
}

function updateTaskList() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks[currentCategory].forEach((task, index) => {
    const li = document.createElement("li");

    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">🗑</button>
    `;

    list.appendChild(li);
  });

  updateCounts();
}

function toggleComplete(index) {
  tasks[currentCategory][index].completed = !tasks[currentCategory][index].completed;
  updateTaskList();
}

function deleteTask(index) {
  tasks[currentCategory].splice(index, 1);
  updateTaskList();
}

function updateCounts() {
  document.getElementById("taskCount").innerText =
    tasks.Today.length + tasks.Work.length + tasks.Personal.length;

  document.getElementById("todayCount").innerText = `${tasks.Today.length} Tasks`;
  document.getElementById("workCount").innerText = `${tasks.Work.length} Tasks`;
  document.getElementById("personalCount").innerText = `${tasks.Personal.length} Tasks`;
}
