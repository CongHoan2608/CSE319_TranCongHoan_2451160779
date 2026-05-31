function SimpleVariables() {
    const ten = "Hoan";
    const tuoi = 21;
    const queQuan = "Hà Nội";
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
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>Kết quả Thử thách Bài 2.1</h2>
            {}
            <h3>1. Thông tin cá nhân</h3>
            <ul>
                <li><strong>Tên:</strong> {ten}</li>
                <li><strong>Tuổi:</strong> {tuoi}</li>
                <li><strong>Quê quán:</strong> {queQuan}</li>
            </ul>
            <hr />

            {/* Yêu cầu 2: Lời chào */}
            <h3>2. Lời chào thời gian thực</h3>
            <p>
                Bây giờ là {gioHienTai} giờ. <strong>{loiChao}!</strong>
            </p>
            <hr />

            {/* Yêu cầu 3: Tính BMI */}
            <h3>3. Chỉ số BMI</h3>
            <p>Cân nặng: {canNang} kg</p>
            <p>Chiều cao: {chieuCao} m</p>
            {/* Sử dụng hàm toFixed(2) để làm tròn thành 2 chữ số thập phân */}
            <p>Chỉ số BMI của bạn là: <strong style={{ color: "blue" }}>{bmi.toFixed(2)}</strong></p>
        </div>
    );
}

export default SimpleVariables;