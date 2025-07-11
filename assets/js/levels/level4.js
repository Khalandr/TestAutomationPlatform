// Level 4 - Shopping Cart with Multi-Step Checkout

window.Level4 = {
    cart: [],
    products: [
        { id: 1, name: "Laptop", price: 999.99, image: "💻" },
        { id: 2, name: "Phone", price: 599.99, image: "📱" },
        { id: 3, name: "Headphones", price: 199.99, image: "🎧" },
        { id: 4, name: "Tablet", price: 399.99, image: "📱" },
        { id: 5, name: "Watch", price: 299.99, image: "⌚" },
        { id: 6, name: "Speaker", price: 149.99, image: "🔊" }
    ],

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 4: Shopping Cart</h2>
                
                <!-- Shopping and Cart Section -->
                <div class="shop-container" id="shopContainer">
                    <div class="products-section">
                        <h3>Products</h3>
                        <div class="products-grid" id="productsGrid">
                            ${this.renderProducts()}
                        </div>
                    </div>
                    
                    <div class="cart-section">
                        <h3>Shopping Cart (<span id="cartCount">0</span>)</h3>
                        <div class="cart-items" id="cartItems">
                            <p class="empty-cart">Your cart is empty</p>
                        </div>
                        
                        <div class="cart-summary" id="cartSummary" style="display: none;">
                            <div class="discount-section">
                                <input type="text" id="discountCode" placeholder="Enter discount code">
                                <button type="button" id="applyDiscountBtn">Apply</button>
                            </div>
                            
                            <div class="price-breakdown">
                                <div class="price-row">
                                    <span>Subtotal:</span>
                                    <span id="subtotal">$0.00</span>
                                </div>
                                <div class="price-row discount-row" id="discountRow" style="display: none;">
                                    <span>Discount (<span id="discountPercent">0</span>%):</span>
                                    <span id="discountAmount">-$0.00</span>
                                </div>
                                <div class="price-row">
                                    <span>Tax (8.5%):</span>
                                    <span id="tax">$0.00</span>
                                </div>
                                <div class="price-row delivery-row" id="deliveryRow" style="display: none;">
                                    <span>Delivery:</span>
                                    <span id="deliveryCost">$0.00</span>
                                </div>
                                <div class="price-row total-row">
                                    <span>Total:</span>
                                    <span id="total">$0.00</span>
                                </div>
                            </div>
                            
                            <div class="cart-actions">
                                <button type="button" id="clearCartBtn" class="secondary-btn">Clear Cart</button>
                                <button type="button" id="checkoutBtn" class="primary-btn">Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Checkout Steps Container -->
                <div class="checkout-container" id="checkoutContainer" style="display: none;">
                    <div class="step-indicator">
                        <div class="step active" data-step="1">
                            <div class="step-number">1</div>
                            <div class="step-label">Cart</div>
                        </div>
                        <div class="step" data-step="2">
                            <div class="step-number">2</div>
                            <div class="step-label">Delivery</div>
                        </div>
                        <div class="step" data-step="3">
                            <div class="step-number">3</div>
                            <div class="step-label">Confirm</div>
                        </div>
                        <div class="step" data-step="4">
                            <div class="step-number">4</div>
                            <div class="step-label">Complete</div>
                        </div>
                    </div>
                    
                    <div class="checkout-steps">
                        <div id="checkoutStepContent"></div>
                    </div>
                </div>
                
                <div id="cartResult"></div>
            </div>
        `;
    },

    renderProducts() {
        return this.products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    },

    getDescription() {
        return `
            <h3>Level 4 - Shopping Cart with Checkout</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Cart Management:</h5>
            <ul>
                <li>Add items to cart and verify count</li>
                <li>Change quantities and verify totals</li>
                <li>Apply discount code "SAVE20" for 20% off</li>
                <li>Remove items from cart</li>
                <li>Clear entire cart</li>
            </ul>
            
            <h5>Checkout Process:</h5>
            <ul>
                <li>Complete 4-step checkout: Cart → Delivery → Confirm → Complete</li>
                <li>Select delivery options: Standard (Free), Express ($9.99), Next Day ($19.99), Pickup (Free)</li>
                <li>Fill delivery address form with validation</li>
                <li>Review order summary with all costs</li>
                <li>Complete order and receive confirmation</li>
            </ul>
            
            <h5>Negative Testing:</h5>
            <ul>
                <li>Try checkout with empty cart</li>
                <li>Apply invalid discount codes</li>
                <li>Submit delivery form with missing required fields</li>
                <li>Set negative or excessive quantities</li>
                <li>Navigate back/forward through checkout steps</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Test multi-step wizard navigation</li>
                <li>Verify step indicators update correctly</li>
                <li>Validate form field requirements</li>
                <li>Test radio button and dropdown selections</li>
                <li>Verify delivery cost calculations</li>
                <li>Check order summary accuracy</li>
                <li>Test back/continue button functionality</li>
                <li>Validate final order completion</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Multi-step workflow automation</li>
                <li>Complex form validation testing</li>
                <li>Dynamic pricing calculations</li>
                <li>Radio button and checkbox handling</li>
                <li>Address form automation</li>
                <li>Order confirmation flows</li>
                <li>State persistence across steps</li>
                <li>Step indicator automation</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 4 - Shopping Cart');

        this.cart = []; // Reset cart
        this.currentStep = 1;
        this.checkoutData = {
            deliveryMethod: null,
            deliveryAddress: {},
            orderNumber: null
        };
        this.discountPercent = 0;
        this.bindEvents();
        this.updateCartDisplay();
    },

    bindEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                this.addToCart(productId);
            }
        });

        // Cart quantity changes
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                const newQuantity = parseInt(e.target.value);
                this.updateQuantity(productId, newQuantity);
            }
        });

        // Remove item buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item-btn')) {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                this.removeFromCart(productId);
            }
        });

        // Discount code
        const applyDiscountBtn = document.getElementById('applyDiscountBtn');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', () => {
                this.applyDiscount();
            });
        }

        // Cart actions
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                this.clearCart();
            });
        }

        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.startCheckout();
            });
        }
    },

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.showFeedback(`${product.name} added to cart!`, 'success');
    },

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        if (newQuantity > 99) {
            this.showFeedback('Maximum quantity is 99', 'error');
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.updateCartDisplay();
        }
    },

    removeFromCart(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const item = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.updateCartDisplay();
            this.showFeedback(`${item.name} removed from cart`, 'success');
        }
    },

    clearCart() {
        this.cart = [];
        this.updateCartDisplay();
        this.showFeedback('Cart cleared', 'success');
    },

    applyDiscount() {
        const discountCode = document.getElementById('discountCode').value.trim().toUpperCase();
        const validCodes = {
            'SAVE20': 20,
            'SAVE10': 10,
            'WELCOME': 15
        };

        if (validCodes[discountCode]) {
            this.discountPercent = validCodes[discountCode];
            this.updateCartDisplay();
            this.showFeedback(`${discountCode} applied! ${this.discountPercent}% discount`, 'success');
        } else if (discountCode) {
            this.showFeedback('Invalid discount code', 'error');
        }
    },

    startCheckout() {
        if (this.cart.length === 0) {
            this.showFeedback('Your cart is empty', 'error');
            return;
        }

        document.getElementById('shopContainer').style.display = 'none';
        document.getElementById('checkoutContainer').style.display = 'block';
        this.currentStep = 2;
        this.updateStepIndicator();
        this.renderCheckoutStep();
    },

    updateStepIndicator() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');

            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
    },

    renderCheckoutStep() {
        const stepContent = document.getElementById('checkoutStepContent');

        switch (this.currentStep) {
            case 2:
                stepContent.innerHTML = this.renderDeliveryStep();
                this.bindDeliveryEvents();
                break;
            case 3:
                stepContent.innerHTML = this.renderConfirmationStep();
                this.bindConfirmationEvents();
                break;
            case 4:
                stepContent.innerHTML = this.renderCompleteStep();
                this.bindCompleteEvents();
                break;
        }
    },

    renderDeliveryStep() {
        return `
            <div class="delivery-step">
                <h3>Choose Delivery Option</h3>
                
                <div class="delivery-options">
                    <label class="delivery-option">
                        <input type="radio" name="deliveryMethod" value="standard" data-cost="0">
                        <div class="option-content">
                            <div class="option-header">
                                <span class="option-title">Standard Delivery</span>
                                <span class="option-price">Free</span>
                            </div>
                            <div class="option-description">5-7 business days</div>
                        </div>
                    </label>
                    
                    <label class="delivery-option">
                        <input type="radio" name="deliveryMethod" value="express" data-cost="9.99">
                        <div class="option-content">
                            <div class="option-header">
                                <span class="option-title">Express Delivery</span>
                                <span class="option-price">$9.99</span>
                            </div>
                            <div class="option-description">2-3 business days</div>
                        </div>
                    </label>
                    
                    <label class="delivery-option">
                        <input type="radio" name="deliveryMethod" value="nextday" data-cost="19.99">
                        <div class="option-content">
                            <div class="option-header">
                                <span class="option-title">Next Day Delivery</span>
                                <span class="option-price">$19.99</span>
                            </div>
                            <div class="option-description">Next business day</div>
                        </div>
                    </label>
                    
                    <label class="delivery-option">
                        <input type="radio" name="deliveryMethod" value="pickup" data-cost="0">
                        <div class="option-content">
                            <div class="option-header">
                                <span class="option-title">Store Pickup</span>
                                <span class="option-price">Free</span>
                            </div>
                            <div class="option-description">Ready in 2-4 hours</div>
                        </div>
                    </label>
                </div>
                
                <div class="delivery-address" id="deliveryAddressSection" style="display: none;">
                    <h5>Delivery Address</h5>
                    <div class="address-grid">
                        <input type="text" id="firstName" placeholder="First Name" required>
                        <input type="text" id="lastName" placeholder="Last Name" required>
                        <input type="text" id="streetAddress" placeholder="Street Address" class="full-width" required>
                        <input type="text" id="city" placeholder="City" required>
                        <select id="state" required>
                            <option value="">Select State</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="WA">Washington</option>
                        </select>
                        <input type="text" id="zipCode" placeholder="ZIP Code" required>
                        <input type="tel" id="phoneNumber" placeholder="Phone Number" class="full-width" required>
                        <textarea id="specialInstructions" placeholder="Special delivery instructions (optional)" class="full-width" rows="3"></textarea>
                    </div>
                </div>
                
                <div class="step-actions">
                    <button type="button" id="backToCartBtn" class="secondary-btn">Back to Cart</button>
                    <button type="button" id="continueToConfirmBtn" class="primary-btn" disabled>Continue</button>
                </div>
            </div>
        `;
    },

    renderConfirmationStep() {
        const totals = this.calculateTotal();
        const deliveryInfo = this.getDeliveryInfo();

        return `
            <div class="confirmation-step">
                <h3>Order Confirmation</h3>
                
                <div class="confirmation-sections">
                    <div class="order-summary">
                        <h5>Order Summary</h5>
                        <div class="order-items">
                            ${this.cart.map(item => `
                                <div class="summary-item">
                                    <span>${item.name} × ${item.quantity}</span>
                                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="order-totals">
                            <div class="total-line">
                                <span>Subtotal:</span>
                                <span>$${totals.subtotal.toFixed(2)}</span>
                            </div>
                            ${totals.discount > 0 ? `
                                <div class="total-line discount">
                                    <span>Discount (${this.discountPercent}%):</span>
                                    <span>-$${totals.discount.toFixed(2)}</span>
                                </div>
                            ` : ''}
                            <div class="total-line">
                                <span>Tax (8.5%):</span>
                                <span>$${totals.tax.toFixed(2)}</span>
                            </div>
                            <div class="total-line">
                                <span>Delivery:</span>
                                <span>${totals.delivery > 0 ? '$' + totals.delivery.toFixed(2) : 'Free'}</span>
                            </div>
                            <div class="total-line final">
                                <span>Total:</span>
                                <span>$${totals.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="delivery-summary">
                        <h5>Delivery Information</h5>
                        <p><strong>Method:</strong> ${deliveryInfo.title}</p>
                        <p><strong>Cost:</strong> ${deliveryInfo.cost > 0 ? '$' + deliveryInfo.cost.toFixed(2) : 'Free'}</p>
                        <p><strong>Estimated:</strong> ${deliveryInfo.timeframe}</p>
                        
                        ${this.checkoutData.deliveryMethod !== 'pickup' ? `
                            <div class="address-summary">
                                <p><strong>${this.checkoutData.deliveryAddress.firstName} ${this.checkoutData.deliveryAddress.lastName}</strong></p>
                                <p>${this.checkoutData.deliveryAddress.streetAddress}</p>
                                <p>${this.checkoutData.deliveryAddress.city}, ${this.checkoutData.deliveryAddress.state} ${this.checkoutData.deliveryAddress.zipCode}</p>
                                <p>${this.checkoutData.deliveryAddress.phoneNumber}</p>
                                ${this.checkoutData.deliveryAddress.specialInstructions ?
            `<p><em>Instructions: ${this.checkoutData.deliveryAddress.specialInstructions}</em></p>` : ''}
                            </div>
                        ` : '<p><strong>Store Address:</strong><br>123 Main St<br>Anytown, CA 90210</p>'}
                    </div>
                </div>
                
                <div class="step-actions">
                    <button type="button" id="backToDeliveryBtn" class="secondary-btn">Back to Delivery</button>
                    <button type="button" id="confirmOrderBtn" class="primary-btn">Confirm Order</button>
                </div>
            </div>
        `;
    },

    renderCompleteStep() {
        const orderNumber = this.checkoutData.orderNumber;
        const deliveryInfo = this.getDeliveryInfo();
        const estimatedDate = this.getEstimatedDeliveryDate();

        return `
            <div class="complete-step">
                <div class="success-icon">✅</div>
                <h4>Order Complete!</h4>
                <p>Thank you for your purchase. Your order has been confirmed.</p>
                
                <div class="order-details">
                    <p><strong>Order Number:</strong> ${orderNumber}</p>
                    <p><strong>Delivery Method:</strong> ${deliveryInfo.title}</p>
                    <p><strong>Estimated ${this.checkoutData.deliveryMethod === 'pickup' ? 'Ready' : 'Delivery'}:</strong> ${estimatedDate}</p>
                    <p><strong>Total:</strong> $${this.calculateTotal().total.toFixed(2)}</p>
                </div>
                
                <div class="step-actions">
                    <button type="button" id="continueShoppingBtn" class="primary-btn">Continue Shopping</button>
                    <button type="button" id="trackOrderBtn" class="secondary-btn">Track Order</button>
                </div>
            </div>
        `;
    },

    bindDeliveryEvents() {
        // Delivery method selection
        const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateDeliverySelection();
            });
        });

        // Address form changes
        const addressInputs = document.querySelectorAll('#deliveryAddressSection input, #deliveryAddressSection select');
        addressInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateDeliveryForm();
            });
        });

        // Back to cart
        document.getElementById('backToCartBtn').addEventListener('click', () => {
            this.backToCart();
        });

        // Continue to confirmation
        document.getElementById('continueToConfirmBtn').addEventListener('click', () => {
            this.continueToConfirmation();
        });
    },

    bindConfirmationEvents() {
        document.getElementById('backToDeliveryBtn').addEventListener('click', () => {
            this.backToDelivery();
        });

        document.getElementById('confirmOrderBtn').addEventListener('click', () => {
            this.confirmOrder();
        });
    },

    bindCompleteEvents() {
        document.getElementById('continueShoppingBtn').addEventListener('click', () => {
            this.continueShopping();
        });

        document.getElementById('trackOrderBtn').addEventListener('click', () => {
            this.trackOrder();
        });
    },

    updateDeliverySelection() {
        const selectedMethod = document.querySelector('input[name="deliveryMethod"]:checked');
        const addressSection = document.getElementById('deliveryAddressSection');
        const continueBtn = document.getElementById('continueToConfirmBtn');

        if (selectedMethod) {
            this.checkoutData.deliveryMethod = selectedMethod.value;
            this.checkoutData.deliveryCost = parseFloat(selectedMethod.getAttribute('data-cost'));

            // Show/hide address section
            if (selectedMethod.value === 'pickup') {
                addressSection.style.display = 'none';
                continueBtn.disabled = false;
            } else {
                addressSection.style.display = 'block';
                this.validateDeliveryForm();
            }

            // Update pricing in main cart summary if visible
            this.updatePricingSummary();
        }
    },

    validateDeliveryForm() {
        const continueBtn = document.getElementById('continueToConfirmBtn');

        if (this.checkoutData.deliveryMethod === 'pickup') {
            continueBtn.disabled = false;
            return;
        }

        const requiredFields = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zipCode', 'phoneNumber'];
        const isValid = requiredFields.every(fieldId => {
            const field = document.getElementById(fieldId);
            return field && field.value.trim() !== '';
        });

        continueBtn.disabled = !isValid;
    },

    continueToConfirmation() {
        // Save address data if not pickup
        if (this.checkoutData.deliveryMethod !== 'pickup') {
            this.checkoutData.deliveryAddress = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                streetAddress: document.getElementById('streetAddress').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                specialInstructions: document.getElementById('specialInstructions').value
            };
        }

        this.currentStep = 3;
        this.updateStepIndicator();
        this.renderCheckoutStep();
    },

    confirmOrder() {
        // Generate order number
        this.checkoutData.orderNumber = 'ORD' + Date.now().toString().substr(-6);

        this.currentStep = 4;
        this.updateStepIndicator();
        this.renderCheckoutStep();
    },

    backToCart() {
        document.getElementById('checkoutContainer').style.display = 'none';
        document.getElementById('shopContainer').style.display = 'block';
        this.currentStep = 1;
    },

    backToDelivery() {
        this.currentStep = 2;
        this.updateStepIndicator();
        this.renderCheckoutStep();
    },

    continueShopping() {
        this.cart = [];
        this.checkoutData = {
            deliveryMethod: null,
            deliveryAddress: {},
            orderNumber: null
        };
        this.discountPercent = 0;

        document.getElementById('checkoutContainer').style.display = 'none';
        document.getElementById('shopContainer').style.display = 'block';
        this.currentStep = 1;
        this.updateCartDisplay();
        this.showFeedback('Ready for new orders!', 'success');
    },

    trackOrder() {
        this.showFeedback(`Order ${this.checkoutData.orderNumber} is being prepared. You will receive updates via email.`, 'success');
    },

    getDeliveryInfo() {
        const deliveryOptions = {
            standard: { title: 'Standard Delivery', cost: 0, timeframe: '5-7 business days' },
            express: { title: 'Express Delivery', cost: 9.99, timeframe: '2-3 business days' },
            nextday: { title: 'Next Day Delivery', cost: 19.99, timeframe: '1 business day' },
            pickup: { title: 'Store Pickup', cost: 0, timeframe: '2-4 hours' }
        };

        return deliveryOptions[this.checkoutData.deliveryMethod] || deliveryOptions.standard;
    },

    getEstimatedDeliveryDate() {
        const today = new Date();
        const deliveryDays = {
            standard: 7,
            express: 3,
            nextday: 1,
            pickup: 0
        };

        const days = deliveryDays[this.checkoutData.deliveryMethod] || 7;
        const estimatedDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

        return estimatedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartSummary = document.getElementById('cartSummary');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartSummary.style.display = 'none';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="item-image">${item.image}</div>
                    <div class="item-details">
                        <h4 class="item-name">${item.name}</h4>
                        <p class="item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-controls">
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="99" data-product-id="${item.id}">
                        <button class="remove-item-btn" data-product-id="${item.id}">Remove</button>
                    </div>
                    <div class="item-total">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            `).join('');

            cartSummary.style.display = 'block';
            this.updatePricingSummary();
        }
    },

    updatePricingSummary() {
        const totals = this.calculateTotal();

        document.getElementById('subtotal').textContent = `${totals.subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `${totals.tax.toFixed(2)}`;
        document.getElementById('total').textContent = `${totals.total.toFixed(2)}`;

        // Show/hide discount row
        const discountRow = document.getElementById('discountRow');
        if (this.discountPercent > 0) {
            document.getElementById('discountPercent').textContent = this.discountPercent;
            document.getElementById('discountAmount').textContent = `-${totals.discount.toFixed(2)}`;
            discountRow.style.display = 'flex';
        } else {
            discountRow.style.display = 'none';
        }

        // Show/hide delivery row
        const deliveryRow = document.getElementById('deliveryRow');
        const deliveryCostElement = document.getElementById('deliveryCost');
        if (deliveryCostElement && totals.delivery > 0) {
            deliveryCostElement.textContent = `${totals.delivery.toFixed(2)}`;
            deliveryRow.style.display = 'flex';
        } else if (deliveryCostElement) {
            deliveryCostElement.textContent = 'Free';
            deliveryRow.style.display = 'flex';
        }
    },

    calculateTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = this.discountPercent ? (subtotal * this.discountPercent / 100) : 0;
        const afterDiscount = subtotal - discount;
        const tax = afterDiscount * 0.085; // 8.5% tax
        const delivery = this.checkoutData.deliveryCost || 0;
        const total = afterDiscount + tax + delivery;

        return { subtotal, discount, tax, delivery, total };
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('cartResult');
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