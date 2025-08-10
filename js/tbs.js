document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded - tbs.js starting...");

    const orderLink = document.getElementById('order-link');
    const promoBanner = document.getElementById('promo-banner-section');
    const menuSection = document.getElementById('menu-section');
    const categoryLinks = document.querySelectorAll('.category-link');
    const menuCategories = document.querySelectorAll('.menu-category'); // All section.menu-category elements
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountSpan = document.querySelector('.cart-count');

    // Restaurant specific details for localStorage (for the checkout page)
    const RESTAURANT_NAME = "TBS - The Bakery Shop";
    const RESTAURANT_LOGO = "images/tbs_logo.jpg"; // Path relative to tbs.html
    const DELIVERY_TIME = "30-45 mins";

    // Initialize cart from localStorage or create an empty array
    let cart = JSON.parse(localStorage.getItem('currentCart')) || [];
    console.log("Initial cart loaded from localStorage ('currentCart'):", cart);
    updateCartCount();

    // Function to show a confirmation message (custom implementation)
    function showConfirmationMessage(message) {
        let messageBox = document.querySelector('.confirmation-message');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.className = 'confirmation-message';
            document.body.appendChild(messageBox);
            console.log("Confirmation message box created.");
        }
        messageBox.textContent = message;
        messageBox.classList.add('show');

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageBox.classList.remove('show');
            console.log("Confirmation message hidden.");
        }, 3000);
    }

    // Function to update cart count display
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log("Updating cart count. Total items:", totalItems);
        if (totalItems > 0) {
            cartCountSpan.textContent = totalItems;
            cartCountSpan.classList.remove('hidden');
        } else {
            cartCountSpan.classList.add('hidden');
        }
    }

    // --- Menu Display by Default & Category Activation ---
    // Ensure menu section is visible and promo is hidden on page load
    // The banner is now visible in HTML by default, so we don't need to touch its 'hidden' class here.
    menuSection.classList.remove('hidden'); // Ensure menu section itself is visible
    console.log("Menu section ensured visible on load.");

    // Hide all menu categories content initially
    menuCategories.forEach(category => category.classList.remove('active')); // Use remove('active') as per CSS

    // Activate the first menu category link and show its content on page load
    if (categoryLinks.length > 0) {
        // Remove 'active' from all sidebar links first
        categoryLinks.forEach(link => link.classList.remove('active'));
        // Set the first sidebar link as active
        categoryLinks[0].classList.add('active');

        // Get the ID of the first category's content (e.g., 'iced-drinks')
        const firstCategoryId = categoryLinks[0].dataset.category;
        const firstCategoryElement = document.getElementById(firstCategoryId);

        // Show the content of the first category by adding the 'active' class
        if (firstCategoryElement) {
            firstCategoryElement.classList.add('active'); // Add 'active' class to display content
            console.log(`Initial display: Activated and displayed content for category: ${firstCategoryId}`);
        }
    }


    // Event listener for the "Order" link (now just scrolls to menu)
    if (orderLink) {
        orderLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            menuSection.scrollIntoView({ behavior: 'smooth' });
            console.log("Order link clicked, scrolled to menu section.");
        });
    }

    // Event listeners for category links in the sidebar
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            console.log(`Category link clicked: ${link.dataset.category}`);

            // Remove active class from all category links in the sidebar
            categoryLinks.forEach(item => item.classList.remove('active'));
            // Add active class to the clicked link
            e.currentTarget.classList.add('active');

            const targetCategory = e.currentTarget.dataset.category;

            // Hide all menu category content sections by removing their 'active' class
            menuCategories.forEach(category => category.classList.remove('active'));

            // Show the content of the selected category by adding the 'active' class
            const activeCategoryElement = document.getElementById(targetCategory);
            if (activeCategoryElement) {
                activeCategoryElement.classList.add('active'); // Add 'active' class to display content
                // Scroll to the category title in the main menu area for better UX
                setTimeout(() => {
                    const headerOffset = document.querySelector('.tbs-header').offsetHeight || 70; // Get actual header height or default
                    const scrollPosition = activeCategoryElement.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20; // Added 20px margin
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }, 100); // Small delay to allow element to render before scrolling
            }
        });
    });

    // Intersection Observer to update active category on scroll (for automatic sidebar highlight)
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '-20% 0px -60% 0px', // Adjust as needed to activate when section is prominent
        threshold: 0.1 // When 10% of the target is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                // Only change active if it's not already active or if a different category is now prominent
                const currentActiveLink = document.querySelector(`.category-link.active`);
                if (!currentActiveLink || currentActiveLink.getAttribute('href') !== `#${id}`) {
                     categoryLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    menuCategories.forEach(category => {
        observer.observe(category);
    });

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log("Add to cart button clicked!");
            const itemName = e.currentTarget.dataset.itemName;
            const itemPrice = parseFloat(e.currentTarget.dataset.itemPrice);
            const itemImage = e.currentTarget.dataset.itemImage; // Image URL for checkout page

            if (itemName && !isNaN(itemPrice) && itemImage) {
                console.log(`Attempting to add: ${itemName}, Price: ${itemPrice}, Image: ${itemImage}`);
                // Check if item already exists in cart
                const existingItemIndex = cart.findIndex(item => item.name === itemName);

                if (existingItemIndex > -1) {
                    // Item exists, increment quantity
                    cart[existingItemIndex].quantity += 1;
                    showConfirmationMessage(`${itemName} quantity updated!`);
                    console.log(`Updated quantity for "${itemName}". New cart:`, cart);
                } else {
                    // Item does not exist, add new
                    cart.push({ name: itemName, price: itemPrice, quantity: 1, imageUrl: itemImage });
                    showConfirmationMessage(`${itemName} added to cart!`);
                    console.log(`Added new item "${itemName}". New cart:`, cart);
                }

                // Save updated cart to localStorage
                localStorage.setItem('currentCart', JSON.stringify(cart));
                // Also save restaurant details for the checkout page (if not already set or if different)
                localStorage.setItem('currentRestaurantName', RESTAURANT_NAME);
                localStorage.setItem('currentRestaurantLogo', RESTAURANT_LOGO);
                localStorage.setItem('deliveryTime', DELIVERY_TIME);

                updateCartCount(); // Update the cart count in the header
            } else {
                console.error("Error: Item name, price, or image is missing/invalid for add to cart.");
            }
        });
    });
});