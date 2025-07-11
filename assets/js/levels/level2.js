// Level 2 - Registration Form

window.Level2 = {
    getContent() {
        return `
            <div class="level-content">
                <h2>Level 2: Registration Form</h2>
                <form id="registrationForm">
                    <div>
                        <label for="regUsername">Username:</label>
                        <input type="text" id="regUsername" name="username" required>
                    </div>
                    <div>
                        <label for="regEmail">Email:</label>
                        <input type="email" id="regEmail" name="email" required>
                    </div>
                    <div>
                        <label for="regPassword">Password:</label>
                        <input type="password" id="regPassword" name="password" required>
                    </div>
                    <div>
                        <label for="regConfirmPassword">Confirm Password:</label>
                        <input type="password" id="regConfirmPassword" name="confirmPassword" required>
                    </div>
                    <button type="submit" id="registerBtn">Register</button>
                </form>
                <div id="registrationResult"></div>
            </div>
        `;
    },

    getDescription() {
        return `
            <h3>Level 2 - Registration Form</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Positive:</h5>
            <ul>
                <li>Valid data: testuser/test@email.com/password123</li>
                <li>Expected: "Registration successful!" message</li>
            </ul>
            
            <h5>Negative:</h5>
            <ul>
                <li>Empty required fields</li>
                <li>Invalid email format</li>
                <li>Password mismatch</li>
                <li>Username already exists</li>
                <li>Expected: Specific error messages</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Test each field validation separately</li>
                <li>Verify password confirmation logic</li>
                <li>Check email format validation</li>
                <li>Test form reset functionality</li>
                <li>Validate required field indicators</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Complex form validation</li>
                <li>Email format testing</li>
                <li>Password confirmation logic</li>
                <li>Multiple field coordination</li>
                <li>Advanced error handling</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 2 - Registration Form');

        const registrationForm = document.getElementById('registrationForm');
        const registrationResult = document.getElementById('registrationResult');

        if (registrationForm && registrationResult) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const username = document.getElementById('regUsername').value.trim();
                const email = document.getElementById('regEmail').value.trim();
                const password = document.getElementById('regPassword').value.trim();
                const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

                // Clear previous results
                registrationResult.innerHTML = '';
                registrationResult.className = '';

                // Validate inputs
                if (!username || !email || !password || !confirmPassword) {
                    this.showResult('Please fill in all fields', 'error', registrationResult);
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    this.showResult('Please enter a valid email address', 'error', registrationResult);
                    return;
                }

                // Check password confirmation
                if (password !== confirmPassword) {
                    this.showResult('Passwords do not match', 'error', registrationResult);
                    return;
                }

                // Check if username already exists
                if (username === 'admin') {
                    this.showResult('Username already exists', 'error', registrationResult);
                    return;
                }

                // Success
                this.showResult('Registration successful!', 'success', registrationResult);
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