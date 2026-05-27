const items = [
    { name: "Phở bò", qty: 2, price: 65000 },
    { name: "Trà đá", qty: 3, price: 5000 },
    { name: "Bún chả", qty: 1, price: 55000 }
];

let tongCong = 0;
for (const item of items) {
    tongCong += item.qty * item.price;
}


let phanTramGiam = 0;
if (tongCong > 1000000) {
    phanTramGiam = 15;
} else if (tongCong > 500000) {
    phanTramGiam = 10;
}

if (new Date().getDay() === 3) {
    phanTramGiam += 5; 
}

const tienGiam = tongCong * (phanTramGiam / 100);
const giaSauGiam = tongCong - tienGiam;

const vat = giaSauGiam * 0.08;
const tip = giaSauGiam * 0.05;

const thanhToan = giaSauGiam + vat + tip;

console.log(`╔══════════════════════════════════════╗`);
console.log(`║          HÓA ĐƠN NHÀ HÀNG            ║`);
console.log(`╠══════════════════════════════════════╣`);

items.forEach((item, index) => {
    const thanhTien = item.qty * item.price;
    const tenMon = `${index + 1}. ${item.name}`.padEnd(14, " ");
    const soLuong = `x${item.qty}`.padEnd(5, " ");
    const donGia = `@${item.price / 1000}k`.padEnd(5, " ");
    console.log(`║ ${tenMon} ${soLuong} ${donGia} = ${thanhTien / 1000}k  ║`);
});

console.log(`╠══════════════════════════════════════╣`);
console.log(`║ Tổng cộng:              ${tongCong.toLocaleString()}đ    ║`);
console.log(`║ Giảm giá (${phanTramGiam}%):           ${tienGiam.toLocaleString()}đ         ║`);
console.log(`║ VAT (8%):                ${vat.toLocaleString()}đ    ║`);
console.log(`║ Tip (5%):                ${tip.toLocaleString()}đ    ║`);
console.log(`╠══════════════════════════════════════╣`);
console.log(`║ THANH TOÁN:              ${thanhToan.toLocaleString()}đ   ║`);
console.log(`╚══════════════════════════════════════╝`);