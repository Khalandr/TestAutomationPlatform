// Level 10 - Multi-Step Wizard

window.Level10 = {
    currentStep: 1,
    totalSteps: 6,
    formData: {},
    completedSteps: new Set(),
    stepValidation: {},

    steps: [
        { id: 1, title: "Personal Info", icon: "👤", description: "Basic information" },
        { id: 2, title: "Account Setup", icon: "🔧", description: "Account preferences" },
        { id: 3, title: "Profile Details", icon: "📝", description: "Additional details" },
        { id: 4, title: "Security", icon: "🔒", description: "Security settings" },
        { id: 5, title: "Review", icon: "👁️", description: "Confirm details" },
        { id: 6, title: "Complete", icon: "✅", description: "Finish setup" }
    ],

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 10: Multi-Step Wizard</h2>
                
                <!-- Progress Indicator -->
                <div class="wizard-progress">
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-text">
                            <span id="progressText">Step 1 of ${this.totalSteps}</span>
                        </div>
                    </div>
                    
                    <div class="step-indicators">
                        ${this.renderStepIndicators()}
                    </div>
                </div>

                <!-- Wizard Content -->
                <div class="wizard-container">
                    <div class="wizard-content" id="wizardContent">
                        ${this.renderStep(1)}
                    </div>
                    
                    <!-- Navigation -->
                    <div class="wizard-navigation">
                        <button type="button" id="prevBtn" class="nav-btn secondary" disabled>
                            ← Previous
                        </button>
                        
                        <div class="nav-info">
                            <span id="stepInfo">Step 1: Personal Info</span>
                        </div>
                        
                        <button type="button" id="nextBtn" class="nav-btn primary">
                            Next →
                        </button>
                    </div>
                </div>

                <!-- Wizard Actions -->
                <div class="wizard-actions">
                    <button type="button" id="saveProgressBtn" class="action-btn secondary">
                        💾 Save Progress
                    </button>
                    <button type="button" id="resetWizardBtn" class="action-btn danger">
                        🔄 Start Over
                    </button>
                    <button type="button" id="jumpToStepBtn" class="action-btn info">
                        📍 Jump to Step
                    </button>
                </div>

                <div id="wizardResult"></div>
            </div>
        `;
    },

    renderStepIndicators() {
        return this.steps.map(step => `
            <div class="step-indicator ${step.id === 1 ? 'active' : ''}" data-step="${step.id}">
                <div class="step-number">
                    <span class="step-icon">${step.icon}</span>
                    <span class="step-num">${step.id}</span>
                </div>
                <div class="step-info">
                    <div class="step-title">${step.title}</div>
                    <div class="step-desc">${step.description}</div>
                </div>
            </div>
        `).join('');
    },

    renderStep(stepNumber) {
        switch (stepNumber) {
            case 1:
                return this.renderPersonalInfoStep();
            case 2:
                return this.renderAccountSetupStep();
            case 3:
                return this.renderProfileDetailsStep();
            case 4:
                return this.renderSecurityStep();
            case 5:
                return this.renderReviewStep();
            case 6:
                return this.renderCompleteStep();
            default:
                return '<div>Step not found</div>';
        }
    },

    renderPersonalInfoStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h3>👤 Personal Information</h3>
                    <p>Please provide your basic information to get started.</p>
                </div>
                
                <form class="step-form" id="step1Form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name <span class="required">*</span></label>
                            <input type="text" id="firstName" name="firstName" value="${this.formData.firstName || ''}" required>
                            <div class="field-error" id="firstNameError"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="lastName">Last Name <span class="required">*</span></label>
                            <input type="text" id="lastName" name="lastName" value="${this.formData.lastName || ''}" required>
                            <div class="field-error" id="lastNameError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address <span class="required">*</span></label>
                        <input type="email" id="email" name="email" value="${this.formData.email || ''}" required>
                        <div class="field-error" id="emailError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" value="${this.formData.phone || ''}" placeholder="+1 (555) 123-4567">
                        <div class="field-error" id="phoneError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="birthDate">Date of Birth</label>
                        <input type="date" id="birthDate" name="birthDate" value="${this.formData.birthDate || ''}">
                        <div class="field-error" id="birthDateError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea id="address" name="address" rows="3" placeholder="Street address, city, state, zip code">${this.formData.address || ''}</textarea>
                        <div class="field-error" id="addressError"></div>
                    </div>
                </form>
            </div>
        `;
    },

    renderAccountSetupStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h3>🔧 Account Setup</h3>
                    <p>Configure your account preferences and settings.</p>
                </div>
                
                <form class="step-form" id="step2Form">
                    <div class="form-group">
                        <label for="username">Username <span class="required">*</span></label>
                        <input type="text" id="username" name="username" value="${this.formData.username || ''}" required>
                        <small class="field-hint">Must be 3-20 characters, letters and numbers only</small>
                        <div class="field-error" id="usernameError"></div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="password">Password <span class="required">*</span></label>
                            <input type="password" id="password" name="password" value="${this.formData.password || ''}" required>
                            <div class="field-error" id="passwordError"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password <span class="required">*</span></label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value="${this.formData.confirmPassword || ''}" required>
                            <div class="field-error" id="confirmPasswordError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Notification Preferences</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="emailNotifications" ${this.formData.emailNotifications ? 'checked' : ''}>
                                <span>Email notifications</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="smsNotifications" ${this.formData.smsNotifications ? 'checked' : ''}>
                                <span>SMS notifications</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="pushNotifications" ${this.formData.pushNotifications ? 'checked' : ''}>
                                <span>Push notifications</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="theme">Theme Preference</label>
                        <select id="theme" name="theme">
                            <option value="light" ${this.formData.theme === 'light' ? 'selected' : ''}>Light</option>
                            <option value="dark" ${this.formData.theme === 'dark' ? 'selected' : ''}>Dark</option>
                            <option value="auto" ${this.formData.theme === 'auto' ? 'selected' : ''}>Auto</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="language">Language</label>
                        <select id="language" name="language">
                            <option value="en" ${this.formData.language === 'en' ? 'selected' : ''}>English</option>
                            <option value="es" ${this.formData.language === 'es' ? 'selected' : ''}>Spanish</option>
                            <option value="fr" ${this.formData.language === 'fr' ? 'selected' : ''}>French</option>
                            <option value="de" ${this.formData.language === 'de' ? 'selected' : ''}>German</option>
                        </select>
                    </div>
                </form>
            </div>
        `;
    },

    renderProfileDetailsStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h3>📝 Profile Details</h3>
                    <p>Tell us more about yourself to personalize your experience.</p>
                </div>
                
                <form class="step-form" id="step3Form">
                    <div class="form-group">
                        <label for="jobTitle">Job Title</label>
                        <input type="text" id="jobTitle" name="jobTitle" value="${this.formData.jobTitle || ''}" placeholder="e.g. Software Engineer">
                    </div>
                    
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" name="company" value="${this.formData.company || ''}" placeholder="e.g. Tech Corp">
                    </div>
                    
                    <div class="form-group">
                        <label for="bio">Bio</label>
                        <textarea id="bio" name="bio" rows="4" placeholder="Tell us about yourself...">${this.formData.bio || ''}</textarea>
                        <small class="field-hint">Maximum 500 characters</small>
                    </div>
                    
                    <div class="form-group">
                        <label>Interests</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="interests" value="technology" ${this.formData.interests?.includes('technology') ? 'checked' : ''}>
                                <span>Technology</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="interests" value="design" ${this.formData.interests?.includes('design') ? 'checked' : ''}>
                                <span>Design</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="interests" value="business" ${this.formData.interests?.includes('business') ? 'checked' : ''}>
                                <span>Business</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="interests" value="science" ${this.formData.interests?.includes('science') ? 'checked' : ''}>
                                <span>Science</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="interests" value="arts" ${this.formData.interests?.includes('arts') ? 'checked' : ''}>
                                <span>Arts</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="interests" value="sports" ${this.formData.interests?.includes('sports') ? 'checked' : ''}>
                                <span>Sports</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="website">Website/Portfolio</label>
                        <input type="url" id="website" name="website" value="${this.formData.website || ''}" placeholder="https://yourwebsite.com">
                    </div>
                    
                    <div class="form-group">
                        <label>Avatar Upload (Simulated)</label>
                        <div class="file-upload-sim">
                            <div class="upload-area" id="avatarUpload">
                                <div class="upload-icon">📷</div>
                                <div class="upload-text">Click to upload or drag image here</div>
                                <div class="upload-formats">Supported: JPG, PNG, GIF (max 5MB)</div>
                            </div>
                            <div class="upload-result" id="avatarResult" style="display: none;">
                                <span class="upload-filename"></span>
                                <button type="button" class="remove-upload">×</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `;
    },

    renderSecurityStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h3>🔒 Security Settings</h3>
                    <p>Set up security options to protect your account.</p>
                </div>
                
                <form class="step-form" id="step4Form">
                    <div class="form-group">
                        <label for="securityQuestion1">Security Question 1 <span class="required">*</span></label>
                        <select id="securityQuestion1" name="securityQuestion1" required>
                            <option value="">Choose a security question</option>
                            <option value="pet" ${this.formData.securityQuestion1 === 'pet' ? 'selected' : ''}>What was the name of your first pet?</option>
                            <option value="school" ${this.formData.securityQuestion1 === 'school' ? 'selected' : ''}>What elementary school did you attend?</option>
                            <option value="city" ${this.formData.securityQuestion1 === 'city' ? 'selected' : ''}>In what city were you born?</option>
                            <option value="mother" ${this.formData.securityQuestion1 === 'mother' ? 'selected' : ''}>What is your mother's maiden name?</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="securityAnswer1">Answer <span class="required">*</span></label>
                        <input type="text" id="securityAnswer1" name="securityAnswer1" value="${this.formData.securityAnswer1 || ''}" required>
                        <div class="field-error" id="securityAnswer1Error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="securityQuestion2">Security Question 2</label>
                        <select id="securityQuestion2" name="securityQuestion2">
                            <option value="">Choose a security question (optional)</option>
                            <option value="car" ${this.formData.securityQuestion2 === 'car' ? 'selected' : ''}>What was your first car?</option>
                            <option value="street" ${this.formData.securityQuestion2 === 'street' ? 'selected' : ''}>What street did you grow up on?</option>
                            <option value="friend" ${this.formData.securityQuestion2 === 'friend' ? 'selected' : ''}>What is the name of your best friend?</option>
                        </select>
                    </div>
                    
                    <div class="form-group" id="securityAnswer2Group" style="display: ${this.formData.securityQuestion2 ? 'block' : 'none'};">
                        <label for="securityAnswer2">Answer</label>
                        <input type="text" id="securityAnswer2" name="securityAnswer2" value="${this.formData.securityAnswer2 || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" name="twoFactorAuth" ${this.formData.twoFactorAuth ? 'checked' : ''}>
                            <span>Enable Two-Factor Authentication (2FA)</span>
                        </label>
                        <small class="field-hint">Adds an extra layer of security to your account</small>
                    </div>
                    
                    <div class="form-group" id="twoFactorOptions" style="display: ${this.formData.twoFactorAuth ? 'block' : 'none'};">
                        <label>2FA Method</label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" name="twoFactorMethod" value="sms" ${this.formData.twoFactorMethod === 'sms' ? 'checked' : ''}>
                                <span>SMS</span>
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="twoFactorMethod" value="email" ${this.formData.twoFactorMethod === 'email' ? 'checked' : ''}>
                                <span>Email</span>
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="twoFactorMethod" value="app" ${this.formData.twoFactorMethod === 'app' ? 'checked' : ''}>
                                <span>Authenticator App</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" name="loginAlerts" ${this.formData.loginAlerts ? 'checked' : ''}>
                            <span>Email me when someone logs into my account</span>
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" name="deviceRemember" ${this.formData.deviceRemember ? 'checked' : ''}>
                            <span>Remember this device for 30 days</span>
                        </label>
                    </div>
                </form>
            </div>
        `;
    },

    renderReviewStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h3>👁️ Review Your Information</h3>
                    <p>Please review all the information you've entered. You can go back to make changes.</p>
                </div>
                
                <div class="review-sections">
                    <div class="review-section">
                        <div class="review-header">
                            <h4>👤 Personal Information</h4>
                            <button type="button" class="edit-section-btn" data-step="1">Edit</button>
                        </div>
                        <div class="review-content">
                            <div class="review-item">
                                <span class="review-label">Name:</span>
                                <span class="review-value">${this.formData.firstName || ''} ${this.formData.lastName || ''}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Email:</span>
                                <span class="review-value">${this.formData.email || ''}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Phone:</span>
                                <span class="review-value">${this.formData.phone || 'Not provided'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Birth Date:</span>
                                <span class="review-value">${this.formData.birthDate || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <div class="review-header">
                            <h4>🔧 Account Setup</h4>
                            <button type="button" class="edit-section-btn" data-step="2">Edit</button>
                        </div>
                        <div class="review-content">
                            <div class="review-item">
                                <span class="review-label">Username:</span>
                                <span class="review-value">${this.formData.username || ''}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Theme:</span>
                                <span class="review-value">${this.formData.theme || 'Light'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Language:</span>
                                <span class="review-value">${this.formData.language || 'English'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Notifications:</span>
                                <span class="review-value">${this.getNotificationSummary()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <div class="review-header">
                            <h4>📝 Profile Details</h4>
                            <button type="button" class="edit-section-btn" data-step="3">Edit</button>
                        </div>
                        <div class="review-content">
                            <div class="review-item">
                                <span class="review-label">Job Title:</span>
                                <span class="review-value">${this.formData.jobTitle || 'Not provided'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Company:</span>
                                <span class="review-value">${this.formData.company || 'Not provided'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Interests:</span>
                                <span class="review-value">${this.formData.interests?.join(', ') || 'None selected'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Website:</span>
                                <span class="review-value">${this.formData.website || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <div class="review-header">
                            <h4>🔒 Security Settings</h4>
                            <button type="button" class="edit-section-btn" data-step="4">Edit</button>
                        </div>
                        <div class="review-content">
                            <div class="review-item">
                                <span class="review-label">Security Questions:</span>
                                <span class="review-value">${this.formData.securityQuestion1 ? 'Configured' : 'Not set'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Two-Factor Auth:</span>
                                <span class="review-value">${this.formData.twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
                            </div>
                            <div class="review-item">
                                <span class="review-label">Login Alerts:</span>
                                <span class="review-value">${this.formData.loginAlerts ? 'Enabled' : 'Disabled'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="review-actions">
                    <div class="terms-agreement">
                        <label class="checkbox-item">
                            <input type="checkbox" id="agreeTerms" required>
                            <span>I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="privacy-link">Privacy Policy</a></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    },

    renderCompleteStep() {
        return `
            <div class="step-content">
                <div class="completion-content">
                    <div class="success-icon">🎉</div>
                    <h3>Setup Complete!</h3>
                    <p>Congratulations! Your account has been successfully created and configured.</p>
                    
                    <div class="completion-summary">
                        <h4>What's Next?</h4>
                        <div class="next-steps">
                            <div class="next-step">
                                <div class="step-icon">📧</div>
                                <div class="step-text">
                                    <strong>Check Your Email</strong>
                                    <span>We've sent a verification email to ${this.formData.email}</span>
                                </div>
                            </div>
                            <div class="next-step">
                                <div class="step-icon">🔍</div>
                                <div class="step-text">
                                    <strong>Explore Features</strong>
                                    <span>Take a tour of your new dashboard and features</span>
                                </div>
                            </div>
                            <div class="next-step">
                                <div class="step-icon">👥</div>
                                <div class="step-text">
                                    <strong>Connect with Others</strong>
                                    <span>Find and connect with colleagues and friends</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="completion-actions">
                        <button type="button" id="goToDashboardBtn" class="completion-btn primary">
                            🏠 Go to Dashboard
                        </button>
                        <button type="button" id="takeTourBtn" class="completion-btn secondary">
                            🎯 Take a Tour
                        </button>
                        <button type="button" id="downloadDataBtn" class="completion-btn info">
                            📋 Download Setup Summary
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    getDescription() {
        return `
            <h3>Level 10 - Multi-Step Wizard</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Navigation:</h5>
            <ul>
                <li>Progress through all 6 steps sequentially</li>
                <li>Navigate back to previous steps</li>
                <li>Jump to completed steps via indicators</li>
                <li>Verify step validation prevents invalid progression</li>
            </ul>
            
            <h5>Form Validation:</h5>
            <ul>
                <li>Required field validation on each step</li>
                <li>Real-time validation as user types</li>
                <li>Password confirmation matching</li>
                <li>Email format validation</li>
                <li>Username availability checking (simulated)</li>
            </ul>
            
            <h5>Data Persistence:</h5>
            <ul>
                <li>Form data preserved when navigating between steps</li>
                <li>Save progress functionality</li>
                <li>Resume from saved progress</li>
                <li>Reset wizard to start over</li>
            </ul>
            
            <h5>Conditional Logic:</h5>
            <ul>
                <li>Show/hide security answer fields based on questions</li>
                <li>2FA options appear when enabled</li>
                <li>Review step shows all entered data</li>
                <li>Step completion indicators update correctly</li>
            </ul>
            
            <h5>File Upload Simulation:</h5>
            <ul>
                <li>Avatar upload with drag and drop</li>
                <li>File type and size validation</li>
                <li>Upload progress simulation</li>
                <li>Remove uploaded files</li>
            </ul>
            
            <h5>Review and Completion:</h5>
            <ul>
                <li>Review all entered data in step 5</li>
                <li>Edit links to go back to specific steps</li>
                <li>Terms and conditions agreement</li>
                <li>Final completion with next steps</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Wait for step transitions to complete</li>
                <li>Verify progress bar and indicators update</li>
                <li>Test both Next/Previous and direct navigation</li>
                <li>Validate form persistence across navigation</li>
                <li>Check conditional field visibility changes</li>
                <li>Test validation error display and clearing</li>
                <li>Verify step completion states</li>
                <li>Test wizard reset functionality</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Multi-step workflow automation</li>
                <li>Form validation across multiple pages</li>
                <li>Navigation state management</li>
                <li>Data persistence verification</li>
                <li>Conditional logic testing</li>
                <li>Progress tracking validation</li>
                <li>File upload simulation testing</li>
                <li>Complex form dependency testing</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 10 - Multi-Step Wizard');

        this.currentStep = 1;
        this.formData = {};
        this.completedSteps = new Set();
        this.stepValidation = {};

        this.bindEvents();
        this.updateProgress();
        this.setupFormValidation();
    },

    bindEvents() {
        // Navigation buttons
        document.getElementById('nextBtn')?.addEventListener('click', () => {
            this.nextStep();
        });

        document.getElementById('prevBtn')?.addEventListener('click', () => {
            this.previousStep();
        });

        // Wizard actions
        document.getElementById('saveProgressBtn')?.addEventListener('click', () => {
            this.saveProgress();
        });

        document.getElementById('resetWizardBtn')?.addEventListener('click', () => {
            this.resetWizard();
        });

        document.getElementById('jumpToStepBtn')?.addEventListener('click', () => {
            this.showJumpToStepDialog();
        });

        // Step indicator clicks
        document.addEventListener('click', (e) => {
            const stepIndicator = e.target.closest('.step-indicator');
            if (stepIndicator) {
                const stepNumber = parseInt(stepIndicator.getAttribute('data-step'));
                if (this.completedSteps.has(stepNumber) || stepNumber <= this.currentStep) {
                    this.goToStep(stepNumber);
                }
            }
        });

        // Form field events
        document.addEventListener('input', (e) => {
            if (e.target.form && e.target.form.classList.contains('step-form')) {
                this.handleFieldInput(e.target);
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.form && e.target.form.classList.contains('step-form')) {
                this.handleFieldChange(e.target);
            }
        });

        // Special handlers for conditional fields
        this.bindConditionalFieldEvents();

        // Review step edit buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-section-btn')) {
                const stepNumber = parseInt(e.target.getAttribute('data-step'));
                this.goToStep(stepNumber);
            }
        });

        // Completion step actions
        document.addEventListener('click', (e) => {
            if (e.target.id === 'goToDashboardBtn') {
                this.goToDashboard();
            } else if (e.target.id === 'takeTourBtn') {
                this.takeTour();
            } else if (e.target.id === 'downloadDataBtn') {
                this.downloadSetupSummary();
            }
        });
    },

    bindConditionalFieldEvents() {
        // Two-factor auth toggle
        document.addEventListener('change', (e) => {
            if (e.target.name === 'twoFactorAuth') {
                const twoFactorOptions = document.getElementById('twoFactorOptions');
                if (twoFactorOptions) {
                    twoFactorOptions.style.display = e.target.checked ? 'block' : 'none';
                }
            }
        });

        // Security question 2 toggle
        document.addEventListener('change', (e) => {
            if (e.target.id === 'securityQuestion2') {
                const answerGroup = document.getElementById('securityAnswer2Group');
                if (answerGroup) {
                    answerGroup.style.display = e.target.value ? 'block' : 'none';
                }
            }
        });

        // Avatar upload simulation
        document.addEventListener('click', (e) => {
            if (e.target.closest('#avatarUpload')) {
                this.simulateAvatarUpload();
            }

            if (e.target.classList.contains('remove-upload')) {
                this.removeUploadedAvatar();
            }
        });
    },

    setupFormValidation() {
        // Setup real-time validation for each step
        this.validationRules = {
            1: {
                firstName: { required: true, minLength: 2 },
                lastName: { required: true, minLength: 2 },
                email: { required: true, email: true }
            },
            2: {
                username: { required: true, minLength: 3, maxLength: 20, alphanumeric: true },
                password: { required: true, minLength: 8, password: true },
                confirmPassword: { required: true, matches: 'password' }
            },
            3: {
                bio: { maxLength: 500 },
                website: { url: true }
            },
            4: {
                securityQuestion1: { required: true },
                securityAnswer1: { required: true, minLength: 2 }
            }
        };
    },

    handleFieldInput(field) {
        // Real-time validation
        this.validateField(field);
        this.saveFieldData(field);
    },

    handleFieldChange(field) {
        this.saveFieldData(field);
        this.validateField(field);
    },

    saveFieldData(field) {
        const name = field.name;
        let value;

        if (field.type === 'checkbox') {
            if (name === 'interests') {
                // Handle multiple checkboxes with same name
                if (!this.formData.interests) this.formData.interests = [];
                if (field.checked) {
                    if (!this.formData.interests.includes(field.value)) {
                        this.formData.interests.push(field.value);
                    }
                } else {
                    this.formData.interests = this.formData.interests.filter(item => item !== field.value);
                }
                return;
            } else {
                value = field.checked;
            }
        } else if (field.type === 'radio') {
            if (field.checked) {
                value = field.value;
            } else {
                return; // Don't save unchecked radio values
            }
        } else {
            value = field.value;
        }

        this.formData[name] = value;
    },

    validateField(field) {
        const stepRules = this.validationRules[this.currentStep];
        if (!stepRules || !stepRules[field.name]) return true;

        const rules = stepRules[field.name];
        const value = field.value;
        const errorElement = document.getElementById(field.name + 'Error');

        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required && (!value || value.trim() === '')) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (isValid && rules.email && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // URL validation
        if (isValid && rules.url && value) {
            try {
                new URL(value);
            } catch {
                isValid = false;
                errorMessage = 'Please enter a valid URL';
            }
        }

        // Length validation
        if (isValid && rules.minLength && value && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Must be at least ${rules.minLength} characters`;
        }

        if (isValid && rules.maxLength && value && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `Must be no more than ${rules.maxLength} characters`;
        }

        // Alphanumeric validation
        if (isValid && rules.alphanumeric && value) {
            const alphanumericRegex = /^[a-zA-Z0-9]+$/;
            if (!alphanumericRegex.test(value)) {
                isValid = false;
                errorMessage = 'Only letters and numbers allowed';
            }
        }

        // Password validation
        if (isValid && rules.password && value) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                isValid = false;
                errorMessage = 'Password must contain uppercase, lowercase, and number';
            }
        }

        // Matching field validation
        if (isValid && rules.matches && value) {
            const matchField = document.getElementById(rules.matches);
            if (matchField && value !== matchField.value) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
        }

        // Update UI
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }

        field.classList.toggle('error', !isValid);
        field.classList.toggle('valid', isValid && value);

        return isValid;
    },

    validateStep(stepNumber) {
        const form = document.getElementById(`step${stepNumber}Form`);
        if (!form) return true;

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Additional step-specific validation
        if (stepNumber === 2) {
            // Check password confirmation
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                isValid = false;
            }
        }

        if (stepNumber === 5) {
            // Check terms agreement
            const agreeTerms = document.getElementById('agreeTerms');
            if (agreeTerms && !agreeTerms.checked) {
                this.showFeedback('Please agree to the Terms of Service to continue', 'error');
                isValid = false;
            }
        }

        return isValid;
    },

    nextStep() {
        if (!this.validateStep(this.currentStep)) {
            this.showFeedback('Please fix the errors before continuing', 'error');
            return;
        }

        this.completedSteps.add(this.currentStep);

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateWizard();
            this.logAction(`Advanced to step ${this.currentStep}`, 'success');
        }
    },

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateWizard();
            this.logAction(`Returned to step ${this.currentStep}`, 'info');
        }
    },

    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            // Only allow going to steps that are completed or the next step
            if (this.completedSteps.has(stepNumber) || stepNumber <= this.currentStep + 1) {
                this.currentStep = stepNumber;
                this.updateWizard();
                this.logAction(`Jumped to step ${stepNumber}`, 'info');
            } else {
                this.showFeedback('Complete previous steps before accessing this step', 'warning');
            }
        }
    },

    updateWizard() {
        // Update content
        const wizardContent = document.getElementById('wizardContent');
        if (wizardContent) {
            wizardContent.innerHTML = this.renderStep(this.currentStep);
        }

        // Rebind events for new content
        this.bindConditionalFieldEvents();

        // Update progress
        this.updateProgress();

        // Update navigation buttons
        this.updateNavigation();

        // Update step indicators
        this.updateStepIndicators();
    },

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        const percentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;

        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        if (progressText) {
            progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
        }
    },

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const stepInfo = document.getElementById('stepInfo');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
                nextBtn.textContent = this.currentStep === this.totalSteps - 1 ? 'Complete' : 'Next →';
            }
        }

        if (stepInfo) {
            const currentStepData = this.steps.find(step => step.id === this.currentStep);
            stepInfo.textContent = `Step ${this.currentStep}: ${currentStepData?.title || ''}`;
        }
    },

    updateStepIndicators() {
        const indicators = document.querySelectorAll('.step-indicator');

        indicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed', 'accessible');

            if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
            } else if (this.completedSteps.has(stepNumber)) {
                indicator.classList.add('completed');
            }

            // Make completed steps and current step accessible
            if (this.completedSteps.has(stepNumber) || stepNumber <= this.currentStep) {
                indicator.classList.add('accessible');
            }
        });
    },

    saveProgress() {
        const progressData = {
            currentStep: this.currentStep,
            formData: this.formData,
            completedSteps: Array.from(this.completedSteps),
            timestamp: new Date().toISOString()
        };

        // In a real app, this would save to localStorage or server
        sessionStorage.setItem('wizardProgress', JSON.stringify(progressData));
        this.showFeedback('Progress saved successfully', 'success');
        this.logAction('Wizard progress saved', 'info');
    },

    loadProgress() {
        const savedProgress = sessionStorage.getItem('wizardProgress');
        if (savedProgress) {
            try {
                const progressData = JSON.parse(savedProgress);
                this.currentStep = progressData.currentStep;
                this.formData = progressData.formData;
                this.completedSteps = new Set(progressData.completedSteps);
                this.updateWizard();
                this.showFeedback('Progress restored', 'success');
                return true;
            } catch (error) {
                console.error('Error loading progress:', error);
            }
        }
        return false;
    },

    resetWizard() {
        if (confirm('Are you sure you want to start over? All progress will be lost.')) {
            this.currentStep = 1;
            this.formData = {};
            this.completedSteps = new Set();
            sessionStorage.removeItem('wizardProgress');
            this.updateWizard();
            this.showFeedback('Wizard reset successfully', 'info');
            this.logAction('Wizard reset to beginning', 'warning');
        }
    },

    showJumpToStepDialog() {
        const stepOptions = this.steps
            .filter(step => this.completedSteps.has(step.id) || step.id <= this.currentStep)
            .map(step => `${step.id}: ${step.title}`)
            .join('\n');

        const stepNumber = prompt(`Jump to step:\n${stepOptions}\n\nEnter step number:`);

        if (stepNumber) {
            const step = parseInt(stepNumber);
            if (step && step >= 1 && step <= this.totalSteps) {
                this.goToStep(step);
            } else {
                this.showFeedback('Invalid step number', 'error');
            }
        }
    },

    simulateAvatarUpload() {
        const uploadArea = document.getElementById('avatarUpload');
        const uploadResult = document.getElementById('avatarResult');

        if (uploadArea && uploadResult) {
            // Simulate file selection
            const fakeFileName = 'profile-photo.jpg';

            uploadArea.style.display = 'none';
            uploadResult.style.display = 'flex';
            uploadResult.querySelector('.upload-filename').textContent = fakeFileName;

            this.formData.avatar = fakeFileName;
            this.logAction('Avatar uploaded (simulated)', 'success');
        }
    },

    removeUploadedAvatar() {
        const uploadArea = document.getElementById('avatarUpload');
        const uploadResult = document.getElementById('avatarResult');

        if (uploadArea && uploadResult) {
            uploadArea.style.display = 'block';
            uploadResult.style.display = 'none';
            delete this.formData.avatar;
            this.logAction('Avatar removed', 'info');
        }
    },

    getNotificationSummary() {
        const notifications = [];
        if (this.formData.emailNotifications) notifications.push('Email');
        if (this.formData.smsNotifications) notifications.push('SMS');
        if (this.formData.pushNotifications) notifications.push('Push');
        return notifications.length > 0 ? notifications.join(', ') : 'None';
    },

    goToDashboard() {
        this.showFeedback('Redirecting to dashboard...', 'success');
        this.logAction('User chose to go to dashboard', 'success');
    },

    takeTour() {
        this.showFeedback('Starting guided tour...', 'info');
        this.logAction('User chose to take tour', 'info');
    },

    downloadSetupSummary() {
        const summary = this.generateSetupSummary();
        const blob = new Blob([summary], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'account-setup-summary.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.logAction('Setup summary downloaded', 'success');
    },

    generateSetupSummary() {
        return `Account Setup Summary
Generated: ${new Date().toLocaleString()}

Personal Information:
- Name: ${this.formData.firstName} ${this.formData.lastName}
- Email: ${this.formData.email}
- Phone: ${this.formData.phone || 'Not provided'}
- Birth Date: ${this.formData.birthDate || 'Not provided'}

Account Settings:
- Username: ${this.formData.username}
- Theme: ${this.formData.theme || 'Light'}
- Language: ${this.formData.language || 'English'}
- Notifications: ${this.getNotificationSummary()}

Profile Details:
- Job Title: ${this.formData.jobTitle || 'Not provided'}
- Company: ${this.formData.company || 'Not provided'}
- Interests: ${this.formData.interests?.join(', ') || 'None'}
- Website: ${this.formData.website || 'Not provided'}

Security Settings:
- Security Questions: ${this.formData.securityQuestion1 ? 'Configured' : 'Not configured'}
- Two-Factor Auth: ${this.formData.twoFactorAuth ? 'Enabled' : 'Disabled'}
- Login Alerts: ${this.formData.loginAlerts ? 'Enabled' : 'Disabled'}

Setup completed successfully!`;
    },

    logAction(message, type = 'info') {
        console.log(`Wizard: ${message}`);
        // Could extend this to show in UI log
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('wizardResult');
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