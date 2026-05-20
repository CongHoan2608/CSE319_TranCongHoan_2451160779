# Track A: BOOTSTRAP5
## Phần A:
### Câu A1: Grid System
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 | 2 | 3 |
| Box layout | 100% | 50% | 25% |

- `col-md-6` nghĩa là gì? Tại sao không cần viết `col-sm-12`?
    - `col-md-6` nghĩa là phần tử sẽ chiếm 6/12 cột (tức 50% chiều rộng) trên các màn hình có kích thước từ Medium (≥ 768px) trở lên.
    - Không cần viết `col-sm-12` vì Bootstrap sử dụng nguyên tắc "Mobile-First". Nên nếu bạn khai báo col-12, nó sẽ áp dụng cho màn hình nhỏ nhất và tự động giữ nguyên 100% chiều rộng cho đến khi gặp breakpoint lớn hơn tiếp theo .

### Câu A2: Utilities & Components
1. Giải thích class `d-none d-md-block`. Element này hiển thị khi nào, ẩn khi nào?
- Element này mặc định bị ẩn đi (không chiếm không gian) trên màn hình nhỏ (mobile), nhưng sẽ được hiển thị dưới dạng block khi màn hình đạt kích thước từ tablet trở lên (≥ 768px).

2. 5 Spacing Utilities:
- mt-3: Tạo khoảng cách bên trên (margin-top) là 1rem (16px).
- px-4: Tạo khoảng cách đệm bên trong ở cả hai cạnh trái và phải là 1.5rem (24px).
- mx-auto: Căn giữa phần tử theo chiều ngang bằng cách thiết lập margin trái và phải là auto.
- p-3: Thêm padding đều ở cả 4 cạnh là 1rem.
- mb-4: Tạo khoảng cách bên dưới (margin-bottom) là 1.5rem.

3. Sự khác nhau giữa .container, .container-fluid, .container-md?
- `.container`: Có chiều rộng tối đa (max-width) cố định, thay đổi nhảy bậc theo từng kích thước màn hình và tự động căn giữa.
- `.container-fluid`: Luôn luôn chiếm 100% chiều rộng màn hình, không bị giới hạn max-width.
- `.container-md`: Tràn viền (100% width) trên màn hình nhỏ, và bắt đầu có max-width cố định khi màn hình đạt mức md (≥ 768px) trở lên.

## Phần C;
### Câu C1: Tùy biến Bootstrap
1. Muốn đổi màu `$primary` từ xanh mặc định sang `#E63946`:
- Công cụ: Cần sử dụng trình biên dịch SASS.
- Thực hiện: Tạo một file custom.scss riêng. Bạn phải khai báo biến màu mới `$primary: #E63946;` ngay ở đầu file, trước dòng lệnh `@import "..."`; để Bootstrap ghi đè giá trị mặc định.

2. Không nên override bằng `.btn-primary { background: red; }` mà nên dùng SASS variables vì:
- Nếu ghi đè trực tiếp bằng CSS, bạn sẽ thường phải dùng từ khóa !important, gây khó khăn cho việc bảo trì code sau này.
- Thay vào đó, dùng SASS variables sẽ giúp Bootstrap tự động nội suy ra các màu tương đồng cho hover, focus, và viền một cách đồng bộ.

### Câu C2: So sánh
- Viết CSS thuần (từ PBT trước) để tạo 1 navbar responsive + 1 product card. So sánh với Bootstrap version:
    - Số dòng CSS cần viết: 
        - CSS thuần có thể tiêu tốn hàng trăm dòng code để xử lý responsive và layout. 
        - Còn Bootstrap yêu cầu 0 dòng CSS custom vì mọi thứ đã được dựng sẵn bằng class HTML.
    - Thời gian phát triển: 
        - Bootstrap nhanh hơn vượt trội nhờ việc chỉ cần lắp ghép các components có sẵn.
    - Khả năng tùy biến: 
        - CSS thuần tùy biến linh hoạt tuyệt đối. 
        - Bootstrap có thiết kế mặc định khá rập khuôn, muốn đổi mới sâu cần phải can thiệp bằng SASS.
    - Nên dùng Bootstrap khi: 
        - Các dự án cần dựng prototype nhanh, dashboard admin, nhóm không có designer, hoặc cần các component phức tạp hoạt động ngay.
    - Không nên dùng Bootstrap khi: 
        - Khi website yêu cầu thiết kế cực kỳ độc đáo khác biệt, hoặc các dự án ưu tiên tối giản kích thước file tối đa.