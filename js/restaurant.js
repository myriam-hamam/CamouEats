document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-item-count');
    const cartCountHeader = document.getElementById('cart-item-count-header');
    const cartTotal = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-button');

    const restaurantNameElem = document.getElementById('restaurant-name');
    const restaurantLogoElem = document.getElementById('restaurant-logo');

    // Load restaurant info from localStorage
    const restaurantName = localStorage.getItem('selectedRestaurantName') || 'Restaurant';
    const restaurantLogo = localStorage.getItem('selectedRestaurantLogo') || 'images/LOGO.JPG';
    restaurantNameElem.textContent = restaurantName;
    restaurantLogoElem.src = restaurantLogo;

    let cart = JSON.parse(localStorage.getItem('currentCart')) || [];

    renderCart();

    // Example menu items
    const menuGrid = document.getElementById('menu-grid');
    const sampleMenu = [
        { name: 'Margherita Pizza', price: 90 },
        { name: 'Cheeseburger', price: 75 },
        { name: 'Fries', price: 30 },
    ];

    sampleMenu.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${item.name}</strong> - EGP ${item.price}
            <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        `;
        menuGrid.appendChild(div);
    });

    menuGrid.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart')) {
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const existingItem = cart.find(i => i.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart();
            renderCart();
        }
    });

    // Corrected saveCart function
    function saveCart() {
        localStorage.setItem('currentCart', JSON.stringify(cart));
        // Using the same keys for saving as for loading
        localStorage.setItem('selectedRestaurantName', restaurantName);
        localStorage.setItem('selectedRestaurantLogo', restaurantLogo);
    }

    function renderCart() {
        cartContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutBtn.disabled = true;
        } else {
            cart.forEach(item => {
                itemCount += item.quantity;
                total += item.price * item.quantity;

                const div = document.createElement('div');
                div.textContent = `${item.name} x${item.quantity} - EGP ${(item.price * item.quantity).toFixed(2)}`;
                cartContainer.appendChild(div);
            });
            checkoutBtn.disabled = false;
        }

        cartCount.textContent = `${itemCount} items`;
        cartCountHeader.textContent = itemCount;
        cartTotal.textContent = `EGP ${total.toFixed(2)}`;
    }

    checkoutBtn.addEventListener('click', (e) => {
        if (cart.length === 0) {
            e.preventDefault(); // Stop navigation if cart is empty
            alert('Your cart is empty!');
        } else {
            saveCart();
            window.location.href = 'checkout.html';
        }
    });
});