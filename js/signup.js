document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const signupEmailInput = document.getElementById('signupEmail'); // Renamed for clarity
    const signupPasswordInput = document.getElementById('signupPassword'); // Renamed for clarity
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const signupEmailError = document.getElementById('signupEmailError'); // Renamed for clarity
    const signupPasswordError = document.getElementById('signupPasswordError'); // Renamed for clarity
    const confirmPasswordError = document.getElementById('confirmPasswordError');

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
    signupForm.addEventListener('submit', (event) => {
        // Prevent default form submission to handle validation manually
        event.preventDefault();

        let isValid = true;

        // Clear previous errors
        clearError(firstNameError);
        clearError(lastNameError);
        clearError(signupEmailError);
        clearError(signupPasswordError);
        clearError(confirmPasswordError);

        // Validate First Name
        const firstName = firstNameInput.value.trim();
        if (firstName === '') {
            displayError(firstNameError, 'First name is required.');
            isValid = false;
        }

        // Validate Last Name
        const lastName = lastNameInput.value.trim();
        if (lastName === '') {
            displayError(lastNameError, 'Last name is required.');
            isValid = false;
        }

        // Validate Email
        const email = signupEmailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            displayError(signupEmailError, 'Email is required.');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            displayError(signupEmailError, 'Please enter a valid email address (e.g., your@miu.edu.eg).');
            isValid = false;
        }

        // Validate Password
        const password = signupPasswordInput.value;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least 6 chars, 1 letter, 1 number
        if (password === '') {
            displayError(signupPasswordError, 'Password is required.');
            isValid = false;
        } else if (password.length < 6) {
            displayError(signupPasswordError, 'Password must be at least 6 characters long.');
            isValid = false;
        } else if (!passwordPattern.test(password)) {
            displayError(signupPasswordError, 'Password must contain at least one letter and one number.');
            isValid = false;
        }

        // Validate Confirm Password
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword === '') {
            displayError(confirmPasswordError, 'Please confirm your password.');
            isValid = false;
        } else if (password !== confirmPassword) {
            displayError(confirmPasswordError, 'Passwords do not match.');
            isValid = false;
        }

        // If all validations pass, proceed with registration (e.g., redirect or send to backend)
        if (isValid) {
            // In a real application, you would send this data to a server for registration.
            // For this demo, we'll simulate a successful registration and redirect.
            alert('Registration successful! Redirecting to order options.'); // Using alert for final confirmation before redirect
            window.location.href = 'order_now.html';
        }
    });
});
