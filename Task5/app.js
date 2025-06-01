const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');

function formatDate(date) {
  return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
}

function createTaskElement(taskText, addedAt, completedAt = null) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const textSpan = document.createElement('span');
  textSpan.className = 'task-text';
  textSpan.textContent = taskText;

  const timestampSpan = document.createElement('span');
  timestampSpan.className = 'timestamp';
  timestampSpan.textContent = `Added: ${addedAt}`;

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  editBtn.title = 'Edit Task';

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.title = 'Delete Task';
  deleteBtn.classList.add('delete');

  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = completedAt ? '↩️' : '✔️';
  completeBtn.title = completedAt ? 'Mark as Pending' : 'Mark as Complete';

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);
  actionsDiv.appendChild(completeBtn);

  li.appendChild(textSpan);
  li.appendChild(timestampSpan);
  li.appendChild(actionsDiv);

  // Handle Edit
  editBtn.addEventListener('click', () => {
    if (editBtn.textContent === '✏️') {
      // Change to save mode
      const input = document.createElement('input');
      input.type = 'text';
      input.value = textSpan.textContent;
      input.className = 'edit-input';
      li.replaceChild(input, textSpan);
      editBtn.textContent = '💾';
      input.focus();
    } else {
      // Save edited task
      const input = li.querySelector('.edit-input');
      if (input.value.trim() === '') {
        alert('Task cannot be empty.');
        input.focus();
        return;
      }
      textSpan.textContent = input.value.trim();
      li.replaceChild(textSpan, input);
      editBtn.textContent = '✏️';
    }
  });

  // Handle Delete
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  // Handle Complete / Pending Toggle
  completeBtn.addEventListener('click', () => {
    if (!completedAt) {
      // Mark complete
      textSpan.classList.add('completed');
      timestampSpan.textContent = `Completed: ${formatDate(new Date())}`;
      completedList.appendChild(li);
      completeBtn.innerHTML = '↩️';
      completeBtn.title = 'Mark as Pending';
      li.dataset.completedAt = new Date();
    } else {
      // Mark pending
      textSpan.classList.remove('completed');
      timestampSpan.textContent = `Added: ${addedAt}`;
      pendingList.appendChild(li);
      completeBtn.innerHTML = '✔️';
      completeBtn.title = 'Mark as Complete';
      li.dataset.completedAt = '';
    }
  });

  // Store added date in dataset for toggling
  li.dataset.addedAt = addedAt;
  li.dataset.completedAt = completedAt || '';

  return li;
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const addedAt = formatDate(new Date());
  const taskElement = createTaskElement(taskText, addedAt);

  pendingList.appendChild(taskElement);
  taskInput.value = '';
  taskInput.focus();
});
