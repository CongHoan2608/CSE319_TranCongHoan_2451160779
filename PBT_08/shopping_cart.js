function createCart() {
    let items = [];
    let discountCode = "";
    
    return {
        addItem(product, quantity = 1) {
            const existItem = items.find(i => i.id === product.id);
            if (existItem) {
                existItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
            
            if (discountCode === "SALE10") return subtotal * 0.9;
            if (discountCode === "SALE20") return subtotal * 0.8;
            if (discountCode === "FREESHIP") return subtotal - 30000;
            
            return subtotal;
        },

        applyDiscount(code) {
            discountCode = code;
        },
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            
            items.forEach((item, index) => {
                const total = item.price * item.quantity;
                const name = item.name.padEnd(13, " ");
                const price = item.price.toLocaleString("vi-VN").padEnd(11, " ");
                const totalStr = total.toLocaleString("vi-VN").padEnd(11, " ");
                
                console.log(`│ ${index + 1} │ ${name} │  ${item.quantity} │ ${price} │ ${totalStr} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            console.log(`│ Tổng cộng:                       ${this.getTotal().toLocaleString("vi-VN")}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },
        
        clearCart() {
            items = [];
            discountCode = "";
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

console.log("--- Trước giảm giá ---");
cart.printCart();

console.log("\n--- Sau giảm giá ---");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa AirPods:", cart.getItemCount());