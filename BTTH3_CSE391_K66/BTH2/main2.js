const taskModal = document.getElementById('taskModal');
const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const notification = document.getElementById('notification');

// Thống kê
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render danh sách công việc
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align:center; color: #666;">Chưa có công việc nào. Hãy thêm công việc mới!</p>';
    } else {
        tasks.forEach(task => {
            const card = document.createElement('div');
            // Thêm class 'completed' nếu trạng thái là hoàn thành
            card.className = `task-card ${task.completed ? 'completed' : ''}`;
            
            card.innerHTML = `
                <div class="task-header">
                    <h3>${task.title}</h3>
                    <span class="badge" style="background-color: ${getPriorityColor(task.priority)}">${task.priority}</span>
                </div>
                <p><strong>Mô tả:</strong> ${task.desc || 'Không có mô tả'}</p>
                <p><strong>Hạn chót:</strong> ${task.dueDate}</p>
                <div class="task-actions">
                    <button class="btn btn-toggle" data-id="${task.id}">
                        ${task.completed ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                    </button>
                    <button class="btn btn-warning btn-edit" data-id="${task.id}">Sửa</button>
                    <button class="btn btn-danger btn-delete" data-id="${task.id}">Xóa</button>
                </div>
            `;
            taskList.appendChild(card);
        });
    }
    updateTaskSummary();
}

// Cập nhật thống kê
function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

// Màu cho mức độ ưu tiên
function getPriorityColor(priority) {
    if (priority === 'Cao') return '#dc3545';
    if (priority === 'Trung bình') return '#ffc107';
    return '#198754';
}

function showMessage(msg) {
    notification.textContent = msg;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function openForm(editId = '') {
    taskModal.classList.remove('hidden');
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    if (!editId) {
        taskForm.reset();
        document.getElementById('editTaskId').value = '';
        document.getElementById('modalTitle').textContent = 'Thêm Công Việc Mới';
    } else {
        document.getElementById('modalTitle').textContent = 'Cập Nhật Công Việc';
    }
}

function closeForm() {
    taskModal.classList.add('hidden');
}

btnOpenAddForm.addEventListener('click', () => openForm());
btnCloseForm.addEventListener('click', closeForm);

function validateForm() {
    let isValid = true;
    const title = document.getElementById('taskTitle').value.trim();
    const date = document.getElementById('taskDate').value;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (!title) {
        document.getElementById('errorTitle').textContent = 'Tiêu đề không được để trống.';
        isValid = false;
    }
    
    if (!date) {
        document.getElementById('errorDate').textContent = 'Vui lòng chọn hạn hoàn thành.';
        isValid = false;
    }
    return isValid;
}

//Thêm hoặc Sửa
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const idInput = document.getElementById('editTaskId').value;
    
    const taskData = {
        title: document.getElementById('taskTitle').value.trim(),
        desc: document.getElementById('taskDesc').value.trim(),
        dueDate: document.getElementById('taskDate').value,
        priority: document.getElementById('taskPriority').value
    };

    if (idInput === '') {
        taskData.id = Date.now().toString();
        taskData.completed = false;
        tasks.push(taskData);
        showMessage('Đã thêm công việc mới!');
    } else {
        const index = tasks.findIndex(t => t.id === idInput);
        taskData.id = idInput;
        taskData.completed = tasks[index].completed;
        tasks[index] = taskData;
        showMessage('Cập nhật thành công!');
    }

    saveTasks();
    renderTasks();
    closeForm();
});
//các nút
taskList.addEventListener('click', function(e) {
    const target = e.target;
    if (!target.classList.contains('btn')) return;

    const taskId = target.getAttribute('data-id');
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    // Xử lý Xóa
    if (target.classList.contains('btn-delete')) {
        if (confirm('Bạn có chắc muốn xóa công việc này?')) {
            tasks.splice(taskIndex, 1);
            saveTasks();
            renderTasks();
            showMessage('Đã xóa công việc!');
        }
    } 
    // Xử lý Sửa
    else if (target.classList.contains('btn-edit')) {
        const task = tasks[taskIndex];
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDesc').value = task.desc;
        document.getElementById('taskDate').value = task.dueDate;
        document.getElementById('taskPriority').value = task.priority;
        openForm(task.id);
    } 
    else if (target.classList.contains('btn-toggle')) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }
});
renderTasks();