// Level 6 - Modal Dialogs & Popups

window.Level6 = {
    activeModal: null,
    modalStack: [], // For nested modals
    lastFocusedElement: null,
    userData: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" }
    ],

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 6: Modal Dialogs & Popups</h2>
                
                <!-- Modal Triggers Section -->
                <div class="modal-triggers">
                    <div class="trigger-section">
                        <h3>Confirmation Modals</h3>
                        <div class="button-group">
                            <button type="button" id="deleteConfirmBtn" class="danger-btn">Delete Item</button>
                            <button type="button" id="saveConfirmBtn" class="primary-btn">Save Changes</button>
                            <button type="button" id="logoutConfirmBtn" class="warning-btn">Logout</button>
                        </div>
                    </div>

                    <div class="trigger-section">
                        <h3>Information Modals</h3>
                        <div class="button-group">
                            <button type="button" id="successModalBtn" class="success-btn">Show Success</button>
                            <button type="button" id="errorModalBtn" class="danger-btn">Show Error</button>
                            <button type="button" id="infoModalBtn" class="info-btn">Show Info</button>
                            <button type="button" id="warningModalBtn" class="warning-btn">Show Warning</button>
                        </div>
                    </div>

                    <div class="trigger-section">
                        <h3>Complex Modals</h3>
                        <div class="button-group">
                            <button type="button" id="settingsModalBtn" class="secondary-btn">Settings</button>
                            <button type="button" id="userFormModalBtn" class="primary-btn">Add User</button>
                            <button type="button" id="helpModalBtn" class="info-btn">Help & Support</button>
                        </div>
                    </div>
                </div>

                <!-- User List for Deletion Demo -->
                <div class="user-list-section">
                    <h3>User Management <span class="subtitle">(Click delete to test confirmation)</span></h3>
                    <div class="user-list" id="userList">
                        ${this.renderUserList()}
                    </div>
                </div>

                <!-- Results Section -->
                <div class="results-section">
                    <h3>Action Results</h3>
                    <div id="actionResults" class="action-results">
                        <p class="placeholder">Modal actions and results will appear here...</p>
                    </div>
                </div>

                <!-- Modal Container -->
                <div id="modalOverlay" class="modal-overlay" style="display: none;">
                    <div id="modalContainer" class="modal-container">
                        <div class="modal-header">
                            <h4 id="modalTitle"></h4>
                            <button type="button" id="modalCloseBtn" class="modal-close" aria-label="Close modal">&times;</button>
                        </div>
                        <div class="modal-body" id="modalBody"></div>
                        <div class="modal-footer" id="modalFooter"></div>
                    </div>
                </div>

                <div id="modalResult"></div>
            </div>
        `;
    },

    renderUserList() {
        return this.userData.map(user => `
            <div class="user-item" data-user-id="${user.id}">
                <div class="user-info">
                    <span class="user-name">${user.name}</span>
                    <span class="user-email">${user.email}</span>
                    <span class="user-role">${user.role}</span>
                </div>
                <div class="user-actions">
                    <button type="button" class="edit-user-btn" data-user-id="${user.id}">Edit</button>
                    <button type="button" class="delete-user-btn danger-btn" data-user-id="${user.id}">Delete</button>
                </div>
            </div>
        `).join('');
    },

    getDescription() {
        return `
            <h3>Level 6 - Modal Dialogs & Popups</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Confirmation Modals:</h5>
            <ul>
                <li>Delete confirmation with Yes/No options</li>
                <li>Save changes confirmation dialog</li>
                <li>Logout confirmation with cancel option</li>
                <li>Individual user deletion from list</li>
            </ul>
            
            <h5>Information Modals:</h5>
            <ul>
                <li>Success message with OK button</li>
                <li>Error notification with retry option</li>
                <li>Info modal with additional details</li>
                <li>Warning alerts with acknowledgment</li>
            </ul>
            
            <h5>Complex Modals:</h5>
            <ul>
                <li>Settings modal with form inputs</li>
                <li>Add user form with validation</li>
                <li>Help modal with nested content</li>
                <li>Nested modals (modal opening another modal)</li>
            </ul>
            
            <h5>Interaction Testing:</h5>
            <ul>
                <li>ESC key to close modals</li>
                <li>Click overlay to close (when enabled)</li>
                <li>Focus trapping within modal</li>
                <li>Tab navigation through modal elements</li>
                <li>Return focus to trigger element after close</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Wait for modal to appear before interacting</li>
                <li>Verify modal content and buttons</li>
                <li>Test keyboard navigation (TAB, ESC)</li>
                <li>Check focus management and accessibility</li>
                <li>Verify overlay click behavior</li>
                <li>Test nested modal scenarios</li>
                <li>Validate action results after modal close</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Modal dialog automation</li>
                <li>Overlay and backdrop handling</li>
                <li>Focus management testing</li>
                <li>Keyboard interaction testing</li>
                <li>Complex decision flow automation</li>
                <li>Form validation within modals</li>
                <li>Nested modal navigation</li>
                <li>Accessibility testing techniques</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 6 - Modal Dialogs & Popups');

        this.activeModal = null;
        this.modalStack = [];
        this.lastFocusedElement = null;
        this.bindEvents();
        this.setupKeyboardHandlers();
    },

    bindEvents() {
        // Main modal trigger buttons
        document.getElementById('deleteConfirmBtn')?.addEventListener('click', () => {
            this.showDeleteConfirmation('general item');
        });

        document.getElementById('saveConfirmBtn')?.addEventListener('click', () => {
            this.showSaveConfirmation();
        });

        document.getElementById('logoutConfirmBtn')?.addEventListener('click', () => {
            this.showLogoutConfirmation();
        });

        document.getElementById('successModalBtn')?.addEventListener('click', () => {
            this.showSuccessModal();
        });

        document.getElementById('errorModalBtn')?.addEventListener('click', () => {
            this.showErrorModal();
        });

        document.getElementById('infoModalBtn')?.addEventListener('click', () => {
            this.showInfoModal();
        });

        document.getElementById('warningModalBtn')?.addEventListener('click', () => {
            this.showWarningModal();
        });

        document.getElementById('settingsModalBtn')?.addEventListener('click', () => {
            this.showSettingsModal();
        });

        document.getElementById('userFormModalBtn')?.addEventListener('click', () => {
            this.showUserFormModal();
        });

        document.getElementById('helpModalBtn')?.addEventListener('click', () => {
            this.showHelpModal();
        });

        // User list actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-user-btn')) {
                const userId = parseInt(e.target.getAttribute('data-user-id'));
                const user = this.userData.find(u => u.id === userId);
                this.showDeleteUserConfirmation(user);
            }

            if (e.target.classList.contains('edit-user-btn')) {
                const userId = parseInt(e.target.getAttribute('data-user-id'));
                const user = this.userData.find(u => u.id === userId);
                this.showEditUserModal(user);
            }
        });

        // Modal close handlers
        document.getElementById('modalCloseBtn')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') {
                this.closeModal();
            }
        });
    },

    setupKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            if (this.activeModal) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.closeModal();
                }

                if (e.key === 'Tab') {
                    this.handleTabNavigation(e);
                }
            }
        });
    },

    showModal(config) {
        // Store last focused element
        this.lastFocusedElement = document.activeElement;

        // Add to modal stack
        this.modalStack.push(config);
        this.activeModal = config;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Setup modal content
        document.getElementById('modalTitle').textContent = config.title;
        document.getElementById('modalBody').innerHTML = config.body;
        document.getElementById('modalFooter').innerHTML = config.footer;

        // Apply theme
        const modalContainer = document.getElementById('modalContainer');
        modalContainer.className = `modal-container ${config.theme || 'default'}`;

        // Show modal
        const overlay = document.getElementById('modalOverlay');
        overlay.style.display = 'flex';

        // Focus first interactive element
        setTimeout(() => {
            this.focusFirstElement();
        }, 100);
    },

    closeModal() {
        if (!this.activeModal) return;

        // Remove from stack
        this.modalStack.pop();
        this.activeModal = this.modalStack.length > 0 ? this.modalStack[this.modalStack.length - 1] : null;

        // Restore body scroll if no more modals
        if (this.modalStack.length === 0) {
            document.body.style.overflow = '';
        }

        // Hide overlay if no more modals
        if (this.modalStack.length === 0) {
            document.getElementById('modalOverlay').style.display = 'none';
        }

        // Return focus
        if (this.lastFocusedElement && this.modalStack.length === 0) {
            this.lastFocusedElement.focus();
            this.lastFocusedElement = null;
        }
    },

    focusFirstElement() {
        const modal = document.getElementById('modalContainer');
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    },

    handleTabNavigation(e) {
        const modal = document.getElementById('modalContainer');
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    },

    // Specific Modal Implementations
    showDeleteConfirmation(itemName) {
        this.showModal({
            title: 'Confirm Deletion',
            theme: 'danger',
            body: `
                <div class="modal-icon">⚠️</div>
                <p>Are you sure you want to delete this ${itemName}?</p>
                <p class="warning-text">This action cannot be undone.</p>
            `,
            footer: `
                <button type="button" class="cancel-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="danger-btn" onclick="Level6.confirmDelete('${itemName}')">Delete</button>
            `
        });
    },

    showDeleteUserConfirmation(user) {
        this.showModal({
            title: 'Delete User',
            theme: 'danger',
            body: `
                <div class="modal-icon">⚠️</div>
                <p>Are you sure you want to delete user <strong>${user.name}</strong>?</p>
                <div class="user-details">
                    <p>Email: ${user.email}</p>
                    <p>Role: ${user.role}</p>
                </div>
                <p class="warning-text">This action cannot be undone.</p>
            `,
            footer: `
                <button type="button" class="cancel-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="danger-btn" onclick="Level6.confirmDeleteUser(${user.id})">Delete User</button>
            `
        });
    },

    showSaveConfirmation() {
        this.showModal({
            title: 'Save Changes',
            theme: 'warning',
            body: `
                <div class="modal-icon">💾</div>
                <p>You have unsaved changes. Would you like to save them?</p>
                <p class="info-text">Unsaved changes will be lost if you don't save.</p>
            `,
            footer: `
                <button type="button" class="cancel-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="secondary-btn" onclick="Level6.discardChanges()">Don't Save</button>
                <button type="button" class="primary-btn" onclick="Level6.saveChanges()">Save</button>
            `
        });
    },

    showLogoutConfirmation() {
        this.showModal({
            title: 'Confirm Logout',
            theme: 'warning',
            body: `
                <div class="modal-icon">🚪</div>
                <p>Are you sure you want to logout?</p>
                <p class="info-text">You will need to login again to access your account.</p>
            `,
            footer: `
                <button type="button" class="cancel-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="primary-btn" onclick="Level6.confirmLogout()">Logout</button>
            `
        });
    },

    showSuccessModal() {
        this.showModal({
            title: 'Success!',
            theme: 'success',
            body: `
                <div class="modal-icon">✅</div>
                <p>Operation completed successfully!</p>
                <p class="info-text">Your changes have been saved and are now active.</p>
            `,
            footer: `
                <button type="button" class="primary-btn" onclick="Level6.closeModal()">OK</button>
            `
        });
    },

    showErrorModal() {
        this.showModal({
            title: 'Error Occurred',
            theme: 'danger',
            body: `
                <div class="modal-icon">❌</div>
                <p>An error occurred while processing your request.</p>
                <div class="error-details">
                    <p><strong>Error Code:</strong> ERR_001</p>
                    <p><strong>Message:</strong> Connection timeout</p>
                </div>
                <p class="info-text">Please try again or contact support if the problem persists.</p>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Close</button>
                <button type="button" class="primary-btn" onclick="Level6.retryOperation()">Retry</button>
            `
        });
    },

    showInfoModal() {
        this.showModal({
            title: 'Information',
            theme: 'info',
            body: `
                <div class="modal-icon">ℹ️</div>
                <p>Here's some important information about this feature:</p>
                <ul class="info-list">
                    <li>This feature is currently in beta testing</li>
                    <li>Some functionality may be limited</li>
                    <li>Your feedback helps us improve the experience</li>
                    <li>Data is automatically saved every 30 seconds</li>
                </ul>
                <p class="info-text">Thank you for helping us test this feature!</p>
            `,
            footer: `
                <button type="button" class="primary-btn" onclick="Level6.closeModal()">Got it</button>
                <button type="button" class="secondary-btn" onclick="Level6.showFeedbackModal()">Give Feedback</button>
            `
        });
    },

    showWarningModal() {
        this.showModal({
            title: 'Warning',
            theme: 'warning',
            body: `
                <div class="modal-icon">⚠️</div>
                <p>Your session will expire in 5 minutes due to inactivity.</p>
                <p class="warning-text">Please save your work to avoid losing any changes.</p>
                <div class="session-info">
                    <p><strong>Last activity:</strong> 25 minutes ago</p>
                    <p><strong>Auto-logout:</strong> 5 minutes</p>
                </div>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Continue Working</button>
                <button type="button" class="primary-btn" onclick="Level6.extendSession()">Extend Session</button>
            `
        });
    },

    showSettingsModal() {
        this.showModal({
            title: 'Settings',
            theme: 'default',
            body: `
                <form id="settingsForm" class="settings-form">
                    <div class="form-group">
                        <label for="themeSelect">Theme:</label>
                        <select id="themeSelect" name="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="languageSelect">Language:</label>
                        <select id="languageSelect" name="language">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="notifications" name="notifications" checked>
                            Enable notifications
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="autoSave" name="autoSave" checked>
                            Auto-save changes
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label for="sessionTimeout">Session timeout (minutes):</label>
                        <input type="number" id="sessionTimeout" name="sessionTimeout" value="30" min="5" max="120">
                    </div>
                </form>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="info-btn" onclick="Level6.showAdvancedSettings()">Advanced</button>
                <button type="button" class="primary-btn" onclick="Level6.saveSettings()">Save Settings</button>
            `
        });
    },

    showUserFormModal(user = null) {
        const isEdit = user !== null;
        const title = isEdit ? 'Edit User' : 'Add New User';

        this.showModal({
            title: title,
            theme: 'default',
            body: `
                <form id="userForm" class="user-form">
                    <div class="form-group">
                        <label for="userName">Full Name: <span class="required">*</span></label>
                        <input type="text" id="userName" name="name" value="${user?.name || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="userEmail">Email: <span class="required">*</span></label>
                        <input type="email" id="userEmail" name="email" value="${user?.email || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="userRole">Role:</label>
                        <select id="userRole" name="role">
                            <option value="User" ${user?.role === 'User' ? 'selected' : ''}>User</option>
                            <option value="Editor" ${user?.role === 'Editor' ? 'selected' : ''}>Editor</option>
                            <option value="Admin" ${user?.role === 'Admin' ? 'selected' : ''}>Admin</option>
                        </select>
                    </div>
                    
                    ${!isEdit ? `
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="sendInvite" name="sendInvite" checked>
                            Send invitation email
                        </label>
                    </div>
                    ` : ''}
                </form>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="primary-btn" onclick="Level6.${isEdit ? `updateUser(${user.id})` : 'createUser()'}">${isEdit ? 'Update' : 'Create'} User</button>
            `
        });
    },

    showEditUserModal(user) {
        this.showUserFormModal(user);
    },

    showHelpModal() {
        this.showModal({
            title: 'Help & Support',
            theme: 'info',
            body: `
                <div class="help-content">
                    <div class="help-section">
                        <h4>Getting Started</h4>
                        <ul>
                            <li>Use the navigation menu to access different features</li>
                            <li>Click the help icon (?) for context-specific help</li>
                            <li>Your work is automatically saved every 30 seconds</li>
                        </ul>
                    </div>
                    
                    <div class="help-section">
                        <h4>Keyboard Shortcuts</h4>
                        <div class="shortcuts">
                            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>S</kbd> - Save</div>
                            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>Z</kbd> - Undo</div>
                            <div class="shortcut"><kbd>Esc</kbd> - Close modal</div>
                            <div class="shortcut"><kbd>Tab</kbd> - Navigate elements</div>
                        </div>
                    </div>
                    
                    <div class="help-section">
                        <h4>Need More Help?</h4>
                        <p>Contact our support team for additional assistance.</p>
                    </div>
                </div>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Close</button>
                <button type="button" class="info-btn" onclick="Level6.showContactModal()">Contact Support</button>
            `
        });
    },

    // Action Handlers
    confirmDelete(itemName) {
        this.closeModal();
        this.logAction(`Deleted ${itemName}`, 'danger');
    },

    confirmDeleteUser(userId) {
        const user = this.userData.find(u => u.id === userId);
        this.userData = this.userData.filter(u => u.id !== userId);
        this.updateUserList();
        this.closeModal();
        this.logAction(`Deleted user: ${user.name}`, 'danger');
    },

    saveChanges() {
        this.closeModal();
        this.logAction('Changes saved successfully', 'success');
    },

    discardChanges() {
        this.closeModal();
        this.logAction('Changes discarded', 'info');
    },

    confirmLogout() {
        this.closeModal();
        this.logAction('User logged out', 'info');
    },

    retryOperation() {
        this.closeModal();
        this.logAction('Retrying operation...', 'info');

        // Simulate retry
        setTimeout(() => {
            this.logAction('Operation completed successfully', 'success');
        }, 2000);
    },

    extendSession() {
        this.closeModal();
        this.logAction('Session extended by 30 minutes', 'success');
    },

    saveSettings() {
        const form = document.getElementById('settingsForm');
        const formData = new FormData(form);
        const settings = Object.fromEntries(formData);

        this.closeModal();
        this.logAction('Settings saved successfully', 'success');
        console.log('Saved settings:', settings);
    },

    createUser() {
        const form = document.getElementById('userForm');
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);

        // Basic validation
        if (!userData.name || !userData.email) {
            this.logAction('Please fill in all required fields', 'danger');
            return;
        }

        // Add new user
        const newUser = {
            id: Math.max(...this.userData.map(u => u.id)) + 1,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'User'
        };

        this.userData.push(newUser);
        this.updateUserList();
        this.closeModal();
        this.logAction(`Created user: ${newUser.name}`, 'success');
    },

    updateUser(userId) {
        const form = document.getElementById('userForm');
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);

        // Basic validation
        if (!userData.name || !userData.email) {
            this.logAction('Please fill in all required fields', 'danger');
            return;
        }

        // Update user
        const userIndex = this.userData.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.userData[userIndex] = {
                ...this.userData[userIndex],
                name: userData.name,
                email: userData.email,
                role: userData.role || 'User'
            };

            this.updateUserList();
            this.closeModal();
            this.logAction(`Updated user: ${userData.name}`, 'success');
        }
    },

    // Nested Modal Examples
    showAdvancedSettings() {
        this.showModal({
            title: 'Advanced Settings',
            theme: 'default',
            body: `
                <div class="advanced-settings">
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="debugMode" name="debugMode">
                            Enable debug mode
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="betaFeatures" name="betaFeatures">
                            Enable beta features
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label for="cacheSize">Cache size (MB):</label>
                        <input type="number" id="cacheSize" name="cacheSize" value="100" min="10" max="1000">
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="danger-btn" onclick="Level6.showResetConfirmation()">Reset All Settings</button>
                    </div>
                </div>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="primary-btn" onclick="Level6.saveAdvancedSettings()">Save Advanced Settings</button>
            `
        });
    },

    showResetConfirmation() {
        this.showModal({
            title: 'Reset Settings',
            theme: 'danger',
            body: `
                <div class="modal-icon">⚠️</div>
                <p>Are you sure you want to reset all settings to default values?</p>
                <p class="warning-text">This action cannot be undone and will affect all your preferences.</p>
            `,
            footer: `
                <button type="button" class="cancel-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="danger-btn" onclick="Level6.resetAllSettings()">Reset All Settings</button>
            `
        });
    },

    showFeedbackModal() {
        this.showModal({
            title: 'Send Feedback',
            theme: 'default',
            body: `
                <form id="feedbackForm" class="feedback-form">
                    <div class="form-group">
                        <label for="feedbackType">Feedback Type:</label>
                        <select id="feedbackType" name="type">
                            <option value="bug">Bug Report</option>
                            <option value="feature">Feature Request</option>
                            <option value="improvement">Improvement</option>
                            <option value="general">General Feedback</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="feedbackSubject">Subject:</label>
                        <input type="text" id="feedbackSubject" name="subject" placeholder="Brief description">
                    </div>
                    
                    <div class="form-group">
                        <label for="feedbackMessage">Message:</label>
                        <textarea id="feedbackMessage" name="message" rows="4" placeholder="Please provide detailed feedback..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="includeSystemInfo" name="includeSystemInfo" checked>
                            Include system information
                        </label>
                    </div>
                </form>
            `,
            footer: `
                <button type="button" class="secondary-btn" onclick="Level6.closeModal()">Cancel</button>
                <button type="button" class="primary-btn" onclick="Level6.sendFeedback()">Send Feedback</button>
            `
        });
    },

    showContactModal() {
        this.showModal({
            title: 'Contact Support',
            theme: 'info',
            body: `
                <div class="contact-info">
                    <div class="contact-method">
                        <h4>📧 Email Support</h4>
                        <p>support@example.com</p>
                        <p class="response-time">Response time: 24-48 hours</p>
                    </div>
                    
                    <div class="contact-method">
                        <h4>💬 Live Chat</h4>
                        <p>Available Monday-Friday, 9 AM - 5 PM PST</p>
                        <button type="button" class="primary-btn" onclick="Level6.startLiveChat()">Start Chat</button>
                    </div>
                    
                    <div class="contact-method">
                        <h4>📞 Phone Support</h4>
                        <p>1-800-SUPPORT (1-800-786-7678)</p>
                        <p class="response-time">Available 24/7</p>
                    </div>
                    
                    <div class="contact-method">
                        <h4>📚 Knowledge Base</h4>
                        <p>Search our comprehensive help articles</p>
                        <button type="button" class="secondary-btn" onclick="Level6.openKnowledgeBase()">Browse Articles</button>
                    </div>
                </div>
            `,
            footer: `
                <button type="button" class="primary-btn" onclick="Level6.closeModal()">Close</button>
            `
        });
    },

    // Additional Action Handlers
    saveAdvancedSettings() {
        this.closeModal();
        this.logAction('Advanced settings saved', 'success');
    },

    resetAllSettings() {
        this.closeModal();
        this.logAction('All settings reset to default values', 'info');
    },

    sendFeedback() {
        const form = document.getElementById('feedbackForm');
        const formData = new FormData(form);
        const feedback = Object.fromEntries(formData);

        this.closeModal();
        this.logAction('Feedback sent successfully. Thank you!', 'success');
        console.log('Feedback:', feedback);
    },

    startLiveChat() {
        this.closeModal();
        this.logAction('Starting live chat session...', 'info');
    },

    openKnowledgeBase() {
        this.closeModal();
        this.logAction('Opening knowledge base in new window', 'info');
    },

    // Utility Functions
    updateUserList() {
        const userList = document.getElementById('userList');
        if (userList) {
            userList.innerHTML = this.renderUserList();
        }
    },

    logAction(message, type = 'info') {
        const resultsContainer = document.getElementById('actionResults');
        const timestamp = new Date().toLocaleTimeString();

        const actionItem = document.createElement('div');
        actionItem.className = `action-item ${type}`;
        actionItem.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <span class="message">${message}</span>
        `;

        // Remove placeholder if it exists
        const placeholder = resultsContainer.querySelector('.placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        // Add new action to top
        resultsContainer.insertBefore(actionItem, resultsContainer.firstChild);

        // Keep only last 10 actions
        const actions = resultsContainer.querySelectorAll('.action-item');
        if (actions.length > 10) {
            actions[actions.length - 1].remove();
        }
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('modalResult');
        if (resultDiv) {
            resultDiv.innerHTML = message;
            resultDiv.className = `result ${type}`;

            // Auto-hide after 3 seconds
            setTimeout(() => {
                resultDiv.innerHTML = '';
                resultDiv.className = '';
            }, 3000);
        }
    }
};