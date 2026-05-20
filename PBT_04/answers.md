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