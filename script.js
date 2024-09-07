document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
        taskInput.value = '';
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    function createTaskElement(text) {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        listItem.innerHTML = `
            <span>${text}</span>
            <div class="buttons">
                <button class="editButton">Edit</button>
                <button class="deleteButton">Delete</button>
            </div>
        `;

        const editButton = listItem.querySelector('.editButton');
        const deleteButton = listItem.querySelector('.deleteButton');

        // Toggle expand/collapse on list item click
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('expanded');
        });

        // Edit button functionality
        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click event from triggering expand
            const newTaskText = prompt('Edit your task:', listItem.querySelector('span').textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                listItem.querySelector('span').textContent = newTaskText.trim();
            }
        });

        // Delete button functionality
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click event from triggering expand
            listItem.classList.add('deleting');
            setTimeout(() => {
                taskList.removeChild(listItem);
            }, 300);
        });

        return listItem;
    }
});
