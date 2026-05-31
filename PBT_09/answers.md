## Phần A
### Câu A1: DOM Tree & Selectors
1. DOM tree:
```
div#app
├── header
│   ├── h1 (Todo App)
│   └── nav
│       ├── a.active (All)
│       ├── a (Active)
│       └── a (Completed)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button (Add)
    └── ul#todoList
        ├── li.todo-item (Learn HTML)
        └── li.todo-item.completed (Learn CSS)
```
2. Viết querySelector cho mỗi yêu cầu:
    - Chọn thẻ `<h1>`: `document.querySelector("h1")`
    - Chọn input trong form: `document.querySelector("#todoInput")`
    - Chọn tất cả `.todo-item`: `document.querySelectorAll(".todo-item")`
    - Chọn link đang active: `document.querySelector("a.active")`
    - Chọn `<li>` đầu tiên: `document.querySelector("#todoList li")`
    - Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll("nav a")`

### Câu A2: innerHTML vs textContent
- textContent: Chỉ thao tác với văn bản thuần túy. Các thẻ HTML truyền vào sẽ bị biến thành chuỗi văn bản bình thường. Thường dùng khi hiển thị dữ liệu do người dùng nhập.
- vd: 
```javascript
const userInputName = "Trần Văn A <script>alert('B')</script>";
const greetingDisplay = document.querySelector("#greeting");
greetingDisplay.textContent = `Xin chào, ${userInputName}!`;
```
- innerHTML: Phân tích cú pháp và render mã HTML. Dùng khi bạn thực sự muốn chèn các thẻ HTML mới vào DOM.
- vd: 
```javascript
const product = { name: "Giày Thể Thao", price: "500.000đ" };
const productCard = document.querySelector("#product-card");
productCard.innerHTML = 
   `<h3>${product.name}</h3>
    <p>Giá: <strong>${product.price}</strong></p>
    <button>Mua ngay</button>`;
```

- Vấn đề bảo mật (XSS): innerHTML sẽ thực thi mọi mã HTML/Script được truyền vào. Nếu hacker nhập script độc hại, nó sẽ chạy thẳng trên trình duyệt của người dùng.
- Sửa lại:
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

### Câu A3: Event Bubbling
- Khi click vào button, output theo thứ tự:
``` 
BUTTON
INNER
OUTER
```

- Nếu uncomment stopPropagation(), output :
``` 
BUTTON
```

## Phần C
### Câu C1: 7 Lỗi trong code Counter
1. Sai tên sự kiện: addEventListener("onclick", ...) 
    - Sửa thành "click".

2. Gán sai giá trị cho hằng số: Ở hàm reset, countDisplay = count; sẽ gây lỗi chương trình vì countDisplay khai báo là const. 
    - Sửa thành: countDisplay.textContent = count;.

3. Thiếu dấu ngoặc gọi hàm: Trong nút clearHistory, item.remove; không chạy hàm. 
    - Sửa thành item.remove();.

4. Lỗi kiểu dữ liệu: localStorage.getItem("count") trả về chuỗi (String). Nếu lấy ra là "1" rồi chạy count++ thì thành số, nhưng nếu gán rồi cộng kiểu khác dễ ra "11". 
    - Cần ép kiểu lúc lấy: count = parseInt(localStorage.getItem("count"));.

5. Lỗi logic null: Khởi tạo khi load, nếu chưa có data trong localStorage, getItem trả về null. parseInt(null) ra NaN. 
    - Cần fallback: count = parseInt(localStorage.getItem("count")) || 0;.

6. Gán HTML bằng null: historyList.innerHTML = null; sẽ bị JS ép kiểu thành chữ "null" và in ra màn hình. 
    - Dùng historyList.innerHTML = "";.

7. Mất Event Listener khi Load: Lưu historyList.innerHTML vào localStorage chỉ giữ lại phần text/HTML. Khi load lại, các thẻ <li> mất sạch sự kiện click để xóa. 
    - Phải dùng Event Delegation (gắn event lên #history) để khắc phục.

Câu C2: Performance
1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?
    - Bind 1000 events: Gắn event lên 1000 phần tử sẽ ngốn rất nhiều RAM của trình duyệt, làm chậm trang. 
    - Event Delegation: Chỉ gắn 1 sự kiện duy nhất lên thẻ cha bao ngoài. Khi click vào con, sự kiện "nổi bọt" lên cha, ta dùng e.target để kiểm tra xem con nào vừa bị click và xử lý.

2. Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.
    - Reflow với DocumentFragment: Mã vòng lặp hiện tại gắn thẻ vào document.body 1000 lần. Mỗi lần gắn, trình duyệt phải tính toán lại bố cục toàn trang (Reflow), cực kỳ tốn tài nguyên.
    - Nhanh hơn vì: DocumentFragment đóng vai trò là "thùng chứa ảo" trong bộ nhớ, giúp gom tất cả lại và đổ vào DOM cùng lúc, chỉ tốn 1 lần tính toán và vẽ lại.