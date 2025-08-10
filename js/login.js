document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Function to display an error message
    function displayError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    // Function to clear an error message
    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Event listener for form submission
    loginForm.addEventListener('submit', (event) => {
        // Prevent default form submission to handle validation manually
        event.preventDefault();

        let isValid = true;

        // Clear previous errors
        clearError(emailError);
        clearError(passwordError);

        // Validate Email
        const email = loginEmailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            displayError(emailError, 'Email is required.');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            displayError(emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Password
        const password = loginPasswordInput.value;
        if (password === '') {
            displayError(passwordError, 'Password is required.');
            isValid = false;
        } else if (password.length < 6) {
            displayError(passwordError, 'Password must be at least 6 characters long.');
            isValid = false;
        }

        // If all validations pass, proceed with login (e.g., redirect or send to backend)
        if (isValid) {
            // In a real application, you would send this data to a server for authentication.
            // For this demo, we'll simulate a successful login and redirect.
            alert('Login successful! Redirecting to order options.'); // This alert should appear if validation passes
            window.location.href = 'order_now.html';
        }
    });
});