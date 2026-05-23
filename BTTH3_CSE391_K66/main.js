const studentModal = document.getElementById('studentModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const studentList = document.getElementById('studentList');
const notification = document.getElementById('notification');

// Các ô input
const inputId = document.getElementById('studentId');
const inputName = document.getElementById('fullName');
const inputDob = document.getElementById('dob');
const inputClass = document.getElementById('className');
const inputGpa = document.getElementById('gpa');
const inputEmail = document.getElementById('email');
const editIndex = document.getElementById('editIndex');

// Các phần tử thống kê
const elTotalStudents = document.getElementById('totalStudents');
const elAvgGpa = document.getElementById('avgGpa');

let students = JSON.parse(localStorage.getItem('students')) || [];

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function showNotification(msg) {
    notification.innerText = msg;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
}

// Hàm danh sách ra bảng HTML
function renderStudents() {
    studentList.innerHTML = '';
    
    if (students.length === 0) {
        studentList.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu sinh viên.</td></tr>';
    } else {
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.className}</td>
                <td>${student.gpa}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn btn-warning" onclick="editStudent(${index})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${index})">Xóa</button>
                </td>
            `;
            studentList.appendChild(tr);
        });
    }
    updateStatistics();
}

// Cập nhật thống kê tổng số và điểm TB
function updateStatistics() {
    elTotalStudents.innerText = students.length;
    if (students.length === 0) {
        elAvgGpa.innerText = '0.0';
    } else {
        const totalGpa = students.reduce((sum, st) => sum + parseFloat(st.gpa), 0);
        elAvgGpa.innerText = (totalGpa / students.length).toFixed(2);
    }
}

// Hàm chuẩn bị form để Sửa dữ liệu
window.editStudent = function(index) {
    const student = students[index];
    
    // Đưa dữ liệu lên form
    inputId.value = student.id;
    inputName.value = student.name;
    inputDob.value = student.dob;
    inputClass.value = student.className;
    inputGpa.value = student.gpa;
    inputEmail.value = student.email;
    
    editIndex.value = index; // Gắn cờ đang sửa ở vị trí nào
    modalTitle.innerText = "Cập nhật sinh viên";
    studentModal.classList.remove('hidden');
    clearErrors();
};

// Hàm Xóa dữ liệu có xác nhận
window.deleteStudent = function(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
        students.splice(index, 1);
        saveStudents();
        renderStudents();
        showNotification("Xóa sinh viên thành công!");
    }
};

function resetForm() {
    studentForm.reset();
    editIndex.value = "-1";
    clearErrors();
}

// form validation
function showError(inputId, message) {
    document.getElementById(`err-${inputId}`).innerText = message;
}

function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
}

function validateForm() {
    clearErrors();
    let isValid = true;

    // Validate Mã SV (Không rỗng)
    if (inputId.value.trim() === "") {
        showError('studentId', 'Vui lòng nhập mã sinh viên');
        isValid = false;
    }

    // Validate Họ Tên (Không rỗng)
    if (inputName.value.trim() === "") {
        showError('fullName', 'Vui lòng nhập họ tên');
        isValid = false;
    }

    // Validate Ngày Sinh (Hợp lệ)
    if (inputDob.value === "") {
        showError('dob', 'Vui lòng chọn ngày sinh');
        isValid = false;
    }

    // Validate Điểm (Từ 0 đến 10)
    const gpaVal = parseFloat(inputGpa.value);
    if (inputGpa.value === "" || isNaN(gpaVal) || gpaVal < 0 || gpaVal > 10) {
        showError('gpa', 'Điểm phải là số từ 0 đến 10');
        isValid = false;
    }

    // Validate Email (Định dạng cơ bản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value.trim())) {
        showError('email', 'Email không đúng định dạng');
        isValid = false;
    }

    return isValid;
}

// Sự kiện mở form Thêm mới
btnOpenModal.addEventListener('click', () => {
    resetForm();
    modalTitle.innerText = "Thêm sinh viên mới";
    studentModal.classList.remove('hidden');
});

// Sự kiện đóng form
btnCloseModal.addEventListener('click', () => {
    studentModal.classList.add('hidden');
});

// Sự kiện Submit Form (Xử lý cả Thêm và Cập nhật)
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const newStudent = {
        id: inputId.value.trim(),
        name: inputName.value.trim(),
        dob: inputDob.value,
        className: inputClass.value.trim(),
        gpa: inputGpa.value,
        email: inputEmail.value.trim()
    };

    const currentIndex = parseInt(editIndex.value);

    if (currentIndex === -1) {
        students.push(newStudent);
        showNotification("Thêm sinh viên thành công!");
    } else {
        students[currentIndex] = newStudent;
        showNotification("Cập nhật sinh viên thành công!");
    }

    saveStudents();
    renderStudents();
    studentModal.classList.add('hidden');
});

renderStudents();