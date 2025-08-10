document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const valuePacksContainer = document.getElementById('value-packs-container');
    const handmadeTreatsContainer = document.getElementById('handmade-treats-container');
    const hotBeveragesContainer = document.getElementById('hot-beverages-container');
    const coldBeveragesContainer = document.getElementById('cold-beverages-container');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartItemCountIcon = document.getElementById('cart-item-count-icon');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');

    // --- Cinnabon Menu Data (Corrected Image URLs) ---
    const cinnabonData = {
        name: 'Cinnabon',
        logo: 'images/cinnabon_logo.jpg',
        deliveryTime: '45 - 60 mins',
        valuePacks: [
            { id: 401, name: 'Cinnabon ', price: 529, imageUrl: 'images/cinnabon-classic.jpg', description: 'Four classic cinnabons in a box.' },
            { id: 402, name: 'Chocobon ', price: 555, imageUrl: 'images/cinnabon-classic.jpg', description: 'Four chocobons in a box.' },
            { id: 403, name: 'Caramel Pecanbon ', price: 565, imageUrl: 'images/caramel.jpg', description: 'Four caramel pecanbons in a box.' },
            { id: 404, name: 'Mini Cinnabon ', price: 288, imageUrl: 'images/minibon-classic.jpg', description: 'Four mini cinnabons in a box.' },
            { id: 405, name: 'Mini Caramel Pecanbon ', price: 325, imageUrl: 'images/minibon-caramel-pecanbon.jpg', description: 'Four mini caramel pecanbons in a box.' },
            { id: 406, name: 'Mini Chocobon', price: 300, imageUrl: 'images/chocobon-bonbites.jpg', description: 'Four mini chocobons in a box.' }
        ],
        handmadeTreats: [
            { id: 101, name: 'Classic Roll', price: 85, imageUrl: 'images/cinnabon-classic.jpg', description: 'The original, world-famous cinnamon roll.' },
            { id: 102, name: 'Minibon Classic', price: 60, imageUrl: 'images/minibon-classic.jpg', description: 'A smaller version of our Classic Roll.' },
            { id: 103, name: 'Caramel Pecanbon', price: 95, imageUrl: 'images/caramel.jpg', description: 'Our classic roll topped with pecans and caramel.' },
            { id: 104, name: 'Caramel Pecanbon Bonbites', price: 65, imageUrl: 'images/caramel-pecanbon-bonbites.jpg', description: 'Bite-sized caramel pecanbons.' },
            { id: 105, name: 'Roll-on-the-Go', price: 75, imageUrl: 'images/roll-on-the-go.jpg', description: 'A portable, convenient Classic Roll.' },
        ],
        hotBeverages: [
            { id: 201, name: 'Espresso', price: 40, imageUrl: 'images/hot_beverage.jpg', description: 'A strong, concentrated coffee beverage.' },
            { id: 202, name: 'Cappuccino', price: 50, imageUrl: 'images/hot_beverage.jpg', description: 'Espresso with steamed milk foam.' },
            { id: 203, name: 'Flat White', price: 55, imageUrl: 'images/hot_beverage.jpg', description: 'Espresso with microfoam.' },
            { id: 204, name: 'Latte', price: 55, imageUrl: 'images/hot_beverage.jpg', description: 'Espresso with steamed milk.' },
            { id: 205, name: 'Hot Chocolate', price: 60, imageUrl: 'images/hot_beverage.jpg', description: 'Rich hot chocolate with milk.' },
        ],
        coldBeverages: [
            { id: 301, name: 'Signature Iced Chocolate', price: 70, imageUrl: 'images/signature-iced-chocolate.jpg', description: 'Rich, creamy iced chocolate.' },
            { id: 302, name: 'Chillatta Caramel Banana', price: 80, imageUrl: 'images/chillatta-caramel-banana.jpg', description: 'Icy blended beverage with caramel and banana.' },
            { id: 303, name: 'Chillatta Strawberry Banana', price: 80, imageUrl: 'images/chillatta-strawberry-banana.jpg', description: 'Fruity and creamy strawberry banana chill.' },
            { id: 304, name: 'Chillatta Tropical Blast', price: 80, imageUrl: 'images/chillatta-tropical-blast.jpg', description: 'Icy blended tropical fruit beverage.' },
            { id: 305, name: 'Chillatta Cookies & Cream', price: 80, imageUrl: 'images/chillatta-cookies-cream.jpg', description: 'Icy blended drink with cookies and cream.' },
        ]
    };

    let cart = [];
    const storedRestaurantName = localStorage.getItem('currentRestaurantName');
    if (storedRestaurantName === cinnabonData.name) {
        cart = JSON.parse(localStorage.getItem('currentCart')) || [];
    } else {
        localStorage.removeItem('currentCart');
        localStorage.removeItem('currentRestaurantName');
        localStorage.removeItem('currentRestaurantLogo');
        localStorage.removeItem('deliveryTime');
    }
    localStorage.setItem('currentRestaurantName', cinnabonData.name);
    localStorage.setItem('currentRestaurantLogo', cinnabonData.logo);
    localStorage.setItem('deliveryTime', cinnabonData.deliveryTime);

    // Renders a specific menu section
    function renderMenuSection(items, container) {
        container.innerHTML = '';
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('menu-item-card');
            itemCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-details">
                    <h3>${item.name.replace(' 4PK', '')}</h3>
                    <p>${item.description || ''}</p>
                    <div class="menu-item-footer">
                        <span class="price">EGP ${item.price.toFixed(2)}</span>
                        <button class="add-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image-url="${item.imageUrl}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(itemCard);
        });

        container.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const { id, name, price, imageUrl } = event.currentTarget.dataset;
                addToCart({ id: parseInt(id), name, price: parseFloat(price), imageUrl });
            });
        });
    }

    // Adds an item to the cart or increments its quantity
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem('currentCart', JSON.stringify(cart));
        updateCartUI();
    }

    // Removes an item from the cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('currentCart', JSON.stringify(cart));
        if (cart.length === 0) {
            localStorage.removeItem('currentRestaurantName');
            localStorage.removeItem('currentRestaurantLogo');
            localStorage.removeItem('deliveryTime');
        }
        updateCartUI();
    }

    // Updates the cart UI based on the current cart data
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            checkoutButton.disabled = true;
        } else {
            checkoutButton.disabled = false;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name.replace(' 4PK', '')} x${item.quantity}</h4>
                    <p>EGP ${itemTotal.toFixed(2)}</p>
                </div>
                <button class="cart-remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        cartItemCount.textContent = `${itemCount} items`;
        cartItemCountIcon.textContent = itemCount;
        cartTotalPrice.textContent = `EGP ${total.toFixed(2)}`;
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // --- Event Listeners ---
    cartItemsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.cart-remove-btn');
        if (button) {
            const itemId = parseInt(button.dataset.id);
            removeFromCart(itemId);
        }
    });

    checkoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // --- Initial Render ---
    renderMenuSection(cinnabonData.valuePacks, valuePacksContainer);
    renderMenuSection(cinnabonData.handmadeTreats, handmadeTreatsContainer);
    renderMenuSection(cinnabonData.hotBeverages, hotBeveragesContainer);
    renderMenuSection(cinnabonData.coldBeverages, coldBeveragesContainer);
    updateCartUI();
});