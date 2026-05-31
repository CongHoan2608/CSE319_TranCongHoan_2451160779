const products = [
    { id: 1, name: "iPhone 16", price: 25990, category: "phone", rating: 4.8 },
    { id: 2, name: "Samsung S24", price: 22000, category: "phone", rating: 4.5 },
    { id: 3, name: "Xiaomi 14", price: 18000, category: "phone", rating: 4.2 },
    { id: 4, name: "MacBook Air M3", price: 28000, category: "laptop", rating: 4.9 },
    { id: 5, name: "Dell XPS 15", price: 35000, category: "laptop", rating: 4.7 },
    { id: 6, name: "Asus ROG", price: 30000, category: "laptop", rating: 4.6 },
    { id: 7, name: "Apple Watch 9", price: 10000, category: "watch", rating: 4.8 },
    { id: 8, name: "Galaxy Watch 6", price: 7000, category: "watch", rating: 4.3 },
    { id: 9, name: "Garmin Fenix", price: 15000, category: "watch", rating: 4.9 },
    { id: 10, name: "AirPods Pro", price: 6000, category: "accessory", rating: 4.8 },
    { id: 11, name: "Chuột Logitech", price: 1500, category: "accessory", rating: 4.5 },
    { id: 12, name: "Cáp sạc Anker", price: 500, category: "accessory", rating: 4.1 }
];

let currentData = [...products];
let cartCount = 0;

const app = document.getElementById("app");
app.innerHTML = `
    <div class="toolbar">
        <input type="text" id="searchInput" placeholder="Tìm kiếm...">
        <button onclick="filterByCategory('all')">Tất cả</button>
        <button onclick="filterByCategory('phone')">Điện thoại</button>
        <button onclick="filterByCategory('laptop')">Laptop</button>
        <button onclick="filterByCategory('watch')">Đồng hồ</button>
        <button onclick="filterByCategory('accessory')">Phụ kiện</button>
        <select id="sortSelect">
            <option value="default">Sắp xếp</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
            <option value="nameAz">Tên A-Z</option>
            <option value="ratingDesc">Đánh giá cao nhất</option>
        </select>
        <button id="darkModeToggle">🌙 Dark Mode</button>
        <span>Giỏ hàng: <span id="cartBadge">0</span></span>
    </div>
    <div id="productContainer"></div>
`;

const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const darkModeToggle = document.getElementById("darkModeToggle");
const cartBadge = document.getElementById("cartBadge");

function renderProducts(list) {
    container.innerHTML = ""; 
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${p.name}</h3>
            <p style="color: red; font-weight: bold;">${p.price.toLocaleString()}đ</p>
            <p>⭐ ${p.rating}</p>
        `;
        card.addEventListener("click", () => showModal(p));
        container.appendChild(card);
    });
}

function searchProducts(keyword) {
    currentData = products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    renderProducts(currentData);
}

window.filterByCategory = function(category) { 
    currentData = category === 'all' ? [...products] : products.filter(p => p.category === category);
    renderProducts(currentData);
};

function sortProducts(type) {
    let sorted = [...currentData];
    if (type === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (type === "priceDesc") sorted.sort((a, b) => b.price - a.price);
    if (type === "nameAz") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (type === "ratingDesc") sorted.sort((a, b) => b.rating - a.rating);
    renderProducts(sorted);
}

function showModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    
    const content = document.createElement("div");
    content.className = "modal-content";
    content.innerHTML = `
        <h2>${product.name}</h2>
        <p>Phân loại: ${product.category}</p>
        <p>Giá: ${product.price.toLocaleString()}đ</p>
        <p>Đánh giá: ${product.rating} ⭐</p>
        <button id="addCartBtn" style="background: #28a745; color: white; border: none;">Thêm vào giỏ</button>
        <button id="closeModalBtn">Đóng</button>
    `;

    overlay.appendChild(content);
    document.body.appendChild(overlay);

    document.getElementById("closeModalBtn").addEventListener("click", () => overlay.remove());
    document.getElementById("addCartBtn").addEventListener("click", () => {
        cartCount++;
        cartBadge.textContent = cartCount;
        overlay.remove();
    });
}

searchInput.addEventListener("input", (e) => searchProducts(e.target.value));
sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));
darkModeToggle.addEventListener("click", () => document.body.classList.toggle("dark-mode"));

renderProducts(currentData);