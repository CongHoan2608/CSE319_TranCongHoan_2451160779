const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let đếmGiỏi = 0, đếmKhá = 0, đếmTB = 0, đếmYếu = 0;
let maxSV = students[0], minSV = students[0]; 
let tổngToán = 0, tổngLý = 0, tổngCS = 0;
let tổngĐiểmNam = 0, đếmNam = 0;
let tổngĐiểmNữ = 0, đếmNữ = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

students.forEach((sv, index) => {
    sv.avg = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);

    if (sv.avg >= 8.0) { sv.rank = "Giỏi"; đếmGiỏi++; }
    else if (sv.avg >= 6.5) { sv.rank = "Khá"; đếmKhá++; }
    else if (sv.avg >= 5.0) { sv.rank = "Trung bình"; đếmTB++; }
    else { sv.rank = "Yếu"; đếmYếu++; }

    const stt = String(index + 1).padEnd(3, " ");
    const ten = sv.name.padEnd(6, " ");
    const diem = sv.avg.toFixed(1).padEnd(4, " ");
    const xepLoai = sv.rank.padEnd(11, " ");
    console.log(`| ${stt} | ${ten} | ${diem} | ${xepLoai} |`);

    if (sv.avg > maxSV.avg) maxSV = sv;
    if (sv.avg < minSV.avg) minSV = sv;

    tổngToán += sv.math;
    tổngLý += sv.physics;
    tổngCS += sv.cs;

    if (sv.gender === "M") {
        tổngĐiểmNam += sv.avg;
        đếmNam++;
    } else {
        tổngĐiểmNữ += sv.avg;
        đếmNữ++;
    }
});

console.log(`4. Số lượng SV: Giỏi (${đếmGiỏi}), Khá (${đếmKhá}), Trung bình (${đếmTB}), Yếu (${đếmYếu})`);

console.log(`5. Cao nhất: ${maxSV.name} (${maxSV.avg.toFixed(1)} điểm)`);
console.log(`   Thấp nhất: ${minSV.name} (${minSV.avg.toFixed(1)} điểm)`);

const soSV = students.length;
console.log(`6. Điểm TB môn: Toán (${(tổngToán / soSV).toFixed(1)}), Lý (${(tổngLý / soSV).toFixed(1)}), CS (${(tổngCS / soSV).toFixed(1)})`);

const tbNam = đếmNam > 0 ? (tổngĐiểmNam / đếmNam).toFixed(1) : 0;
const tbNữ = đếmNữ > 0 ? (tổngĐiểmNữ / đếmNữ).toFixed(1) : 0;
console.log(`7. Điểm TB theo giới tính: Nam (${tbNam}), Nữ (${tbNữ})`);