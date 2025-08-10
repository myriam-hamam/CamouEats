// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all the restaurant cards
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    // Loop through each card and add a click event listener
    restaurantCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            
            // Get the data attributes from the clicked card
            const restaurantId = card.dataset.id;
            const restaurantName = card.dataset.name;
            const restaurantLogo = card.dataset.logo;

            // Save the restaurant's information to localStorage
            // This allows the restaurant.html page to know which restaurant to display
            localStorage.setItem('currentRestaurantId', restaurantId);
            localStorage.setItem('currentRestaurantName', restaurantName);
            localStorage.setItem('currentRestaurantLogo', restaurantLogo);

            // Navigate to the single, dynamic restaurant page
            window.location.href = 'restaurant.html';
        });
    });
});
