let currentImg = 1;
let isPlaying = false;
let slideInterval;

const commands = ["Chế độ tối (Dark Mode)", "Lưu tập tin (Save)", "Mở Cài đặt (Settings)", "Đăng xuất (Logout)"];

const imgEl = document.getElementById('galleryImg');
const statusText = document.getElementById('statusText');
const cmdPalette = document.getElementById('cmdPalette');
const cmdInput = document.getElementById('cmdInput');
const cmdList = document.getElementById('cmdList');

function updateGallery() {
    imgEl.src = `https://placehold.co/400x300?text=Image+${currentImg}`;
}

function togglePlay() {
    isPlaying = !isPlaying;
    statusText.textContent = `Trạng thái: ${isPlaying ? 'Đang chạy tự động ⏳' : 'Tạm dừng ⏸️'}`;
    if (isPlaying) {
        slideInterval = setInterval(() => { currentImg = currentImg < 9 ? currentImg + 1 : 1; updateGallery(); }, 1500);
    } else {
        clearInterval(slideInterval);
    }
}

function renderCommands(query = "") {
    const filtered = commands.filter(c => c.toLowerCase().includes(query.toLowerCase()));
    cmdList.innerHTML = filtered.map(c => `<li>${c}</li>`).join('');
}

document.getElementById('prevBtn').addEventListener('click', () => { currentImg = currentImg > 1 ? currentImg - 1 : 9; updateGallery(); });
document.getElementById('nextBtn').addEventListener('click', () => { currentImg = currentImg < 9 ? currentImg + 1 : 1; updateGallery(); });
cmdInput.addEventListener('input', (e) => renderCommands(e.target.value));

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        cmdPalette.classList.remove('hidden');
        cmdInput.value = '';
        renderCommands();
        cmdInput.focus();
        return;
    }

    const isModalOpen = !cmdPalette.classList.contains('hidden');

    if (isModalOpen) {
        if (e.key === 'Escape') {
            cmdPalette.classList.add('hidden');
            imgEl.focus();
        }
        if (e.key === 'Enter') {
            const firstItem = cmdList.querySelector('li');
            if (firstItem) {
                alert(`Đã chọn lệnh: ${firstItem.textContent}`);
                cmdPalette.classList.add('hidden');
            }
        }
        return;
    }

    if (document.activeElement.tagName !== 'INPUT') {
        if (e.key === 'ArrowRight') {
            currentImg = currentImg < 9 ? currentImg + 1 : 1;
            updateGallery();
        }
        if (e.key === 'ArrowLeft') {
            currentImg = currentImg > 1 ? currentImg - 1 : 9;
            updateGallery();
        }
        if (e.key >= '1' && e.key <= '9') {
            currentImg = parseInt(e.key);
            updateGallery();
        }
        if (e.key === ' ') {
            e.preventDefault();
            togglePlay();
        }
    }
});