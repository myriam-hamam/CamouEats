document.addEventListener('DOMContentLoaded', () => {
    // Modal variables
    const mapModal = document.getElementById('mapModal');
    const selectedLocationText = document.getElementById('selectedLocation');
    const confirmLocationBtn = document.getElementById('confirmLocationBtn');
    const mapPins = document.querySelectorAll('.map-pin');
    const uniMap = document.getElementById('uniMap');

    // Function to open the map modal
    window.openMapModal = function() {
        mapModal.style.display = 'flex';
    };

    // Function to close the map modal
    window.closeMap = function() {
        mapModal.style.display = 'none';
        selectedLocationText.textContent = '';
        confirmLocationBtn.style.display = 'none';
        
        // Reset pin styles
        mapPins.forEach(pin => pin.classList.remove('selected'));
    };

    // Handle pin clicks on the map
    mapPins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            // Remove 'selected' class from all pins
            mapPins.forEach(p => p.classList.remove('selected'));
            // Add 'selected' class to the clicked pin
            e.target.classList.add('selected');
            
            const locationName = e.target.getAttribute('data-location');
            selectedLocationText.textContent = `You've selected: ${locationName}`;
            confirmLocationBtn.style.display = 'block';
        });
    });

    // Handle confirm button click (for map selection)
    confirmLocationBtn.addEventListener('click', () => {
        const locationName = selectedLocationText.textContent.replace("You've selected: ", '');
        if (locationName) {
            // Optional: You can store the location in localStorage for later use
            localStorage.setItem('deliveryLocation', locationName);
            alert(`Your order will be delivered to: ${locationName}`);
            // Redirect to login.html after confirmation
            window.location.href = 'login.html'; 
        }
    });

    // Handle clicks on the map image itself for "out of delivery zone" logic
    uniMap.addEventListener('click', (e) => {
        // Only trigger this if a pin wasn't clicked
        if (!e.target.classList.contains('map-pin')) {
            selectedLocationText.textContent = "Location is outside the MIU delivery zone. Please select a building on campus.";
            confirmLocationBtn.style.display = 'none';
            mapPins.forEach(pin => pin.classList.remove('selected'));
        }
    });

    // Close the modal if the user clicks the close button or outside of it
    document.querySelector('.close-button').onclick = closeMap;
    window.onclick = function(event) {
        if (event.target === mapModal) {
            closeMap();
        }
    };
});