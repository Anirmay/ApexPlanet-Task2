// Contact form validation and submission logic
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

function clearFieldError(fieldId) {
  const errorElement = document.getElementById(fieldId + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + 'Error');
  const input = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (input) {
    input.setAttribute('aria-invalid', 'true');
  }
}

function resetFieldState(fieldId) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.setAttribute('aria-invalid', 'false');
  }
  clearFieldError(fieldId);
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    contactSuccess.textContent = '';

    const fields = [
      { id: 'fullName', label: 'Full Name' },
      { id: 'email', label: 'Email' },
      { id: 'subject', label: 'Subject' },
      { id: 'message', label: 'Message' }
    ];

    let isValid = true;

    fields.forEach(({ id, label }) => {
      const input = document.getElementById(id);
      const value = input ? input.value.trim() : '';

      resetFieldState(id);

      if (value === '') {
        showFieldError(id, `${label} is required.`);
        isValid = false;
      }
    });

    const emailInput = document.getElementById('email');
    const emailValue = emailInput ? emailInput.value.trim() : '';

    if (emailValue && !validateEmail(emailValue)) {
      showFieldError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (isValid) {
      contactSuccess.textContent = 'Your message has been submitted successfully!';
      contactForm.reset();
      fields.forEach(({ id }) => resetFieldState(id));
    }
  });
}

// To-do list DOM manipulation logic
const todoInput = document.getElementById('todoInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');
const todoError = document.getElementById('todoError');

function addTask() {
  const taskText = todoInput.value.trim();

  if (!taskText) {
    todoError.textContent = 'Please enter a task.';
    return;
  }

  todoError.textContent = '';

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const todoMeta = document.createElement('div');
  todoMeta.className = 'todo-meta';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const taskTextNode = document.createElement('span');
  taskTextNode.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }
  });

  deleteButton.addEventListener('click', function () {
    listItem.remove();
  });

  todoMeta.appendChild(checkbox);
  todoMeta.appendChild(taskTextNode);
  listItem.appendChild(todoMeta);
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);
  todoInput.value = '';
  todoInput.focus();
}

if (addTaskBtn) {
  addTaskBtn.addEventListener('click', addTask);
}

if (todoInput) {
  todoInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
}

