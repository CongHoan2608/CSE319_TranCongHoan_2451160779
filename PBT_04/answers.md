## Phần A
### Câu A1: 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Không dùng top/left  | Có | Mặc định |
| `relative` | Có | Chính nó | Có | Dịch nhẹ, làm mốc cho absolute |
| `absolute` | Không | Cha relative gần nhất | Có | Badge, dropdown, tooltip |
| `fixed` | Không | Viewport | Không | 	Chat button, modal overlay |
| `sticky` | Có(Không khi dính) | 	Viewport (khi dính) | Không khi đã dính | Sticky header, sidebar |

- Khi nào absolute tham chiếu body?
    - Khi không có `ancestor` nào có `position` khác `static`.
    - Nếu tất cả thẻ cha đều là `static` mặc định thì `.child` sẽ lấy mốc theo `body`.

- Khi nào absolute tham chiếu parent?
    - Khi phần tử cha gần nhất có `position: relative;` hoặc `absolute`, `fixed`, `sticky`.

- Giải thích khái niệm "nearest positioned ancestor".
    - Là thẻ cha gần nhất có `position` khác `static`.
    - `absolute` sẽ lấy thẻ đó làm mốc để tính `top`, `left`, `right`, `bottom`.

### Câu A2: Flexbox vs Grid

- Trường hợp 1: 1 hàng ngang duy nhất. 4 items tự động co giãn bằng nhau và chia đều 100% độ rộng (mỗi item 25%).
    - Sơ đồ bố cục:
    ```
    | 1 | 2 | 3 | 4 |
    ```
- Trường hợp 2: 3 hàng, mỗi hàng 2 cột. Do `flex-wrap: wrap` kết hợp tổng độ rộng mỗi item là 50% (45% width + 5% margin).
    - Sơ đồ bố cục:
    ```
    | 1 | 2 |
    | 3 | 4 |
    | 5 | 6 |
    ```
- Trường hợp 3: 1 hàng ngang, 3 items cách xa nhau. Item 1 dính sát lề trái, item 3 dính sát lề phải, item 2 ở chính giữa. Căn giữa theo chiều dọc.
    - Sơ đồ bố cục:
    ```
    |1          2          3|
    ```
- Trường hợp 4: 1 hàng ngang, 3 cột. Cột trái và cột phải cố định 200px. Cột giữa chiếm phần không gian còn lại (1fr).
    - Sơ đồ bố cục:
    ```
    | 1 |    2    | 3 |
    ```
- Trường hợp 5: 3 hàng. Lưới chia 3 cột bằng nhau. Hàng 1, 2 có 3 items, hàng 3 chỉ có duy nhất item cuối cùng nằm ở góc bên trái.
    - Sơ đồ bố cục:
    ```
    | 1 | 2 | 3 |
    | 4 | 5 | 6 |
    | 7 |
    ```

## Phần C
### Câu C1: Flexbox vs Grid: Khi nào dùng gì?
- Cho 5 tình huống layout thực tế. Với mỗi tình huống:
    1. Navigation bar ngang (logo + menu + buttons)
        - Dùng `Flexbox`
        - Vì: 
            - Bố cục thanh điều hướng mang tính chất căn chỉnh một chiều.
            - Nên cần được co giãn linh hoạt bằng `justify-content: space-between hoặc gap`,
    2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
        - Dùng `Grid`
        - Vì :
            - Đây là bố cục hai chiều
            - Gird sẽ giúp tạo các cột đều nhau và tự xuống hàng đẹp
    3. Layout blog: main content + sidebar
        - Dùng `Grid`
        - Vì :
            - Đây là bố cục tổng thể có tỷ lệ cột cố định.
            - Nên nó thích hợp quản lí khung bố cục tổng thể. 
    4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
        - Dùng `Grid`
        - Vì :
            - Đây là bố cục rõ ràng và cần chia đều cột.
            - Nên dùng grid để nó tự rớt dòng với auto-fit.
    5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
        - Dùng `Flexbox`
        - Vì :
            - Cần định hướng dòng cho phần tử theo trục dọc.
            - Nên dùng nó để đẩy nút bấm luôn dính sát đáy.

### Câu C2: Debug Flexbox
- Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
    - Do các card có lượng text khác nhau nên chiều cao mỗi card khác nhau do đó nút `.btn` không nằm cùng hàng.
    - Sửa:
    ```
    css
    .card-container { 
        display: flex; 
        flex-wrap: wrap; 
    }
    .card { 
        width: 30%; 
        margin: 1.5%; 
        display: flex;         /* SỬA: Biến card thành flex */
        flex-direction: column;/* SỬA: Xếp theo chiều dọc */
    }
    .card img { width: 100%; }
    .card h3 { font-size: 18px; }
    .card .btn { 
        padding: 10px; 
        margin-top: auto;      /* SỬA: Ép nút luôn dính đáy card */
    }
    ```
- Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
    - Do mới chỉ khai báo `display: flex` cho .hero mà chưa có các lệnh căn chỉnh vị trí các phần tử con bên trong.
    - Sửa:
    ```
    css
    .hero {
        height: 100vh;
        display: flex;
        justify-content: center; /* SỬA: Căn giữa theo chiều ngang */
        align-items: center;     /* SỬA: Căn giữa theo chiều dọc */
    }
    .hero-content {
        text-align: center;
    }
    ```
- Lỗi 3: Sidebar bị co lại khi content quá dài
    - Do cơ chế của  Flexbox, thuộc tính `flex: 1` sẽ bằng `flex-shrink: 1` nên nó sẽ tự động co sidebar để nhường chỗ cho text dài ở content.
    - Sửa:
    ```
    css
    .layout { display: flex; }
    .sidebar { 
        width: 250px; 
        flex-shrink: 0; /* SỬA: Ngăn không cho sidebar bị co bóp diện tích */
    }
    .content { flex: 1; }
    ```