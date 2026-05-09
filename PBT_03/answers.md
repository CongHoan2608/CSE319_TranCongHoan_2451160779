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
