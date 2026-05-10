## Phần A
### Câu A1: 3 Cách nhúng CSS
1. Inline:
- Ví dụ code:
```html
<h1 style="color: blue; font-size: 24px;">Title</h1>
```
- Ưu điểm: Nhanh chóng, áp dụng ngay lập tức cho một phần tử cụ thể mà không cần tạo file hay viết thêm thẻ style
- Nhược điểm: Khó bảo trì, làm code HTML bị rối và không thể tái sử dụng định dạng cho các phần tử khác.
- Nên dùng khi: Cần sửa nhanh một thuộc tính nhỏ duy nhất hoặc khi test nhanh.

2. Internal:
- Ví dụ code:
```html
<head>
    <style>
        h1 { color: red; font-size: 24px; }
    </style>
</head>
```
- Ưu điểm: Giúp quản lý toàn bộ định dạng của một trang web tại một vị trí duy nhất trong file đó, không cần file bên ngoài.
- Nhược điểm: Chỉ có tác dụng trong phạm vi một trang duy nhất; nếu website có nhiều trang, bạn sẽ phải lặp lại mã CSS cho từng trang.
- Nên dùng khi: Chấp nhận được khi làm các bản mẫu hoặc các trang web đơn giản chỉ có một trang duy nhất.

3. External:
- Ví dụ code:
```html
<!-- html -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
```css
<!-- styles.css -->
h1 {
    color: red;
    font-size: 24px;
}
```

- Ưu điểm: Tách bạch hoàn toàn giữa nội dung (HTML) và giao diện (CSS); một file CSS có thể dùng chung cho hàng trăm trang web khác nhau.
- Nhược điểm: Trình duyệt mất thêm một chút thời gian để gửi yêu cầu tải file CSS từ server về.
- Nên dùng khi: Đây là chuẩn production, luôn được khuyến khích sử dụng cho mọi dự án web thực tế.

### Câu A2: CSS Selectors-Dự đoán kết quả
1. h1                           → Chọn: `ShopTLU`
2. .price                       → Chọn: `25.990.000đ` và `45.990.000đ`
3. #app header                  → Chọn: Toàn bộ văn bản bên trong thẻ header, bao gồm: `ShopTLU`, `Home`, `Products`, `Anout`
4. nav a:first-child             → Chọn: `Home` (thẻ liên kết đầu tiên trong thẻ nav)
5. .product.featured h2         → Chọn: `MacBook Pro` (thẻ h2 trong main có class="product featured")
6. article > p                  → Chọn: `25.990.000đ`, `Mô tả sản phẩm ...`, `45.990.000đ`, `Mô tả sản phẩm...`
7. a[href="/"]                  → Chọn: `Home` (thẻ liên kết có giá trị thuộc tính href chính xác là "/")
8. .top-bar.dark h1              → Chọn: `ShopTLU` (Thẻ h1 nằm bên trong class="top-bar dark")

### Câu A3: Box Model-Tính toán kích thước
```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400 + 20 x 2 + 5 x 2 = 450px
→ Không gian chiếm trên trang = 450 + 10 x 2 = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 400 - 20 x 2 - 5 x 2 = 350px 
→ Không gian chiếm trên trang = 400 + 10 x 2 = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ KHÔNG PHẢI 65px vì theo quy tắc CSS lấy giá trị lớn hơn giữa hai lề tiếp xúc.
```
Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px
- khoảng cách = 40 + (-10) = 30px

### Câu A4: Specificity (Độ ưu tiên)
1. Tính specificity score (a, b, c) cho mỗi rule:
- Rule A(`p`): Score = (0, 0, 1) (vì chỉ có 1 thẻ element).
- Rule B(`.price`): Score = (0, 1, 0) (vì chỉ có 1 class).
- Rule C(`#main-price`): Score = (1, 0, 0) (vì chỉ có 1 ID).
- Rule D(`p.price`): Score = (0,1,1) (vì có 1 thẻ element và 1 class).

2. Element sẽ có màu gì? Giải thích:
- Element sẽ có màu `red (đỏ)`.
- Vì theo bảng tính specificity, các selector của A, B, C, D có specificity lần lượt là 1 , 10, 100, 11. Do selector C(`#main-price`) có specificity cao nhất nên style của nó được áp dụng lên phần tử.

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`:
- element sẽ có màu `orange (cam)`.
- Vì Inline style (specificity=1000) luôn có độ ưu tiên cao hơn tất cả các bộ chọn trong file CSS bên ngoài.

4. Nếu Rule A thêm `!important`:
- element sẽ có màu 'black(đen)'.
- Vì selector `!important` có độ ưu tiên cao nhất(specificity=vô cực), trong CSS nó ghi đè lên tất cả các quy tắc về độ ưu tiên thông thường nên khi thêm nó vào Rule A thì style của nó được áp dụng lên phần tử.

## Phần C
### Câu C1: Debug CSS Layout
1. Tính chiều rộng thực tế của sidebar và content (content-box!):
- Sidebar = 300 + 20 x 2 + 1 x 2 = 342px
- Content = 660 + 30 x 2 + 1 x 2 = 722px

2. Layout bị vỡ vì:
- Tổng chiều rộng thức tế của hai khối lớn hơn chiều rộng container.
- Tổng chiều rộng Sidebar + Content = 342 + 722 = 1064px
- Chiều rộng của .container = 960px
- Do 1064px > 960px, không gian trong container không đủ nên layout bị vỡ.

3. Đưa ra 2 cách sửa khác nhau (1 cách dùng border-box, 1 cách không dùng):
- Cách 1 dùng border-box:
    - Dùng `box-sizing: border-box;` để trình duyệt tự tính toán lại kịch thước lõi nhưng giữ nguyên width tổng thể.
    - Thêm `box-sizing: border-box;` cho cả sidebar và content. Lúc này tổng chiều rộng sẽ là `300px + 660px = 960px` vừa với container.

- Cách 2 không dùng border-box (Tính toán thủ công):
    - Ta trừ bớt width đi đúng bằng khoảng padding và border để tổng chiều rộng thực tế bằng width tổng thể.
    - Sidebar mới: width = 300 - 20x2 - 1x2 = 258px
    - Content mới: width = 660 - 20x2 - 1x2 = 598px