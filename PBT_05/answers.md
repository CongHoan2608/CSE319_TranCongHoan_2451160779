## Phần A
### Câu A1: Viewport & Mobile-First
1. Thẻ `<meta viewport>` chuẩn:
    - <meta name="viewport" content="width=device-width, initial-scale=1.0">
        - `width=device-width`: Đặt chiều rộng của trang web bằng với chiều rộng màn hình của thiết bị.
        - `initial-scale=1.0`: Đặt mức độ thu phóng ban đầu là 1 .

2. Nếu thiếu thẻ này thì:
    - iPhone sẽ coi trang web là desktop và thu nhỏ xíu lại. Luôn đặt trong <head>.

3. Mobile-First và Desktop-First khác nhau :
    - Mobile-First:
        - Viết code CSS cho giao diện điện thoại (màn hình nhỏ) trước làm mặc định, sau đó dùng `min-width` để điều chỉnh cho các màn hình lớn hơn.
        - Khuyên dùng vì: Điện thoại sẽ tải ít CSS hơn, giúp trang web chạy nhanh hơn.
        - Ví dụ: 
        ```
        css
        .col { width: 100%; } 
        @media (min-width: 768px) { .col { width: 50%; } }
        ```
    
    - Desktop-First:
        - Viết CSS cho màn hình to trước, dùng max-width để bóp nhỏ dần cho điện thoại.
        - Ví dụ:
        ```
        css
        .col { width: 50%; }
        @media (max-width: 768px) { .col { width: 100%; } }
        ```

### Câu A2: Breakpoints
- Các breakpoint chuẩn thường dùng:
    - xs (< 576px): Điện thoại dọc (Ví dụ: lưới sản phẩm hiển thị 1 cột).
    - sm (≥ 576px): Điện thoại ngang (Ví dụ: lưới sản phẩm hiển thị 1 hoặc 2 cột).
    - md (≥ 768px): Tablet (Ví dụ: lưới sản phẩm hiển thị 2 cột).
    - lg (≥ 992px): Desktop nhỏ (Ví dụ: lưới sản phẩm hiển thị 3 hoặc 4 cột).
    - xl (≥ 1200px): Desktop lớn (Ví dụ: lưới sản phẩm hiển thị 4 cột).

### Câu A3: Media Queries

| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

### Câu A4: SCSS Basics
- 4 tính năng chính của SCSS:
    - Variables (Biến): Giúp lưu trữ giá trị (màu sắc, font) để dùng lại nhiều lần. Đổi 1 chỗ là toàn bộ cập nhật.
        - Ví dụ:
        ```
        css
        $primary-color: #805ad5; .btn { color: $primary-color; }
        ```
    - Nesting (Lồng nhau): Cho phép viết CSS theo cấu trúc phân cấp của HTML, giúp code gọn gàng dễ đọc.
        - Ví dụ: 
        ```
        css
        .navbar { ul { list-style: none; } }
        ```
    - Mixins: Tạo các đoạn code CSS (như các hàm) để dùng chung cho nhiều element khác nhau.
        - Ví dụ: 
        ```
        css
        @mixin flex-center { display: flex; justify-content: center; } 
        .box { @include flex-center; }
        ```
    - Partials & Import: Chia nhỏ CSS thành nhiều file nhỏ gọn (bắt đầu bằng dấu _) và gom lại bằng @import.

- Trình duyệt không đọc được file .scss vì trình duyệt chỉ hiểu ngôn ngữ CSS thuần. Để trang web chạy được, cần có bước compile (biên dịch) từ SCSS sang CSS thông qua các trình biên dịch (như extension Live Sass Compiler trên VS Code).

## Phần C
### Câu C1: Phân tích trang web thực
- Navigation thay đổi thế nào: Trên Mobile (375px), menu trái rút gọn thành dạng mini (chỉ có icon). Thanh tìm kiếm dài bị thu thành một icon kính lúp. Trên Desktop (1440px), menu trái hiển thị đầy đủ chữ và có thanh tìm kiếm to nằm giữa màn hình.
- Lưới content thay đổi mấy cột: Mobile hiển thị 1 cột. Tablet (768px) hiển thị 2 đến 3 cột. Desktop (1440px) hiển thị 4 đến 5 cột.
- Elements nào bị ẩn trên mobile: Thanh nhập text tìm kiếm (chỉ còn icon), các text chi tiết của danh mục menu bên trái.
- Font size có thay đổi. Kích thước chữ của tiêu đề video trên mobile được thu nhỏ hơn so với desktop để tránh bị rớt dòng quá nhiều.

### Câu C2: Thiết kế Responsive Strategy
- Sơ đồ bố cục (Wireframe):
    - Mobile (< 768px):
    - Những gì bị ẩn? Menu chữ bị ẩn đi (thay bằng icon Hamburger ☰).
    - Form nằm đâu? Tất cả xếp 1 cột dọc. Form nằm ngay dưới Hero Image (trên grid ảnh và map).

    - Tablet (≥ 768px):
        - Grid ảnh mấy cột? Chia thành 2 cột (hoặc 3 cột).
        - Bản đồ nằm đâu? Nằm ngay dưới Form đặt bàn, kéo dài full chiều ngang màn hình.

    - Desktop (≥ 1024px):
        - Layout bao nhiêu cột? Layout phần đặt bàn chia 2 cột (bên trái 50%,bên phải 50%). Grid ảnh chia 3 cột.
        - Sidebar có không? Không cần Sidebar để không gian tập trung cho Form và Grid ảnh.

- CSS :
```
css
/*Mobile-First*/
.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.booking-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/*Tablet (≥ 768px)*/
@media (min-width: 768px) {
    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/*Destop (≥ 1024px)*/
@media (min-width: 1024px) {
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .booking-section {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

## Phần B
### Câu B3:
- Dùng Live Sass Compiler trên VS Code. Chỉ cần click nút Watch Sass ở thanh trạng thái dưới cùng, file `style.scss` sẽ tự động biên dịch ra `style.css`.