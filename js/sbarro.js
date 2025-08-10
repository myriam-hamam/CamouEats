document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from local storage
    let cart = JSON.parse(localStorage.getItem('sbarroCart')) || [];
    updateCartCountDisplay();

    // Event listeners for category links in the sidebar
    document.querySelectorAll('.left-sidebar-nav .category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor link behavior
            const category = this.dataset.category;
            showCategory(category);

            // Update active state in sidebar
            document.querySelectorAll('.left-sidebar-nav .category-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('disabled')) {
                return; // Do nothing if button is disabled (e.g., placeholder)
            }
            const itemName = this.dataset.itemName;
            const itemPrice = parseFloat(this.dataset.itemPrice);
            const itemImage = this.dataset.itemImage;
            addItemToCart(itemName, itemPrice, itemImage);
        });
    });

    // Function to display specific menu category
    function showCategory(category) {
        document.querySelectorAll('.menu-category').forEach(catSection => {
            catSection.classList.remove('active');
        });
        const activeCategory = document.getElementById(category);
        if (activeCategory) {
            activeCategory.classList.add('active');
        }
    }

    // Show the first category by default on load
    const firstCategoryLink = document.querySelector('.left-sidebar-nav .category-link');
    if (firstCategoryLink) {
        firstCategoryLink.classList.add('active');
        showCategory(firstCategoryLink.dataset.category);
    }

    // Function to add item to cart
    function addItemToCart(name, price, image) {
        const existingItemIndex = cart.findIndex(item => item.name === name);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        localStorage.setItem('sbarroCart', JSON.stringify(cart)); // Save to local storage
        updateCartCountDisplay();
        showConfirmationMessage(`${name} added to cart!`);
    }

    // Function to update cart count display in header
    function updateCartCountDisplay() {
        const cartCountElement = document.querySelector('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            if (totalItems > 0) {
                cartCountElement.classList.remove('hidden');
            } else {
                cartCountElement.classList.add('hidden');
            }
        }
    }

    // Function to show a temporary confirmation message
    function showConfirmationMessage(message) {
        const confirmationMessageElement = document.querySelector('.confirmation-message');
        if (confirmationMessageElement) {
            confirmationMessageElement.textContent = message;
            confirmationMessageElement.classList.add('show');
            setTimeout(() => {
                confirmationMessageElement.classList.remove('show');
            }, 3000);
        }
    }

    // Smooth scroll for "Order Now" button
    const orderNowBtn = document.querySelector('.order-now-btn');
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
