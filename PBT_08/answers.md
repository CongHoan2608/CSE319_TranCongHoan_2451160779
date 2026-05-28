## Phần A
### Câu A1: Function Declaration vs Expression vs Arrow
- Viết cùng 1 hàm tinhThueBaoHiem(luong) theo 3 cách:
```javascript
// 1. Function Declaration
function tinhThueBaoHiem1(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}

// 2. Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```
- Câu hỏi: 3 cách này có khác nhau về hoisting không? Giải thích bằng ví dụ code cụ thể:
    - Function Declaration (Cách 1): Được JavaScript "hoist" toàn bộ cả tên hàm và nội dung hàm lên đầu phạm vi.
    - Function Expression (Cách 2) và Arrow Function (Cách 3): Vì chúng được gán vào các biến const hoặc let, chúng không được hoist theo cách tương tự.
    - Ví dụ:
```javascript
//1. Function Declaration: CHẠY BÌNH THƯỜNG
console.log(tinhThue1(15000000)); 
function tinhThue1(luong) {
    return luong * 0.1;
}

//2. Function Expression: LỖI (ReferenceError: Cannot access 'tinhThue2' before initialization)
console.log(tinhThue2(15000000)); 
const tinhThue2 = function(luong) {
    return luong * 0.1;
};

//3. Arrow Function: LỖI TƯƠNG TỰ CÁCH 2
console.log(tinhThue3(15000000)); 
const tinhThue3 = (luong) => {
    return luong * 0.1;
};
```

### Câu A2: Scope & Closure
- Dự đoán output:
    - Đoạn 1:
        - console.log(c.increment());  // 1
        - console.log(c.increment());  // 2
        - console.log(c.increment());  // 3
        - console.log(c.decrement());  // 2
        - console.log(c.getCount());   // 1

    - Đoạn 2:
        // Output sau 200ms:
        - let: 0
        - let: 1
        - let: 2

- Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau trong vòng lặp setTimeout?
    - Vòng lặp dùng var: * var không có block scope. Toàn bộ vòng lặp dùng chung duy nhất một biến i.
        - Hàm setTimeout bị trì hoãn. Lúc nó chạy thì vòng lặp for đã chạy xong từ lâu, và biến i luôn là 3.

    - Vòng lặp dùng let: * let có block scope.
        - Mỗi lần vòng lặp chạy, JavaScript sẽ tạo ra một biến j hoàn toàn mới và độc lập cho lần lặp đó.
        - Hàm setTimeout tạo ra một lưu giữ chính xác giá trị của j tại thời điểm vòng lặp đó đang chạy.

### Câu A3: Array Methods
- Viết 1 dòng code cho mỗi yêu cầu:
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 1. Lấy các số chẵn
const chan = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const nhan3 = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const tong = nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
const lonHon7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const coLonHon10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const tatCaDuong = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]" 
const chanLe = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
const daoNguoc = [...nums].reverse();
```

### Câu A4: Object Destructuring & Spread
```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // In ra: iPhone 16 25990000 8 Titan
console.log(specs);                     // Lỗi: ReferenceError: specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // In ra: 23990000
console.log(updated.sale);             // In ra: true
console.log(product.price);            // In ra: 25990000  (gốc không bị thay đổi?)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // In ra: 16 (Bị đổi theo bản copy!)
```

## Phần C
### Câu C1: Refactor Code
- Viết lại:
```javascript
const processOrders = (orders) => orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Câu C2: Thiết kế API:
```javascript
const miniArray = {
    map(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        for (let i = 0; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

console.log(miniArray.map([1, 2, 3], x => x * 2));        
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
```