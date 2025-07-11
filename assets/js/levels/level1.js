// Level 1 - Login Form

window.Level1 = {
    getContent() {
        return `
            <div class="level-content">
                <h2>Level 1: Login Form</h2>
                <form id="loginForm">
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" id="loginBtn">Login</button>
                </form>
                <div id="loginResult"></div>
            </div>
        `;
    },

    getDescription() {
        return `
            <h3>Level 1 - Login Form</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Positive:</h5>
            <ul>
                <li>Valid credentials: admin/password123</li>
                <li>Expected: "Welcome, admin!" message</li>
            </ul>
            
            <h5>Negative:</h5>
            <ul>
                <li>Empty username/password</li>
                <li>Invalid credentials</li>
                <li>SQL injection attempts</li>
                <li>Expected: Error messages displayed</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Use ID selectors for reliable element location</li>
                <li>Wait for elements to be visible before interaction</li>
                <li>Clear fields before entering data</li>
                <li>Verify error messages for negative cases</li>
                <li>Check for proper form validation behavior</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Element identification strategies</li>
                <li>Input field automation</li>
                <li>Form submission handling</li>
                <li>Assertion techniques</li>
                <li>Negative testing approaches</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 1 - Login Form');

        const loginForm = document.getElementById('loginForm');
        const loginResult = document.getElementById('loginResult');

        if (loginForm && loginResult) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();

                // Clear previous results
                loginResult.innerHTML = '';
                loginResult.className = '';

                // Validate inputs
                if (!username || !password) {
                    this.showResult('Please fill in all fields', 'error', loginResult);
                    return;
                }

                // Check credentials
                if (username === 'admin' && password === 'password123') {
                    this.showResult('Welcome, admin!', 'success', loginResult);
                } else {
                    this.showResult('Invalid username or password', 'error', loginResult);
                }
            });
        }
    },

    showResult(message, type, resultElement) {
        // Use LevelManager's shared utility
        if (window.LevelManager) {
            LevelManager.showResult(message, type, resultElement);
        }
    }
};