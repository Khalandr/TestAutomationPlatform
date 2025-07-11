// Level 3 - Tax Calculator Form

window.Level3 = {
    getContent() {
        return `
            <div class="level-content">
                <h2>Level 3: Tax Calculator</h2>
                <form id="taxForm">
                    <div class="form-section">
                        <h3>Personal Information</h3>
                        <div class="form-group">
                            <label for="taxYear">Tax Year:</label>
                            <select id="taxYear" name="taxYear" required>
                                <option value="">Select year</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="birthDate">Date of Birth:</label>
                            <input type="date" id="birthDate" name="birthDate" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Filing Status:</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="filingStatus" value="single" required>
                                    Single
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="filingStatus" value="married" required>
                                    Married Filing Jointly
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="filingStatus" value="head" required>
                                    Head of Household
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Income Information</h3>
                        <div class="form-group">
                            <label for="annualIncome">Annual Income ($):</label>
                            <input type="number" id="annualIncome" name="annualIncome" min="0" step="0.01" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Income Sources:</label>
                            <div class="checkbox-group">
                                <label class="checkbox-option">
                                    <input type="checkbox" id="salaryIncome" name="incomeTypes" value="salary">
                                    Salary/Wages
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" id="businessIncome" name="incomeTypes" value="business">
                                    Business Income
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" id="investmentIncome" name="incomeTypes" value="investment">
                                    Investment Income
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" id="rentalIncome" name="incomeTypes" value="rental">
                                    Rental Income
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="dependents">Number of Dependents:</label>
                            <input type="number" id="dependents" name="dependents" min="0" max="10" value="0">
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Deductions</h3>
                        <div class="form-group">
                            <label>Deduction Type:</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="deductionType" value="standard" required>
                                    Standard Deduction
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="deductionType" value="itemized" required>
                                    Itemized Deductions
                                </label>
                            </div>
                        </div>
                        
                        <div id="itemizedSection" class="conditional-section" style="display: none;">
                            <div class="form-group">
                                <label for="mortgageInterest">Mortgage Interest ($):</label>
                                <input type="number" id="mortgageInterest" name="mortgageInterest" min="0" step="0.01">
                            </div>
                            
                            <div class="form-group">
                                <label for="charitableDonations">Charitable Donations ($):</label>
                                <input type="number" id="charitableDonations" name="charitableDonations" min="0" step="0.01">
                            </div>
                            
                            <div class="form-group">
                                <label for="stateTaxes">State and Local Taxes ($):</label>
                                <input type="number" id="stateTaxes" name="stateTaxes" min="0" step="0.01">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Additional Benefits:</label>
                            <div class="checkbox-group">
                                <label class="checkbox-option">
                                    <input type="checkbox" id="studentLoanInterest" name="benefits" value="student">
                                    Student Loan Interest Deduction
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" id="healthSavings" name="benefits" value="hsa">
                                    Health Savings Account
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" id="retirementContrib" name="benefits" value="retirement">
                                    Retirement Contributions
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Tax Preferences</h3>
                        <div class="form-group">
                            <label for="withheldTax">Tax Already Withheld ($):</label>
                            <input type="number" id="withheldTax" name="withheldTax" min="0" step="0.01" value="0">
                        </div>
                        
                        <div class="form-group">
                            <label for="estimatedPayments">Estimated Tax Payments ($):</label>
                            <input type="number" id="estimatedPayments" name="estimatedPayments" min="0" step="0.01" value="0">
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" id="calculateBtn">Calculate Tax</button>
                        <button type="button" id="resetBtn">Reset Form</button>
                        <button type="button" id="previewBtn">Preview Summary</button>
                    </div>
                </form>
                <div id="taxResult"></div>
            </div>
        `;
    },

    getDescription() {
        return `
            <h3>Level 3 - Tax Calculator Form</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Positive:</h5>
            <ul>
                <li>Complete form: $75000 income, married, standard deduction</li>
                <li>Itemized deductions with mortgage and charity</li>
                <li>Multiple income sources and dependents</li>
                <li>Expected: Accurate tax calculation with breakdown</li>
            </ul>
            
            <h5>Negative:</h5>
            <ul>
                <li>Empty required fields</li>
                <li>Invalid date formats</li>
                <li>Negative income or deduction amounts</li>
                <li>Missing radio button selections</li>
                <li>Expected: Clear validation error messages</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Test radio button group selections</li>
                <li>Verify checkbox state changes</li>
                <li>Handle date picker interactions</li>
                <li>Test conditional field visibility</li>
                <li>Validate number input constraints</li>
                <li>Check form reset functionality</li>
                <li>Verify calculation accuracy</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Radio button group automation</li>
                <li>Multiple checkbox handling</li>
                <li>Date picker interactions</li>
                <li>Conditional form sections</li>
                <li>Complex form validation</li>
                <li>Multi-step form workflows</li>
                <li>Dynamic content updates</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 3 - Tax Calculator Form');

        const taxForm = document.getElementById('taxForm');
        const taxResult = document.getElementById('taxResult');
        const deductionRadios = document.querySelectorAll('input[name="deductionType"]');
        const itemizedSection = document.getElementById('itemizedSection');
        const resetBtn = document.getElementById('resetBtn');
        const previewBtn = document.getElementById('previewBtn');

        if (taxForm && taxResult) {
            // Handle deduction type change to show/hide itemized section
            deductionRadios.forEach(radio => {
                radio.addEventListener('change', () => {
                    if (radio.value === 'itemized' && radio.checked) {
                        itemizedSection.style.display = 'block';
                    } else if (radio.value === 'standard' && radio.checked) {
                        itemizedSection.style.display = 'none';
                    }
                });
            });

            // Handle form submission
            taxForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateTax();
            });

            // Handle reset button
            resetBtn.addEventListener('click', () => {
                taxForm.reset();
                itemizedSection.style.display = 'none';
                this.clearResults();
            });

            // Handle preview button
            previewBtn.addEventListener('click', () => {
                this.showPreview();
            });
        }
    },

    calculateTax() {
        const formData = this.getFormData();
        const taxResult = document.getElementById('taxResult');

        // Clear previous results
        this.clearResults();

        // Validation
        const validation = this.validateForm(formData);
        if (!validation.isValid) {
            this.showResult(validation.message, 'error', taxResult);
            return;
        }

        // Calculate tax
        const calculation = this.performTaxCalculation(formData);

        // Display results
        const resultHtml = this.formatTaxResults(calculation);
        this.showResult(resultHtml, 'success', taxResult);
    },

    getFormData() {
        return {
            taxYear: document.getElementById('taxYear').value,
            birthDate: document.getElementById('birthDate').value,
            filingStatus: document.querySelector('input[name="filingStatus"]:checked')?.value,
            annualIncome: parseFloat(document.getElementById('annualIncome').value) || 0,
            dependents: parseInt(document.getElementById('dependents').value) || 0,
            deductionType: document.querySelector('input[name="deductionType"]:checked')?.value,
            mortgageInterest: parseFloat(document.getElementById('mortgageInterest').value) || 0,
            charitableDonations: parseFloat(document.getElementById('charitableDonations').value) || 0,
            stateTaxes: parseFloat(document.getElementById('stateTaxes').value) || 0,
            withheldTax: parseFloat(document.getElementById('withheldTax').value) || 0,
            estimatedPayments: parseFloat(document.getElementById('estimatedPayments').value) || 0,
            incomeTypes: Array.from(document.querySelectorAll('input[name="incomeTypes"]:checked')).map(cb => cb.value),
            benefits: Array.from(document.querySelectorAll('input[name="benefits"]:checked')).map(cb => cb.value)
        };
    },

    validateForm(data) {
        if (!data.taxYear) return { isValid: false, message: 'Please select a tax year' };
        if (!data.birthDate) return { isValid: false, message: 'Please enter your date of birth' };
        if (!data.filingStatus) return { isValid: false, message: 'Please select your filing status' };
        if (!data.annualIncome || data.annualIncome <= 0) return { isValid: false, message: 'Please enter a valid annual income' };
        if (!data.deductionType) return { isValid: false, message: 'Please select a deduction type' };

        return { isValid: true };
    },

    performTaxCalculation(data) {
        // Calculate age for senior discount
        const birthYear = new Date(data.birthDate).getFullYear();
        const currentYear = parseInt(data.taxYear);
        const age = currentYear - birthYear;

        // Standard deduction amounts
        const standardDeductions = {
            single: 13850,
            married: 27700,
            head: 20800
        };

        // Calculate deductions
        let totalDeductions = 0;
        if (data.deductionType === 'standard') {
            totalDeductions = standardDeductions[data.filingStatus] || 13850;
            if (age >= 65) totalDeductions += 1850; // Senior additional deduction
        } else {
            totalDeductions = data.mortgageInterest + data.charitableDonations + data.stateTaxes;
        }

        // Additional deductions for benefits
        let additionalDeductions = 0;
        if (data.benefits.includes('student')) additionalDeductions += 2500;
        if (data.benefits.includes('hsa')) additionalDeductions += 4150;
        if (data.benefits.includes('retirement')) additionalDeductions += 6500;

        // Dependent deduction
        const dependentDeduction = data.dependents * 4400;

        // Calculate taxable income
        const taxableIncome = Math.max(0, data.annualIncome - totalDeductions - additionalDeductions - dependentDeduction);

        // Tax brackets (simplified)
        let tax = 0;
        if (taxableIncome <= 11000) {
            tax = taxableIncome * 0.10;
        } else if (taxableIncome <= 44725) {
            tax = 1100 + (taxableIncome - 11000) * 0.12;
        } else if (taxableIncome <= 95375) {
            tax = 5147 + (taxableIncome - 44725) * 0.22;
        } else {
            tax = 16290 + (taxableIncome - 95375) * 0.24;
        }

        // Apply filing status adjustments
        if (data.filingStatus === 'married') tax *= 0.95; // 5% reduction for joint filing
        if (data.filingStatus === 'head') tax *= 0.97; // 3% reduction for head of household

        // Calculate final amounts
        const totalPayments = data.withheldTax + data.estimatedPayments;
        const finalTax = Math.max(0, tax);
        const refundOrOwed = totalPayments - finalTax;
        const effectiveRate = ((finalTax / data.annualIncome) * 100).toFixed(2);

        return {
            annualIncome: data.annualIncome,
            totalDeductions: totalDeductions + additionalDeductions + dependentDeduction,
            taxableIncome,
            tax: finalTax,
            totalPayments,
            refundOrOwed,
            effectiveRate,
            age,
            filingStatus: data.filingStatus
        };
    },

    formatTaxResults(calc) {
        const isRefund = calc.refundOrOwed > 0;
        return `
            <div class="tax-results">
                <h4>Tax Calculation Results</h4>
                <div class="results-grid">
                    <div class="result-item">
                        <span class="label">Annual Income:</span>
                        <span class="value">${calc.annualIncome.toLocaleString()}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Total Deductions:</span>
                        <span class="value">${calc.totalDeductions.toLocaleString()}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Taxable Income:</span>
                        <span class="value">${calc.taxableIncome.toLocaleString()}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Tax Calculated:</span>
                        <span class="value">${calc.tax.toLocaleString()}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Payments Made:</span>
                        <span class="value">${calc.totalPayments.toLocaleString()}</span>
                    </div>
                    <div class="result-item highlight">
                        <span class="label">${isRefund ? 'Refund Due:' : 'Amount Owed:'}</span>
                        <span class="value ${isRefund ? 'refund' : 'owed'}">${Math.abs(calc.refundOrOwed).toLocaleString()}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Effective Tax Rate:</span>
                        <span class="value">${calc.effectiveRate}%</span>
                    </div>
                </div>
            </div>
        `;
    },

    showPreview() {
        const formData = this.getFormData();
        const taxResult = document.getElementById('taxResult');

        const previewHtml = `
            <div class="form-preview">
                <h4>Form Preview</h4>
                <p><strong>Tax Year:</strong> ${formData.taxYear || 'Not selected'}</p>
                <p><strong>Filing Status:</strong> ${formData.filingStatus || 'Not selected'}</p>
                <p><strong>Annual Income:</strong> ${formData.annualIncome.toLocaleString()}</p>
                <p><strong>Dependents:</strong> ${formData.dependents}</p>
                <p><strong>Deduction Type:</strong> ${formData.deductionType || 'Not selected'}</p>
                <p><strong>Income Sources:</strong> ${formData.incomeTypes.length ? formData.incomeTypes.join(', ') : 'None selected'}</p>
                <p><strong>Benefits:</strong> ${formData.benefits.length ? formData.benefits.join(', ') : 'None selected'}</p>
            </div>
        `;

        this.showResult(previewHtml, 'success', taxResult);
    },

    clearResults() {
        const taxResult = document.getElementById('taxResult');
        taxResult.innerHTML = '';
        taxResult.className = '';
    },

    showResult(message, type, resultElement) {
        if (window.LevelManager) {
            LevelManager.showResult(message, type, resultElement);
        }
    }
};