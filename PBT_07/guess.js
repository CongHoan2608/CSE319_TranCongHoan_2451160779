const answer = Math.floor(Math.random() * 100) + 1;

let turns = 7;
let history = [];
let isWin = false;

while (turns > 0) {
    const input = prompt(`Đoán số từ 1-100 (Bạn còn ${turns} lượt):`);
    
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    const guess = Number(input);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng nhập một số hợp lệ từ 1 đến 100!");
        continue;
    }

    if (history.includes(guess)) {
        alert("Bạn đã đoán số này rồi! Hãy thử số khác.");
        continue; 
    }
    history.push(guess);

    if (guess === answer) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${8 - turns} lần!`);
        isWin = true;
        break;
    } else if (guess < answer) {
        alert("Cao hơn");
    } else {
        alert("Thấp hơn");
    }
    turns--;
}

if (!isWin && turns === 0) {
    alert(`Hết lượt! Bạn đã thua. Đáp án chính xác là ${answer}`);
}