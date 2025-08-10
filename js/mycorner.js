document.addEventListener('DOMContentLoaded', () => {

    // Define the restaurant's information
    const restaurantInfo = {
        name: 'My Corner',
        logo: 'images/CumpuEats_Logo.png',
        id: 'mycorner',
        deliveryFee: 10.00
    };

    const menuData = {
        friedItems: [
            { id: 'fried-romy', name: 'Fried Romy', price: 70, imageUrl: 'images/fried-romy.jpg' },
            { id: 'cheeder-fries', name: 'Cheeder Fries', price: 45, imageUrl: 'images/cheeder_fries.jpg' }
        ],
        omelets: [
            { id: 'omelet-sandwich', name: 'Omelet Sandwich', price: 35, imageUrl: 'images/ommlet.jpg' }
        ],
        drinks: [
            { id: 'v-cola', name: 'V-Cola', price: 15, imageUrl: 'images/v-cola.jpg' },
            { id: 'schweppes', name: 'Schweppes Gold', price: 18, imageUrl: 'images/schweppes.jpg' },
            { id: 'birell', name: 'Birell', price: 20, imageUrl: 'images/birell.jpg' },
            { id: 'aquafina-water', name: 'Aquafina Water', price: 10, imageUrl: 'images/waterr.jpg' }
        ],
        extras: [
            { id: 'pickles', name: 'Pickles', price: 10, imageUrl: 'images/pickels.jpg' }
        ]
    };

    // Load the cart from local storage, or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('currentCart')) || [];

    // DOM Elements
    const friedItemsContainer = document.getElementById('fried-items-container');
    const omeletsContainer = document.getElementById('omelets-container');
    const drinksContainer = document.getElementById('drinks-container');
    const extrasContainer = document.getElementById('extras-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountIcon = document.querySelector('.cart-count');
    const totalItemsText = document.getElementById('total-items');
    const totalPriceText = document.getElementById('total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Function to render menu items
    function renderMenuItems(items, container) {
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('menu-item-card');
            itemCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-footer">
                        <span class="item-price">EGP ${item.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(itemCard);
        });
    }

    // Function to save the cart and restaurant info to local storage
    function saveCart() {
        localStorage.setItem('currentCart', JSON.stringify(cart));
        localStorage.setItem('currentRestaurantName', restaurantInfo.name);
        localStorage.setItem('currentRestaurantLogo', restaurantInfo.logo);
        localStorage.setItem('currentRestaurantId', restaurantInfo.id);
        localStorage.setItem('currentRestaurantDeliveryFee', restaurantInfo.deliveryFee);
    }

    // Function to update the cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            checkoutBtn.disabled = true;
            if (cartCountIcon) cartCountIcon.classList.add('hidden');
        } else {
            checkoutBtn.disabled = false;
            if (cartCountIcon) cartCountIcon.classList.remove('hidden');

            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>EGP ${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });
        }

        cartCountIcon.textContent = totalItems;
        totalItemsText.textContent = `${totalItems} items`;
        totalPriceText.textContent = `EGP ${totalPrice.toFixed(2)}`;

        saveCart(); // Save the cart to local storage after every update
    }

    // Add item to cart logic
    function addToCart(itemId) {
        const allMenuItems = [
            ...menuData.friedItems,
            ...menuData.omelets,
            ...menuData.drinks,
            ...menuData.extras
        ];
        const selectedItem = allMenuItems.find(item => item.id === itemId);

        if (selectedItem) {
            const existingCartItem = cart.find(item => item.id === itemId);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({ ...selectedItem, quantity: 1 });
            }
            updateCartUI();
        }
    }

    // Event listener for adding items to the cart
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            const itemId = button.dataset.id;
            addToCart(itemId);
        }
    });
    
    // Add event listener for the checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            if (cart.length === 0) {
                e.preventDefault(); // Stop navigation if the cart is empty
                alert('Your cart is empty!');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }

    // Initial rendering
    renderMenuItems(menuData.friedItems, friedItemsContainer);
    renderMenuItems(menuData.omelets, omeletsContainer);
    renderMenuItems(menuData.drinks, drinksContainer);
    renderMenuItems(menuData.extras, extrasContainer);
    updateCartUI(); // Initial call to display cart from local storage

});