## Phần A
### Câu A1: var / let / const
- Đoạn 1: Kết quả là undefined vì biến var được kéo lên đầu nhưng chưa có giá trị.

- Đoạn 2: Gây lỗi ReferenceError vì let không cho phép truy cập trước khi khởi tạo.

- Đoạn 3: Gây lỗi TypeError vì const giống như két sắt, một khi đã gán giá trị thì không thể thay đổi được nữa.

- Đoạn 4: Kết quả là [1, 2, 3, 4]. Tuy arr khai báo bằng const, nhưng đối với mảng hay đối tượng, ta vẫn có thể thay đổi các thành phần bên trong nó mà không vi phạm việc gán lại tham chiếu của biến.

- Đoạn 5: Trong block: 2, Ngoài block: 1. Do let tuân theo block-scope, biến a bên trong ngoặc nhọn hoàn toàn độc lập với biến a bên ngoài.

### Câu A2: Data Types & Coercion
- console.log(typeof null);              // object
- console.log(typeof undefined);         // undefined
- console.log(typeof NaN);              // number
- console.log("5" + 3);                 // 53
- console.log("5" - 3);                 // 2
- console.log("5" * "3");              // 15
- console.log(true + true);            // 2
- console.log([] + []);                // ""
- console.log([] + {});                // "[object Object]"
- console.log({} + []);                // "[object Object]"

- `"5" + 3` và `"5" - 3` cho kết quả khác nhau vì: 
    - `"5" + 3`: Toán tử + trong JavaScript có hai vai trò: một là để cộng các số, hai là để nối chuỗi. Khi JavaScript nhận thấy một trong hai toán hạng là chuỗi ("5"), nó sẽ ưu tiên nối chuỗi. Do đó, nó biến số 3 thành chuỗi "3" và nối chúng lại thành "53".
    - `"5" - 3`: Toán tử - chỉ có duy nhất một vai trò trong toán học. Khi gặp phép tính này nó thực hiện phép trừ thông thường: 5 - 3 = 2.

### Câu A3: So sánh == vs ===
- console.log(5 == "5");                // true
- console.log(5 === "5");               // false
- console.log(null == undefined);       // true
- console.log(null === undefined);      // false
- console.log(NaN == NaN);             // false
- console.log(0 == false);             // true
- console.log(0 === false);            // false
- console.log("" == false);            // true

- Quy tắc nên dùng `===`:
    - Vì:
        - Toán tử `==` tự động thực hiện ép kiểu ngầm dưới nền trước khi so sánh. Điều này tạo ra những kết quả vô lý và rất khó lường.
        - Ngược lại, toán tử `===` sẽ kiểm tra nghiêm ngặt cả giá trị và kiểu dữ liệu. Nếu hai vế khác kiểu dữ liệu, nó sẽ trả về false mà không biến đổi dữ liệu. Việc này giúp code của bạn an toàn, dễ dự đoán và ít xảy ra lỗi logic hơn.
    
### Câu A4: Truthy & Falsy
- Các giá trị Falsy:
    - false
    - 0
    - ""
    - null
    - undefined
    - NaN
- Dự đoán kết quả:
    - if ("0") console.log("A");           // In "A"
    - if ("") console.log("B");            // Không in
    - if ([]) console.log("C");            // In "C"
    - if ({}) console.log("D");            // In "D"
    - if (null) console.log("E");          // Không in
    - if (0) console.log("F");             // Không in
    - if (-1) console.log("G");            // In "G"
    - if (" ") console.log("H");           // In "H"

### Câu A5: Template Literals
// Cách 1:
- Template literal:
```
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```
// Cách 2:
- Template literal:
```
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```
// Cách 3:
- Template literal: 
```
const html = 
`<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

## Phần C
### Câu C1: Debug JavaScript
- 6 lỗi trong code:
    1. `var giamGia = giaBan * phanTramGiam / 100`
        - Lỗi khai báo biến bằng `var`
        - `var` có phạm vi function-scope và dễ gây ra các bẫy hoisting khó kiểm soát.
        - Cách sửa: Thay bằng `const giamGia =`
    2. `if (giaSauGiam = 0)`
        - Lỗi dùng phép gán thay vì phép so sánh.
        - Dấu = là phép gán giá trị, không phải toán tử so sánh.
        - Cách sửa: Thay bằng `if (giaSauGiam === 0)`
    
    3. `tinhGiaGiamGia("100000", 20)`
        - Lỗi tự ý chuyển kiểu
        - JavaScript tự động ép kiểu chuỗi "100000" thành số khi làm toán là nguồn gốc lỗi .
        - Cách sửa: Thay bằng `Number(giaBan) * phanTramGiam / 100`
    4. `"Giá sau giảm: " + gia + "đ"`
        - Dùng dấu + để nối.
        - Dễ gây sai sót về khoảng trắng và khó đọc khi có nhiều biến.
        - Cách sửa: Thay bằng ``` `Giá sau giảm: ${gia}đ` ```
    5. Thiếu dấu `;`
        - Các dòng lệnh return, gọi hàm, gán biến đều đang không có ; ở cuối
        - Việc bỏ quên ; có thể gây ra lỗi cú pháp bất ngờ ở một số trường hợp nối dòng.
        - Cách sửa: Thêm dấu ; vào cuối tất cả các câu lệnh cho đúng chuẩn.
    6. `for (var i = 0; i < 5; i++)` đi kèm với hàm setTimeout
        - Lỗi "ẩn" của var trong vòng lặp
        - Do var không có block-scope. Khi các hàm setTimeout chạy, vòng lặp chạy xong biến i đã có giá trị là 5 nên chương trình in giá trị đó 5 lần.
        - Cách sửa: Thay bằng `for (let i = 0; i < 5; i++)`. Vì let có block-scope, nó tạo ra một phạm vi để lưu giữ giá trị cho từng hàm setTimeout.