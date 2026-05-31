const state = { name: false, email: false, password: false, confirm: false, phone: false };

const form = document.getElementById('registerForm');
const btn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');

const checkForm = () => {
    btn.disabled = !Object.values(state).every(v => v === true);
};

nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    state.name = val.length >= 2 && val.length <= 50;
    document.getElementById('nameIcon').textContent = state.name ? '✅' : (val.length > 0 ? '❌' : '');
    checkForm();
});

emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    state.email = regex.test(val);
    
    const err = document.getElementById('emailError');
    if (val === '') err.textContent = '';
    else if (!state.email) err.textContent = 'Email không đúng định dạng!';
    else err.textContent = '';
    checkForm();
});

pwdInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const bar = document.getElementById('strengthBar');
    
    let strength = 0;
    if (val.length >= 8) {
        const hasTextAndNum = /[a-zA-Z]/.test(val) && /[0-9]/.test(val);
        const hasAll = /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val);
        
        if (hasAll) strength = 3;   
        else if (hasTextAndNum) strength = 2; 
        else strength = 1;            
    }

    if (val.length === 0) {
        bar.style.width = '0%';
        state.password = false;
    } else if (val.length < 8) {
        bar.style.width = '33%';
        bar.style.background = 'red';
        state.password = false;
    } else if (strength === 2) {
        bar.style.width = '66%';
        bar.style.background = 'orange';
        state.password = true; 
    } else if (strength === 3) {
        bar.style.width = '100%';
        bar.style.background = 'green';
        state.password = true;
    }
    confirmInput.dispatchEvent(new Event('input')); 
    checkForm();
});

confirmInput.addEventListener('input', (e) => {
    const val = e.target.value;
    state.confirm = (val === pwdInput.value && val !== '');
    
    const err = document.getElementById('confirmError');
    err.textContent = state.confirm || val === '' ? '' : 'Mật khẩu không khớp!';
    checkForm();
});

phoneInput.addEventListener('input', (e) => {

    let rawStr = e.target.value.replace(/\D/g, '').substring(0, 10);

    let formatted = rawStr;
    if (rawStr.length > 7) {
        formatted = `${rawStr.substring(0,4)}-${rawStr.substring(4,7)}-${rawStr.substring(7,10)}`;
    } else if (rawStr.length > 4) {
        formatted = `${rawStr.substring(0,4)}-${rawStr.substring(4,7)}`;
    }
    
    e.target.value = formatted;
    state.phone = (rawStr.length === 10);
    checkForm();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!btn.disabled) {
        document.getElementById('successModal').classList.remove('hidden');
        document.getElementById('modalData').textContent = `
Họ Tên: ${nameInput.value}
Email: ${emailInput.value}
SĐT: ${phoneInput.value}
        `.trim();
    }
});