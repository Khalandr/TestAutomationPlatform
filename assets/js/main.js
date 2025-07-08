// TestAutomationPlatform - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('TestAutomationPlatform loaded');

    // Initialize level switching
    initializeLevelSwitching();
});

function initializeLevelSwitching() {
    const levelButtons = document.querySelectorAll('.level-btn');

    console.log('Found', levelButtons.length, 'level buttons');

    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const levelNumber = this.getAttribute('data-level');
            console.log('Level button clicked:', levelNumber);

            // Remove active class from all buttons
            levelButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Switch level content
            loadLevelContent(levelNumber);
            loadLevelDescription(levelNumber);
        });
    });

    // Initialize with Level 1
    loadLevelContent('1');
    loadLevelDescription('1');
}

function loadLevelContent(levelNumber) {
    const mainContent = document.querySelector('.main-content');

    let content = '';

    switch(levelNumber) {
        case '1':
            content = `
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
            break;
        case '2':
            content = `
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
            break;
        default:
            content = `
                <div class="level-content">
                    <h2>Level ${levelNumber}</h2>
                    <p>This level is coming soon!</p>
                    <p>Level ${levelNumber} content will be implemented here.</p>
                </div>
            `;
    }

    mainContent.innerHTML = content;

    // Reinitialize form functionality for the current level
    if (levelNumber === '1') {
        initializeLoginForm();
    } else if (levelNumber === '2') {
        initializeRegistrationForm();
    }
}

function loadLevelDescription(levelNumber) {
    const sidebarRight = document.querySelector('.sidebar-right');

    let description = '';

    switch(levelNumber) {
        case '1':
            description = `
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
            break;
        case '2':
            description = `
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
            break;
        default:
            description = `
                <h3>Level ${levelNumber}</h3>
                <p>Description for Level ${levelNumber} coming soon!</p>
                <p>This level will include specific test automation challenges and scenarios.</p>
            `;
    }

    sidebarRight.innerHTML = description;
}

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginResult = document.getElementById('loginResult');

    if (loginForm && loginResult) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Clear previous results
            loginResult.innerHTML = '';
            loginResult.className = '';

            // Validate inputs
            if (!username || !password) {
                showResult('Please fill in all fields', 'error', loginResult);
                return;
            }

            // Check credentials
            if (username === 'admin' && password === 'password123') {
                showResult('Welcome, admin!', 'success', loginResult);
            } else {
                showResult('Invalid username or password', 'error', loginResult);
            }
        });
    }
}

function initializeRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    const registrationResult = document.getElementById('registrationResult');

    if (registrationForm && registrationResult) {
        registrationForm.addEventListener('submit', function(e) {
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
                showResult('Please fill in all fields', 'error', registrationResult);
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showResult('Please enter a valid email address', 'error', registrationResult);
                return;
            }

            // Check password confirmation
            if (password !== confirmPassword) {
                showResult('Passwords do not match', 'error', registrationResult);
                return;
            }

            // Check if username already exists
            if (username === 'admin') {
                showResult('Username already exists', 'error', registrationResult);
                return;
            }

            // Success
            showResult('Registration successful!', 'success', registrationResult);
        });
    }
}

function showResult(message, type, resultElement) {
    if (resultElement) {
        resultElement.innerHTML = message;
        resultElement.className = `result ${type}`;
    }
}