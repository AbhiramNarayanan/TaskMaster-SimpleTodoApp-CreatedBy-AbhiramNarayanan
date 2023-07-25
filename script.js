const tasks = [];
const root = document.getElementById("root");
const inProgressTasksDiv = document.createElement("div");
const completedTasksDiv = document.createElement("div");

function updateDocumentTitle() {
  document.title = `You have ${tasks.length} pending task(s)`;
}

function addTask(title) {
  const newTask = { title, completed: false }; // Set the completed property for the new task
  tasks.push(newTask);
  renderTasks();
  const message = `Task "${title}" added.`;
  saveTasksToLocalStorage();
  speakMessageContent(message); // Speak the message after the tasks are rendered

  // Check if it's the first task being added, and if yes, speak the task title
  if (tasks.length === 1) {
    speakTaskTitle(`Task ${title} added`);
  }
}

function removeTask(index) {
  const removedTask = tasks[index].title;
  tasks.splice(index, 1);
  renderTasks();
  const message = `Task "${removedTask}" deleted.`;
  saveTasksToLocalStorage();
  speakMessageContent(message); // Speak the message after the tasks are rendered
}

function renderTasks() {
    root.innerHTML = "";
  
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
  
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerText = "TODO APP";
  
    const addTaskDiv = document.createElement("div");
    addTaskDiv.classList.add("add-task");
    addTaskDiv.appendChild(createAddTaskInput());
  
    inProgressTasksDiv.innerHTML = "";
    completedTasksDiv.innerHTML = "";
    tasks.forEach((task, index) => {
      if (task.completed) {
        completedTasksDiv.appendChild(createListTasksDiv(task, index));
      } else {
        inProgressTasksDiv.appendChild(createListTasksDiv(task, index));
      }
    });
  
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    const inProgressContainer = document.createElement("div");
    inProgressContainer.classList.add("in-progress-tasks");
    const completedContainer = document.createElement("div");
    completedContainer.classList.add("completed-tasks");
  
    inProgressContainer.appendChild(createInProgressHeader());
    inProgressContainer.appendChild(inProgressTasksDiv);
  
    completedContainer.appendChild(createCompletedHeader());
    completedContainer.appendChild(completedTasksDiv);
  
    tasksContainer.appendChild(inProgressContainer);
    tasksContainer.appendChild(completedContainer);
  
    todoContainer.appendChild(header);
    todoContainer.appendChild(addTaskDiv);
    todoContainer.appendChild(tasksContainer);
  
    root.appendChild(todoContainer);
  
    updateDocumentTitle();
  }
  
  function createInProgressHeader() {
    const inProgressHeader = document.createElement("div");
    inProgressHeader.classList.add("header");
    inProgressHeader.innerText = "Tasks in Progress";
    return inProgressHeader;
  }
  
  function createCompletedHeader() {
    const completedHeader = document.createElement("div");
    completedHeader.classList.add("header");
    completedHeader.innerText = "Completed Tasks";
    return completedHeader;
  }

  



function createAddTaskInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");



  const input = document.createElement("input");
  input.classList.add("input");
  input.type = "text";
  input.placeholder = "Add a new Task";

  const addBtn = document.createElement("button");
  addBtn.classList.add("add-btn");
  addBtn.innerText = "Add";
  addBtn.addEventListener("click", () => {
    const title = input.value.trim();
    if (title !== "") {
      addTask(title);
      input.value = "";
    }
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(addBtn);

  return inputContainer;
}

function createListTasksDiv(task, index) {
  const listTasksDiv = document.createElement("div");
  listTasksDiv.classList.add("list-tasks");
  listTasksDiv.innerText = task.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => removeTask(index));

  listTasksDiv.appendChild(deleteBtn);

  return listTasksDiv;
}

renderTasks();


function createListTasksDiv(task, index) {
    const listTasksDiv = document.createElement("div");
    listTasksDiv.classList.add("list-tasks");
  
    // Create a checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed; // Set checkbox state based on 'completed' property
    checkbox.addEventListener("change", () => toggleCompleted(index, checkbox)); // Add event listener to the checkbox
    listTasksDiv.appendChild(checkbox);
  
    // Create a span for the task title
    const taskTitle = document.createElement("span");
    taskTitle.innerText = task.title;
    listTasksDiv.appendChild(taskTitle);
  
    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => removeTask(index));
    listTasksDiv.appendChild(deleteBtn);
  
    // Apply line-through style if task is completed
    if (task.completed) {
      taskTitle.classList.add("completed");
    }
  
    return listTasksDiv;
  }
  
  function toggleCompleted(index, checkbox) {
    tasks[index].completed = checkbox.checked; // Update the 'completed' property based on checkbox state
    renderTasks();
  }
  
  function updateDocumentTitle() {
    document.title = `You have ${tasks.length} pending task(s)`;
  }
  
  // Function to speak the task title
  function speakTaskTitle(title) {
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.lang = "en-US"; // Set the language for speech synthesis
  
    // Get the selected voice from localStorage
    const selectedVoice = localStorage.getItem("selectedVoice");
  
    if (selectedVoice !== "default") {
      utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
    }
  
    // Speak the task title
    window.speechSynthesis.speak(utterance);
  }
  
  // Function to add a new task
  function addTask(title) {
    const newTask = { title, completed: false }; // Set the completed property for the new task
    tasks.push(newTask);
    renderTasks();
    const message = `Task "${title}" added.`;
    saveTasksToLocalStorage();
    speakMessageContent(message); // Speak the message after the tasks are rendered
  }
  
  // Function to remove a task
  function removeTask(index) {
    const removedTask = tasks[index].title;
    tasks.splice(index, 1);
    renderTasks();
    const message = `Task "${removedTask}" deleted.`;
    saveTasksToLocalStorage();
    speakMessageContent(message); // Speak the message after the tasks are rendered
  }
  






  
// Function to add a new task
function addTask(title) {
    const newTask = { title, completed: false }; // Set the completed property for the new task
    tasks.push(newTask);
    renderTasks();
    const message = `Task "${title}" added.`;
    saveTasksToLocalStorage();
    speakMessageContent(message); // Speak the message after the tasks are rendered
  
    // Check if it's the first task being added, and if yes, speak the task title
    if (tasks.length === 1) {
      speakTaskTitle(`Task ${title} added`);
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    } else {
      tasks = [];
    }
  }
  
  loadTasksFromLocalStorage();
    
