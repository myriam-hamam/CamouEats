document.addEventListener('DOMContentLoaded', () => {
    // Get references to the buttons
    const insideCampusBtn = document.getElementById('insideCampusBtn');
    const outsideCampusBtn = document.getElementById('outsideCampusBtn');

    // Add event listener for "Inside the University" button
    if (insideCampusBtn) {
        insideCampusBtn.addEventListener('click', () => {
            // Redirect to the inside.html page
            window.location.href = 'inside.html';
        });
    }

    // Add event listener for "Outside the University" button
    if (outsideCampusBtn) {
        outsideCampusBtn.addEventListener('click', () => {
            // Redirect to the outside.html page
            window.location.href = 'outside.html';
        });
    }
});