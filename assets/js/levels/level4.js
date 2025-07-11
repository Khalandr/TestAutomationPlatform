// Level 4 - Shopping Cart

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
                
                <div class="shop-container">
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
                                <div class="price-row total-row">
                                    <span>Total:</span>
                                    <span id="total">$0.00</span>
                                </div>
                            </div>
                            
                            <div class="cart-actions">
                                <button type="button" id="clearCartBtn" class="secondary-btn">Clear Cart</button>
                                <button type="button" id="checkoutBtn" class="primary-btn">Checkout</button>
                            </div>
                        </div>
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
            <h3>Level 4 - Shopping Cart</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Positive:</h5>
            <ul>
                <li>Add items to cart and verify count</li>
                <li>Change quantities and verify totals</li>
                <li>Apply discount code "SAVE20" for 20% off</li>
                <li>Remove items from cart</li>
                <li>Complete checkout process</li>
                <li>Expected: Accurate calculations and cart updates</li>
            </ul>
            
            <h5>Negative:</h5>
            <ul>
                <li>Apply invalid discount codes</li>
                <li>Try to set negative quantities</li>
                <li>Checkout with empty cart</li>
                <li>Enter very large quantities</li>
                <li>Expected: Proper validation and error handling</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Test dynamic cart count updates</li>
                <li>Verify price calculations with different quantities</li>
                <li>Test discount code application and removal</li>
                <li>Validate cart persistence during session</li>
                <li>Check total calculations including tax</li>
                <li>Test remove item functionality</li>
                <li>Verify empty cart state handling</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Dynamic list management</li>
                <li>Mathematical calculations testing</li>
                <li>State management verification</li>
                <li>Complex user interactions</li>
                <li>Cart workflow automation</li>
                <li>Input validation testing</li>
                <li>Discount logic validation</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 4 - Shopping Cart');

        this.cart = []; // Reset cart
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
                this.checkout();
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

    checkout() {
        if (this.cart.length === 0) {
            this.showFeedback('Your cart is empty', 'error');
            return;
        }

        const total = this.calculateTotal();
        this.showFeedback(`Checkout successful! Total: $${total.total.toFixed(2)}`, 'success');

        // Simulate checkout
        setTimeout(() => {
            this.clearCart();
            this.showFeedback('Order confirmed! Your items will be delivered soon.', 'success');
        }, 1500);
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

        document.getElementById('subtotal').textContent = `$${totals.subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${totals.tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${totals.total.toFixed(2)}`;

        const discountRow = document.getElementById('discountRow');
        if (this.discountPercent > 0) {
            document.getElementById('discountPercent').textContent = this.discountPercent;
            document.getElementById('discountAmount').textContent = `-$${totals.discount.toFixed(2)}`;
            discountRow.style.display = 'flex';
        } else {
            discountRow.style.display = 'none';
        }
    },

    calculateTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = this.discountPercent ? (subtotal * this.discountPercent / 100) : 0;
        const afterDiscount = subtotal - discount;
        const tax = afterDiscount * 0.085; // 8.5% tax
        const total = afterDiscount + tax;

        return { subtotal, discount, tax, total };
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