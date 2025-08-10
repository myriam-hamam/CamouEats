document.addEventListener('DOMContentLoaded', () => {

    const restaurantInfo = {
        name: 'R-Togo',
        logo: 'images/CumpuEats_Logo.png',
        id: 'rtogo',
        deliveryFee: 15.00
    };

    // Load cart from local storage or initialize an empty one
    let cart = JSON.parse(localStorage.getItem('currentCart')) || [];
    
    // DOM Elements
    const cartItemsContainer = document.getElementById('cart-items');
    const cartBadge = document.getElementById('cart-badge');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartDeliveryEl = document.getElementById('cart-delivery');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Function to save cart and restaurant info to local storage
    const saveCart = () => {
        localStorage.setItem('currentCart', JSON.stringify(cart));
        localStorage.setItem('currentRestaurantName', restaurantInfo.name);
        localStorage.setItem('currentRestaurantLogo', restaurantInfo.logo);
        localStorage.setItem('currentRestaurantId', restaurantInfo.id);
        localStorage.setItem('currentRestaurantDeliveryFee', restaurantInfo.deliveryFee);
    };

    // Function to update the cart summary and UI
    const updateCartUI = () => {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            cartBadge.textContent = '0';
            cartSubtotalEl.textContent = '0.00';
            cartDeliveryEl.textContent = '0.00';
            cartTotalEl.textContent = '0.00';
            checkoutBtn.classList.add('disabled');
            checkoutBtn.style.pointerEvents = 'none'; // Disable click
        } else {
            cart.forEach(item => {
                const totalItemPrice = item.price * item.quantity;
                subtotal += totalItemPrice;
                totalItems += item.quantity;

                const cartItemEl = document.createElement('div');
                cartItemEl.classList.add('cart-item');
                cartItemEl.innerHTML = `
                    <span class="cart-item-name">${item.name} x${item.quantity}</span>
                    <span class="cart-item-price">EGP ${totalItemPrice.toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
            
            const total = subtotal + restaurantInfo.deliveryFee;
            cartBadge.textContent = totalItems;
            cartSubtotalEl.textContent = subtotal.toFixed(2);
            cartDeliveryEl.textContent = restaurantInfo.deliveryFee.toFixed(2);
            cartTotalEl.textContent = total.toFixed(2);
            checkoutBtn.classList.remove('disabled');
            checkoutBtn.style.pointerEvents = 'auto';
        }
        saveCart();
    };

    // Add item to cart logic
    const addToCart = (itemName, itemPrice) => {
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Add the item to the cart, including its name and price
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        updateCartUI();
    };

    // Event listener for adding items to the cart
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.add-to-cart-btn');
        if (button) {
            const itemCard = button.closest('.menu-item-card');
            const itemName = itemCard.dataset.name;
            const itemPrice = parseFloat(itemCard.dataset.price);

            if (itemName && !isNaN(itemPrice)) {
                addToCart(itemName, itemPrice);
            } else {
                console.error('Could not find item data attributes.');
            }
        }
    });

    // Event listener for checkout button
    checkoutBtn.addEventListener('click', (e) => {
        if (cart.length === 0) {
            e.preventDefault();
            alert('Your cart is empty!');
        }
    });

    // Initial load of the cart
    updateCartUI();
});