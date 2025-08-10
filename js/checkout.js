document.addEventListener('DOMContentLoaded', () => {
    // Load elements from the page
    const pageTitleElem = document.getElementById('page-title');
    const faviconLink = document.getElementById('favicon-link');
    const restaurantNameElem = document.getElementById('restaurant-name');
    const restaurantLogoElem = document.getElementById('restaurant-logo');
    const breadcrumbRestaurantLink = document.getElementById('breadcrumb-restaurant-link');
    const noDataMessage = document.getElementById('no-data-message');
    const checkoutSections = document.getElementById('checkout-sections');
    const orderItemsContainer = document.getElementById('order-items');
    const summarySubtotalElem = document.getElementById('summary-subtotal');
    const summaryDeliveryElem = document.getElementById('summary-delivery');
    const summaryTaxElem = document.getElementById('summary-tax');
    const summaryTotalElem = document.getElementById('summary-total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const orderConfirmation = document.getElementById('order-confirmation');

    // Load cart and restaurant data from local storage
    const cart = JSON.parse(localStorage.getItem('currentCart')) || [];
    const restaurantName = localStorage.getItem('currentRestaurantName') || 'Restaurant';
    const restaurantLogo = localStorage.getItem('currentRestaurantLogo') || 'images/LOGO.JPG';
    const restaurantID = localStorage.getItem('currentRestaurantId') || 'entry';
    
    // Check if a restaurant was actually selected and a cart exists
    if (cart.length === 0 || restaurantName === 'Restaurant') {
        noDataMessage.classList.remove('hidden');
        checkoutSections.classList.add('hidden');
        return; // Stop execution if no valid data
    }
    
    // Update restaurant details on the page
    pageTitleElem.textContent = `Checkout | ${restaurantName}`;
    restaurantNameElem.textContent = restaurantName;
    restaurantLogoElem.src = restaurantLogo;
    breadcrumbRestaurantLink.href = `${restaurantID}.html`;
    faviconLink.href = restaurantLogo;
    
    const deliveryFee = 15.00;
    const taxRate = 0.14;

    let subtotal = 0;

    // Render the cart items
    orderItemsContainer.innerHTML = ''; // Clear previous content
    cart.forEach(item => {
        const totalItemPrice = item.price * item.quantity;
        subtotal += totalItemPrice;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('order-item');
        itemDiv.innerHTML = `
            <img class="item-image" src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name} x${item.quantity}</h4>
            </div>
            <div class="item-total-price">EGP ${totalItemPrice.toFixed(2)}</div>
        `;
        orderItemsContainer.appendChild(itemDiv);
    });

    const tax = subtotal * taxRate;
    const total = subtotal + deliveryFee + tax;
    
    summarySubtotalElem.textContent = `EGP ${subtotal.toFixed(2)}`;
    summaryDeliveryElem.textContent = `EGP ${deliveryFee.toFixed(2)}`;
    summaryTaxElem.textContent = `EGP ${tax.toFixed(2)}`;
    summaryTotalElem.textContent = `EGP ${total.toFixed(2)}`;

    placeOrderBtn.disabled = false;
    checkoutSections.classList.remove('hidden');

    // Handle the "Place Order" button click
    placeOrderBtn.addEventListener('click', () => {
        // Show the order confirmation message
        checkoutSections.classList.add('hidden');
        orderConfirmation.classList.remove('hidden');

        // Clear the cart from local storage
        localStorage.removeItem('currentCart');
        localStorage.removeItem('currentRestaurantName');
        localStorage.removeItem('currentRestaurantLogo');
        localStorage.removeItem('currentRestaurantId');
    });
});