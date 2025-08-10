document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const cartIconContainer = document.getElementById('cartIconContainer');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const cartCountSpan = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const searchInput = document.getElementById('searchInput');

    // Menu section containers
    const mealsMenuContainer = document.getElementById('meals-menu-container');
    const burgerMenuContainer = document.getElementById('burger-menu-container');
    const picksMenuContainer = document.getElementById('picks-menu-container');

    // Custom Modal elements (for generic alerts)
    const customModal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    // Campus Map Modal Elements
    const mapModal = document.getElementById('mapModal');
    const changeAddressBtn = document.getElementById('changeAddressBtn');
    const closeMapModalBtn = document.getElementById('closeMapModal');
    const buildingMarkers = document.querySelectorAll('.building-marker');
    const selectedLocationDisplay = document.getElementById('selectedLocationDisplay');
    const confirmLocationBtn = document.getElementById('confirmLocationBtn');
    const deliveryLocationMessage = document.getElementById('deliveryLocationMessage'); // To update on main page

    // --- Restaurant Specific Data ---
    const RESTAURANT_NAME = "Gyro";
    const RESTAURANT_LOGO_URL = "images/gyro_logo.jpg";
    const DELIVERY_TIME_RANGE = "08:00 AM - 09:00 PM"; // Static delivery time

    // Define the menu data with your provided images and categories
    const GYRO_MENU_DATA = [
        // MEALS
        { id: 'gyroMixMeal', category: 'meals', name: 'Gyro Mix Meal', price: 180, imageUrl: 'images/Gyro_Mix_Meal.jpg', description: 'A hearty mix of classic gyro meat, rice, and fresh salad.' },
        { id: 'stripsMeal', category: 'meals', name: 'Strips Meal', price: 165, imageUrl: 'images/Strips_Meal.jpg', description: 'Crispy chicken strips served with fries and your choice of dip.' },
        { id: 'grilledMeal', category: 'meals', name: 'Grilled Meal', price: 200, imageUrl: 'images/Grilled_Meal.jpg', description: 'Assorted grilled meats with rice, grilled vegetables, and bread.' },
        { id: 'rizo6', category: 'meals', name: 'Rizo 6', price: 100, imageUrl: 'images/Rizo6.jpg', description: 'Flavorful Rizo rice with tender chicken pieces and a special sauce.' },

        // BURGER
        { id: 'classicBurger', category: 'burger', name: 'Classic Burger', price: 140, imageUrl: 'images/Classic_Burger.jpg', description: 'Our signature beef patty with fresh lettuce, tomato, and pickles.' },
        { id: 'cheeseburger', category: 'burger', name: 'Cheeseburger', price: 155, imageUrl: 'images/Cheeseburger.jpg', description: 'Juicy beef patty topped with melted cheddar cheese, served with fries.' },
        { id: 'chickenBurger', category: 'burger', name: 'Chicken Burger', price: 135, imageUrl: 'images/Chicken_Burger.jpg', description: 'Crispy fried chicken fillet burger with creamy sauce and fresh veggies.' },
        { id: 'mushroomCheeseBurger', category: 'burger', name: 'Mushroom & Cheese Burger', price: 165, imageUrl: 'images/Mushroom_and_Cheese_Burge.jpg', description: 'Beef patty with sautéed mushrooms and melted Swiss cheese.' },
        
        // Picks for you 🔥 (Include some popular items from meals/burgers here, or add new specific picks)
        { id: 'picksBeefPatty', category: 'picks', name: 'Beef Patty', price: 95, imageUrl: 'images/Beef_Patty.jpg', description: 'A standalone grilled beef patty, perfect for extra protein.' },
        { id: 'picksBuffaloWings', category: 'picks', name: 'Buffalo Sauce Wings', price: 120, imageUrl: 'images/Buffalo_Sauce_Wings.jpg', description: 'Spicy buffalo chicken wings, a favorite for sharing.' },
        { id: 'picksKofta', category: 'picks', name: 'Grilled Kofta', price: 110, imageUrl: 'images/Kofta.jpg', description: 'Skewers of seasoned grilled kofta, tender and flavorful.' },
        // Re-adding a popular burger and meal to 'picks' category
        { id: 'picksGyroMixMeal', category: 'picks', name: 'Gyro Mix Meal (🔥)', price: 180, imageUrl: 'images/Gyro_Mix_Meal.jpg', description: 'Popular: A hearty mix of classic gyro meat, rice, and fresh salad.' },
        { id: 'picksCheeseburger', category: 'picks', name: 'Cheeseburger (🔥)', price: 155, imageUrl: 'images/Cheeseburger.jpg', description: 'Popular: Juicy beef patty topped with melted cheddar cheese.' },
    ];

    // Filter data for each category
    const CATEGORY_MAP = {
        'meals': GYRO_MENU_DATA.filter(item => item.category === 'meals'),
        'burger': GYRO_MENU_DATA.filter(item => item.category === 'burger'),
        'picks': GYRO_MENU_DATA.filter(item => item.category === 'picks'),
    };

    let cart = [];
    let selectedBuilding = null; // To store the selected campus building

    // Initialize cart and location from localStorage, specific to this restaurant
    const storedRestaurantName = localStorage.getItem('currentRestaurantName');
    if (storedRestaurantName === RESTAURANT_NAME) {
        cart = JSON.parse(localStorage.getItem('currentCart')) || [];
        selectedBuilding = localStorage.getItem('gyroSelectedBuilding'); // Use unique key for Gyro
    } else {
        localStorage.clear(); // Clear all data if restaurant changed
        cart = [];
        selectedBuilding = null;
    }
    localStorage.setItem('currentRestaurantName', RESTAURANT_NAME);
    localStorage.setItem('currentRestaurantLogo', RESTAURANT_LOGO_URL);
    localStorage.setItem('deliveryTime', DELIVERY_TIME_RANGE); // Store the static delivery time


    // --- Helper Functions ---

    // Function to show custom modal alerts (used for general messages/errors)
    function showCustomModal(title, message) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalMessage) modalMessage.textContent = message;
        if (customModal) customModal.classList.add('active'); // Use active class to display modal
    }

    // Function to hide custom modal alerts
    function hideCustomModal() {
        if (customModal) customModal.classList.remove('active'); // Hide modal
    }

    // Save current cart state to local storage
    function saveCart() {
        localStorage.setItem('currentCart', JSON.stringify(cart));
    }

    // Update cart count and total in the UI
    function updateCartSummary() {
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.quantity * item.price;
        });

        if (cartCountSpan) cartCountSpan.textContent = totalItems;
        if (cartTotalSpan) cartTotalSpan.textContent = totalPrice.toFixed(2) + ' EGP';

        // Enable/disable checkout button based on cart items and selected location
        if (emptyCartMessage && checkoutBtn) {
            if (cart.length === 0 || !selectedBuilding) { // Disable if cart is empty OR no building is selected
                emptyCartMessage.style.display = 'block';
                checkoutBtn.disabled = true;
            } else {
                emptyCartMessage.style.display = 'none';
                checkoutBtn.disabled = false;
            }
        }
        saveCart(); // Save cart after every UI update
    }

    // Render cart items in the sidebar
    function renderCartItems() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = ''; // Clear existing items
        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';

            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                const itemIdentifier = item.id;
                cartItemDiv.dataset.itemIdentifier = itemIdentifier;

                cartItemDiv.innerHTML = `
                    <div class="cart-item-details">
                        <h4>${item.name} x ${item.quantity}</h4>
                        <p>${(item.price * item.quantity).toFixed(2)} EGP</p>
                    </div>
                    <button type="button" class="remove-item-btn" data-item-identifier="${itemIdentifier}"><i class="fas fa-trash-alt"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        updateCartSummary(); // Always update summary after rendering items
    }

    // Add item to cart logic
    function addItemToCart(itemToAdd) {
        const existingItemIndex = cart.findIndex(item => item.id === itemToAdd.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1; // Increment quantity if item exists
        } else {
            cart.push({ ...itemToAdd, quantity: 1 }); // Add new item with quantity 1
        }
        renderCartItems(); // Re-render cart UI
    }

    // Remove item from cart logic
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        renderCartItems(); // Re-render cart UI
    }

    // Render menu items into the specified container
    function renderMenuItems(items, container) {
        if (!container) {
            console.error('Menu container not found for rendering:', container);
            return;
        }
        container.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('menu-item-card');
            itemCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="item-image" onerror="this.src='https://placehold.co/250x250/CCC/333?text=Image+Error';">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price-add">
                        <span class="item-price">EGP ${item.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image-url="${item.imageUrl}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(itemCard);
        });

        // Attach event listeners for 'Add to Cart' buttons for newly rendered items
        container.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const { id, name, price, imageUrl } = event.currentTarget.dataset;
                addItemToCart({ id, name, price: parseFloat(price), imageUrl });
                cartSidebar.classList.add('open'); // Open cart sidebar on add
            });
        });
    }

    // Function to update the delivery location message on the main page
    function updateDeliveryLocationDisplay() {
        if (deliveryLocationMessage) {
            if (selectedBuilding) {
                deliveryLocationMessage.textContent = `Delivering to: ${selectedBuilding}`;
                deliveryLocationMessage.style.color = '#28a745'; // Green for confirmed location
            } else {
                deliveryLocationMessage.textContent = 'Choose your delivery location';
                deliveryLocationMessage.style.color = '#E44D3A'; // Red for unselected/default
            }
        }
    }


    // --- Event Listeners ---

    // Toggle cart sidebar visibility
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            cartSidebar.classList.toggle('open');
        });
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }

    // Handle clicks on remove buttons inside the cart
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const removeButton = event.target.closest('.remove-item-btn');
            if (removeButton) {
                const itemId = removeButton.dataset.itemIdentifier;
                removeFromCart(itemId);
            }
        });
    }

    // Checkout button click handler
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showCustomModal('Cart Empty', 'Your cart is empty. Please add items before checking out.');
                return;
            }
            if (!selectedBuilding) {
                showCustomModal('Location Required', 'Please select your delivery building on the map before checking out.');
                return;
            }
            localStorage.setItem('currentCart', JSON.stringify(cart));
            localStorage.setItem('gyroSelectedBuilding', selectedBuilding); // Save Gyro-specific building
            // Redirect to checkout.html
            window.location.href = 'checkout.html';
        });
    }

    // Handle generic modal OK button
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', hideCustomModal);
    }

    // Search functionality - filters all categories
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            // Filter and render for MEALS
            const filteredMeals = CATEGORY_MAP.meals.filter(item =>
                item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)
            );
            renderMenuItems(filteredMeals, mealsMenuContainer);

            // Filter and render for BURGER
            const filteredBurger = CATEGORY_MAP.burger.filter(item =>
                item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)
            );
            renderMenuItems(filteredBurger, burgerMenuContainer);

            // Filter and render for Picks
            const filteredPicks = CATEGORY_MAP.picks.filter(item =>
                item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)
            );
            renderMenuItems(filteredPicks, picksMenuContainer);
        });
    }
    
    // --- Campus Map Modal Logic ---
    if (changeAddressBtn && mapModal) {
        changeAddressBtn.addEventListener('click', () => {
            mapModal.classList.add('active'); // Show the map modal
            // Reset selection styling when opening, but retain actual selectedBuilding
            buildingMarkers.forEach(marker => marker.classList.remove('selected'));
            if (selectedBuilding) {
                const currentSelectedMarker = document.querySelector(`.building-marker[data-building="${selectedBuilding}"]`);
                if (currentSelectedMarker) {
                    currentSelectedMarker.classList.add('selected'); // Re-apply selected style
                }
                selectedLocationDisplay.textContent = `Selected: ${selectedBuilding}`;
                confirmLocationBtn.disabled = false;
            } else {
                selectedLocationDisplay.textContent = 'No building selected.';
                confirmLocationBtn.disabled = true;
            }
        });
    }

    if (closeMapModalBtn && mapModal) {
        closeMapModalBtn.addEventListener('click', () => {
            mapModal.classList.remove('active'); // Hide the map modal
        });
    }

    // Handle building marker clicks
    if (buildingMarkers) {
        buildingMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                // Remove 'selected' from all other markers
                buildingMarkers.forEach(m => m.classList.remove('selected'));
                // Add 'selected' to the clicked marker
                marker.classList.add('selected');
                selectedBuilding = marker.dataset.building;
                selectedLocationDisplay.textContent = `Selected: ${selectedBuilding}`;
                confirmLocationBtn.disabled = false; // Enable confirm button
            });
        });
    }

    // Confirm location button in map modal
    if (confirmLocationBtn) {
        confirmLocationBtn.addEventListener('click', () => {
            if (selectedBuilding) {
                localStorage.setItem('gyroSelectedBuilding', selectedBuilding); // Save to local storage for Gyro
                updateDeliveryLocationDisplay(); // Update the message on the main page
                mapModal.classList.remove('active'); // Hide the map modal
                updateCartSummary(); // Re-enable checkout button if cart has items
            } else {
                showCustomModal('Selection Required', 'Please select a building on the map.');
            }
        });
    }

    // Smooth scroll for left sidebar category links
    document.querySelectorAll('.left-sidebar-nav .category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = this.dataset.category;
            const targetElement = document.getElementById(categoryId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Update active class
            document.querySelectorAll('.left-sidebar-nav .category-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scroll for sub-navigation "Menu" link
    const subNavMenuLink = document.querySelector('.sub-navigation a[href="#menu"]');
    if (subNavMenuLink) {
        subNavMenuLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to the first menu section (MEALS)
            const targetElement = document.getElementById('meals');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Ensure 'Menu' link is active in sub-nav and the 'MEALS' category in left sidebar is active
            document.querySelectorAll('.sub-navigation a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.left-sidebar-nav .category-link').forEach(l => l.classList.remove('active'));
            const mealsCategoryLink = document.querySelector('.left-sidebar-nav .category-link[data-category="meals"]');
            if (mealsCategoryLink) mealsCategoryLink.classList.add('active');
        });
    }


    // --- Initial Render Calls ---
    renderMenuItems(CATEGORY_MAP.meals, mealsMenuContainer);
    renderMenuItems(CATEGORY_MAP.burger, burgerMenuContainer);
    renderMenuItems(CATEGORY_MAP.picks, picksMenuContainer);
    
    updateCartSummary(); // Initialize cart summary
    renderCartItems(); // Render initial cart items in sidebar
    updateDeliveryLocationDisplay(); // Update delivery location message on load
});
