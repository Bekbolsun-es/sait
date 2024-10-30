let cart = {};
let total = 0;

function addToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    total += itemPrice;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartItems.innerHTML = '';
    
    for (let item in cart) {
        const li = document.createElement('li');
        li.textContent = `${item} - ${cart[item].price} сом x ${cart[item].quantity} = ${cart[item].price * cart[item].quantity} сом`;
        
      
        const buttonDecrease = document.createElement('button');
        buttonDecrease.textContent = '-';
        buttonDecrease.onclick = () => {
            changeQuantity(item, -1);
        };
        
        const buttonIncrease = document.createElement('button');
        buttonIncrease.textContent = '+';
        buttonIncrease.onclick = () => {
            changeQuantity(item, 1);
        };
        
        
        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Удалить';
        buttonRemove.onclick = () => {
            removeFromCart(item);
        };
        
        li.appendChild(buttonDecrease);
        li.appendChild(buttonIncrease);
        li.appendChild(buttonRemove);
        
        cartItems.appendChild(li);
    }
    
    totalPrice.textContent = total;
}

function changeQuantity(item, delta) {
    if (cart[item]) {
        if (delta < 0 && cart[item].quantity > 1) {
            cart[item].quantity += delta;
            total -= cart[item].price;
        } else if (delta > 0) {
            cart[item].quantity += delta;
            total += cart[item].price;
        }
        updateCartDisplay();
    }
}

function removeFromCart(item) {
    if (cart[item]) {
        total -= cart[item].price * cart[item].quantity;
        delete cart[item];
        updateCartDisplay();
    }
}

function clearCart() {
    cart = {};
    total = 0;
    updateCartDisplay();
}

function openCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'block'; 
}

function closeCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'none';
}

function submitOrder(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const comments = document.getElementById('comments').value;
    
   
    console.log('Заказ:', {
        cart,
        total,
        name,
        address,
        phone,
        comments
    });
    
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    
    
    clearCart();
    closeCheckoutForm();
}

function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const comments = document.getElementById("comments").value;
    
    // Формируем текст заказанных товаров без кнопок
    let cartText = '';
    for (let item in cart) {
        cartText += `${item} - ${cart[item].price} сом x ${cart[item].quantity} = ${cart[item].price * cart[item].quantity} сом\n`;
    }

    const totalPrice = document.getElementById("totalPrice").innerText;
    
    const message = `Здравствуйте! Хочу оформить заказ:\n\nИмя: ${name}\nАдрес: ${address}\nТелефон: ${phone}\n\nЗаказ:\n${cartText}\nИтого: ${totalPrice} сом\n\nКомментарии: ${comments}`;
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappLink = `https://wa.me/996507025353?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
    
    clearCart();
    closeCheckoutForm();
    alert("Ваш заказ оформлен! Мы свяжемся с вами через WhatsApp.");
}