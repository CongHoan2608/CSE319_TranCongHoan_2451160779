const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const countSpan = document.getElementById('todoCount');
const filtersContainer = document.querySelector('.filters');
const clearBtn = document.getElementById('clearCompleted');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    list.innerHTML = '';
    let activeCount = 0;

    todos.forEach((todo, index) => {
        if (!todo.completed) activeCount++;

        if (currentFilter === 'active' && todo.completed) return;
        if (currentFilter === 'completed' && !todo.completed) return;

        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.index = index;

        const textSpan = document.createElement('span');
        textSpan.className = 'text-content';
        textSpan.textContent = todo.text;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(textSpan);
        li.appendChild(editInput);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    countSpan.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    saveTodos();
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        input.value = '';
        render();
    }
});

list.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const index = li.dataset.index;

    if (e.target.classList.contains('delete-btn')) {
        todos.splice(index, 1); 
        render();
    } else if (e.target.classList.contains('text-content')) {
        todos[index].completed = !todos[index].completed; 
        render();
    }
});

list.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('text-content')) {
        const li = e.target.closest('.todo-item');
        const index = li.dataset.index;
        const editInput = li.querySelector('.edit-input');
        
        li.classList.add('editing');
        editInput.focus();
        editInput.addEventListener('keydown', function onEnter(event) {
            if (event.key === 'Enter') {
                const newText = editInput.value.trim();
                if (newText) {
                    todos[index].text = newText;
                } else {
                    todos.splice(index, 1); 
                }
                render();
            }
        });

        editInput.addEventListener('blur', () => {
            render(); 
        });
    }
});

filtersContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    }
});

clearBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    render();
});

render();