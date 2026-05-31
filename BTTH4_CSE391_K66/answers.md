## Tier 0
### Bài 0.1: Chạy React đầu tiên
1. File .jsx khác gì file .js?
File .js là file mã nguồn JavaScript thông thường. Trong khi đó, .jsx (JavaScript XML) là một phần mở rộng cú pháp đặc biệt của React. Cú pháp này cho phép bạn viết mã giống hệt HTML trực tiếp ngay bên trong file JavaScript.
2. Tại sao phải export default App?
Trong hệ thống Module của JavaScript, các đoạn code trong một file được giữ riêng biệt. Câu lệnh export default App; có nhiệm vụ "xuất" hàm component App ra bên ngoài.
3. Thử xóa export default → chuyện gì xảy ra?
Nếu bạn xóa dòng `export default App;`, component này sẽ chỉ tồn tại cục bộ bên trong file App.jsx và không thể chia sẻ ra ngoài. Khi ứng dụng biên dịch, file main.jsx cố gắng import nó sẽ không tìm thấy đích đến, dẫn đến lỗi module.

### Bài 0.2: Bài tập: Viết lại HTML thành JSX
1. Bài 1: Viết component UserProfile
```jsx
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default UserProfile;
```

2. Bài 2: Viết component ProductInfo
```jsx
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

export default ProductInfo;
```

## Tier 1
### Bài 1.1: Component render lần đầu
1. Tại sao component chỉ render 1 lần?
- Lần đầu tiên component được gọi, React sẽ thực thi hàm, lấy mã JSX và "gắn" (mount) nó lên màn hình. Nếu không có bất kỳ cơ chế báo hiệu nào cho thấy dữ liệu nội bộ đã thay đổi, React mặc định giao diện đó đã hoàn thiện và sẽ không tự động vẽ lại.

2. Khi nào nó sẽ render lại?
- Component sẽ render lại (re-render) khi dữ liệu đặc biệt của nó thay đổi — cụ thể nhất trong bài này là khi chúng ta gọi hàm cập nhật của `useState`.

### Bài 1.2: Biến "bình thường" vs useState
1. Chạy `BadCounter` → nhấn nút → thấy gì?
- Khi xem trong tab Console, giá trị biến `count` thông thường vẫn tăng lên (1, 2, 3...). Tuy nhiên, con số hiển thị trên giao diện không hề thay đổi. Lý do là biến thông thường không có khả năng "báo cáo" cho React biết để vẽ lại màn hình.

2. Chạy `GoodCounter` → nhấn nút → thấy gì?
- Số hiển thị trên giao diện được cập nhật ngay lập tức mỗi khi bấm nút. Hàm `setCount` đóng vai trò như một chiếc chuông báo: nó vừa thay đổi dữ liệu, vừa gọi React chạy lại component để update UI.

3. Mở Console → thấy log "render" mấy lần?
- Đối với `GoodCounter`, mỗi lần nhấn nút, component function sẽ được React chạy lại từ đầu đến cuối. Do đó, sẽ thấy dòng chữ báo log "render" in ra thêm một lần tương ứng với mỗi cú click.

## Tier 2
### Bài 2.1: Hiển thị biến đơn giản
```jsx
function SimpleVariables() {
    const ten = "Trần Công Hoan";
    const tuoi = 21;
    const queQuan = "Nam Định";

    const gioHienTai = new Date().getHours();
    const loiChao = gioHienTai < 12 
        ? "Chào buổi sáng" 
        : gioHienTai < 18 
            ? "Chào buổi chiều" 
            : "Chào buổi tối";

    const canNang = 65;
    const chieuCao = 1.70;
    const bmi = canNang / (chieuCao * chieuCao);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2> Thông tin</h2>
            {}
            <div style={{ marginBottom: "20px", padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}>
                <h3>1. Thông tin cá nhân</h3>
                <p><strong>Họ và tên:</strong> {ten}</p>
                <p><strong>Tuổi:</strong> {tuoi}</p>
                <p><strong>Quê quán:</strong> {queQuan}</p>
            </div>
            {}
            <div style={{ marginBottom: "20px", padding: "10px", background: "#e8f4f8", borderRadius: "5px" }}>
                <h3> Lời chào thời gian thực</h3>
                <p>
                    Bây giờ là {gioHienTai} giờ. <strong>{loiChao}!</strong>
                </p>
            </div>
            {}
            <div style={{ padding: "10px", background: "#f0f8e8", borderRadius: "5px" }}>
                <h3>3. Chỉ số BMI</h3>
                <p>Cân nặng: {canNang} kg</p>
                <p>Chiều cao: {chieuCao} m</p>
                {}
                <p>
                    Chỉ số BMI của bạn là: <strong style={{ color: "red", fontSize: "1.2em" }}>{bmi.toFixed(1)}</strong>
                </p>
            </div>
        </div>
    );
}

export default SimpleVariables;
```

### Bài 2.2: Conditional Rendering
```jsx
function TernaryDemo() {
    const isOnline = true;    
    const isLoggedIn = false; 
    const stock = 0;           
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>🎯 Kết quả Thử thách Bài 2.2 (Dùng Toán tử 3 ngôi)</h2>

            {}
            <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
                <h3>1. Trạng thái người dùng</h3>
                <p>
                    Tình trạng: {isOnline ? "🟢 Đang hoạt động" : "🔴 Ngoại tuyến"}
                </p>
            </div>

            {}
            <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
                <h3>2. Menu hệ thống</h3>
                {isLoggedIn ? (
                    <ul style={{ background: "#e8f4f8", padding: "15px 30px" }}>
                        <li>Thông tin cá nhân</li>
                        <li>Đổi mật khẩu</li>
                        <li>Đăng xuất</li>
                    </ul>
                ) : (
                    <p style={{ color: "#888", fontStyle: "italic" }}>
                        (Bạn cần đăng nhập để xem các chức năng của menu)
                    </p>
                )}
            </div>

            {}
            <div style={{ padding: "10px", border: "1px solid #ddd" }}>
                <h3>3. Thông tin sản phẩm</h3>
                <p>
                    Sản phẩm: Bàn phím cơ
                    <br />
                    Trạng thái: {
                        stock === 0 
                            ? <strong style={{ color: "red" }}>Hết hàng</strong> 
                            : <strong style={{ color: "green" }}>Còn {stock} sản phẩm</strong>
                    }
                </p>
            </div>
        </div>
    );
}

export default TernaryDemo;
```

### Bài 2.3: Render danh sách
```jsx
function ListRendering() {
    const products = [
        { id: 1, name: "Bàn phím cơ", price: 850000 },
        { id: 2, name: "Chuột gaming", price: 400000 },
        { id: 3, name: "Màn hình 24inch", price: 2500000 },
        { id: 4, name: "Tai nghe", price: 1200000 },
        { id: 5, name: "Lót chuột", price: 150000 }
    ];

    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total = total + products[i].price;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sản phẩm</h2>
            {}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>STT</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên sản phẩm</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {}
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                            
                            {}
                            <td style={{ 
                                border: "1px solid #ddd", 
                                padding: "8px",
                                color: product.price > 1000000 ? "red" : "black" 
                            }}>
                                {product.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {}
            <h3 style={{ marginTop: "20px" }}>
                Tổng cộng: {total}
            </h3>
        </div>
    );
}

export default ListRendering;
```

