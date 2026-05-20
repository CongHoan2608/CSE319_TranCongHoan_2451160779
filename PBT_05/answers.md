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