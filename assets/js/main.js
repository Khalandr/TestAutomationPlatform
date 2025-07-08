// TestAutomationPlatform - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('TestAutomationPlatform loaded');

    // Initialize login form functionality
    initializeLoginForm();
});

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginResult = document.getElementById('loginResult');

    if (loginForm && loginResult) {
        console.log('Login form found, adding event listener');

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            console.log('Username:', username, 'Password length:', password.length);

            // Clear previous results
            loginResult.innerHTML = '';
            loginResult.className = '';

            // Validate inputs
            if (!username || !password) {
                console.log('Empty fields detected');
                showResult('Please fill in all fields', 'error');
                return;
            }

            // Check credentials
            if (username === 'admin' && password === 'password123') {
                console.log('Valid credentials');
                showResult('Welcome, admin!', 'success');
            } else {
                console.log('Invalid credentials');
                showResult('Invalid username or password', 'error');
            }
        });
    } else {
        console.log('Login form or result div not found');
    }
}

function showResult(message, type) {
    const loginResult = document.getElementById('loginResult');
    if (loginResult) {
        console.log('Showing result:', message, type);
        loginResult.innerHTML = message;
        loginResult.className = `result ${type}`;
    } else {
        console.log('loginResult element not found');
    }
}