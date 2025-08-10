document.addEventListener('DOMContentLoaded', () => {
    // Modal variables
    const mapModal = document.getElementById('mapModal');
    const uniMap = document.getElementById('uniMap');
    const selectedLocationText = document.getElementById('selectedLocation');
    const confirmLocationBtn = document.getElementById('confirmLocationBtn');
    const mapPins = document.querySelectorAll('.map-pin');

    // Manual location elements
    const manualLocationInput = document.getElementById('manualLocationInput');
    const confirmManualLocationBtn = document.getElementById('confirmManualLocationBtn');
    const manualLocationMessage = document.getElementById('manualLocationMessage');
    
    // Function to open the map modal
    window.openMap = function() {
        mapModal.style.display = 'flex';
    };

    // Function to close the map modal
    window.closeMap = function() {
        mapModal.style.display = 'none';
        selectedLocationText.textContent = '';
        confirmLocationBtn.style.display = 'none';
        manualLocationMessage.textContent = ''; // Clear manual message on close
    };

    // Handle pin clicks on the map
    mapPins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the map click event from firing
            const locationName = e.target.getAttribute('data-location');
            selectedLocationText.textContent = `You've selected: ${locationName}`;
            confirmLocationBtn.style.display = 'block';
        });
    });

    // Handle confirm button click (for map selection)
    confirmLocationBtn.addEventListener('click', () => {
        const locationName = selectedLocationText.textContent.replace("You've selected: ", '');
        if (locationName) {
            alert(`Your order will be delivered to: ${locationName}`);
            // In a real project, this would redirect to the menu page.
            // window.location.href = 'menu.html?location=' + encodeURIComponent(locationName);
            closeMap();
        }
    });

    // Handle clicks on the map image itself for "out of delivery zone" logic
    uniMap.addEventListener('click', (e) => {
        // This is a creative way to check if the student is "out of zone"
        selectedLocationText.textContent = "Location is outside the MIU delivery zone. Please select a building on campus.";
        confirmLocationBtn.style.display = 'none';
    });

    // Handle manual location confirmation
    confirmManualLocationBtn.addEventListener('click', () => {
        const manualLocation = manualLocationInput.value.trim();
        if (manualLocation) {
            alert(`You manually entered: ${manualLocation}. Your order will be delivered there.`);
            manualLocationMessage.textContent = `Location confirmed: ${manualLocation}`;
            manualLocationMessage.style.color = '#28a745'; // Green for success
            // In a real project, you'd process this location for delivery
            manualLocationInput.value = ''; // Clear input
        } else {
            manualLocationMessage.textContent = 'Please enter a location.';
            manualLocationMessage.style.color = '#dc3545'; // Red for error
        }
    });

    // Close the modal if the user clicks the close button or outside of it
    document.querySelector('.close-button').onclick = closeMap;
    window.onclick = function(event) {
        if (event.target == mapModal) {
            closeMap();
        }
    };
});
