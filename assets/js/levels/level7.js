// Level 7 - Drag & Drop Interface

window.Level7 = {
    draggedElement: null,
    draggedData: null,
    sourceContainer: null,
    dragStartPosition: null,
    history: [],
    maxHistory: 10,

    // Sample data for different drag scenarios
    tasks: [
        { id: 1, title: "Review project requirements", priority: "high", status: "todo" },
        { id: 2, title: "Update documentation", priority: "medium", status: "todo" },
        { id: 3, title: "Fix login bug", priority: "high", status: "inprogress" },
        { id: 4, title: "Create user interface mockups", priority: "low", status: "todo" },
        { id: 5, title: "Test payment integration", priority: "medium", status: "done" },
        { id: 6, title: "Deploy to staging", priority: "high", status: "inprogress" }
    ],

    files: [
        { id: 1, name: "report.pdf", type: "document", folder: "documents" },
        { id: 2, name: "vacation.jpg", type: "image", folder: "images" },
        { id: 3, name: "budget.xlsx", type: "spreadsheet", folder: "documents" },
        { id: 4, name: "presentation.pptx", type: "presentation", folder: "unsorted" },
        { id: 5, name: "photo.png", type: "image", folder: "unsorted" },
        { id: 6, name: "data.csv", type: "spreadsheet", folder: "unsorted" }
    ],

    shoppingItems: [
        { id: 1, name: "Laptop", category: "electronics", cart: false },
        { id: 2, name: "Apples", category: "food", cart: false },
        { id: 3, name: "T-Shirt", category: "clothing", cart: false },
        { id: 4, name: "Smartphone", category: "electronics", cart: true },
        { id: 5, name: "Bread", category: "food", cart: true },
        { id: 6, name: "Jeans", category: "clothing", cart: false }
    ],

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 7: Drag & Drop Interface</h2>
                
                <!-- Section Tabs -->
                <div class="section-tabs">
                    <button class="tab-btn active" data-section="tasks">Task Management</button>
                    <button class="tab-btn" data-section="kanban">Kanban Board</button>
                    <button class="tab-btn" data-section="files">File Organizer</button>
                    <button class="tab-btn" data-section="shopping">Shopping Cart</button>
                </div>

                <!-- Task Management Section -->
                <div class="drag-section active" id="tasks-section">
                    <h3>Task Priority Management</h3>
                    <p class="section-description">Drag tasks to reorder by priority. Higher priority tasks should be at the top.</p>
                    
                    <div class="task-container">
                        <div class="task-list" id="taskList">
                            <h4>Tasks <span class="action-hint">(Drag to reorder)</span></h4>
                            <div class="sortable-list" id="sortableTaskList">
                                ${this.renderTasks()}
                            </div>
                        </div>
                        
                        <div class="task-info">
                            <h4>Priority Guide</h4>
                            <div class="priority-guide">
                                <div class="priority-item high">🔴 High Priority</div>
                                <div class="priority-item medium">🟡 Medium Priority</div>
                                <div class="priority-item low">🟢 Low Priority</div>
                            </div>
                            
                            <div class="drag-instructions">
                                <h5>Instructions:</h5>
                                <ul>
                                    <li>Drag tasks using the ⋮⋮ handle</li>
                                    <li>Reorder by priority (high → low)</li>
                                    <li>Watch for visual feedback</li>
                                    <li>Use Undo to reverse changes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Kanban Board Section -->
                <div class="drag-section" id="kanban-section">
                    <h3>Kanban Workflow Board</h3>
                    <p class="section-description">Drag tasks between columns to track progress through your workflow.</p>
                    
                    <div class="kanban-board">
                        <div class="kanban-column" data-status="todo">
                            <h4>📋 To Do <span class="count" id="todoCount">${this.getTasksByStatus('todo').length}</span></h4>
                            <div class="kanban-list" id="todoList">
                                ${this.renderKanbanTasks('todo')}
                            </div>
                        </div>
                        
                        <div class="kanban-column" data-status="inprogress">
                            <h4>⚡ In Progress <span class="count" id="inprogressCount">${this.getTasksByStatus('inprogress').length}</span></h4>
                            <div class="kanban-list" id="inprogressList">
                                ${this.renderKanbanTasks('inprogress')}
                            </div>
                        </div>
                        
                        <div class="kanban-column" data-status="done">
                            <h4>✅ Done <span class="count" id="doneCount">${this.getTasksByStatus('done').length}</span></h4>
                            <div class="kanban-list" id="doneList">
                                ${this.renderKanbanTasks('done')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- File Organizer Section -->
                <div class="drag-section" id="files-section">
                    <h3>File Organization System</h3>
                    <p class="section-description">Drag files into appropriate folders to organize your workspace.</p>
                    
                    <div class="file-organizer">
                        <div class="file-area">
                            <h4>📁 Folders</h4>
                            <div class="folder-grid">
                                <div class="folder drop-zone" data-folder="documents">
                                    <div class="folder-icon">📄</div>
                                    <span>Documents</span>
                                    <small class="file-count">${this.getFilesByFolder('documents').length} files</small>
                                </div>
                                <div class="folder drop-zone" data-folder="images">
                                    <div class="folder-icon">🖼️</div>
                                    <span>Images</span>
                                    <small class="file-count">${this.getFilesByFolder('images').length} files</small>
                                </div>
                                <div class="folder drop-zone" data-folder="spreadsheets">
                                    <div class="folder-icon">📊</div>
                                    <span>Spreadsheets</span>
                                    <small class="file-count">${this.getFilesByFolder('spreadsheets').length} files</small>
                                </div>
                                <div class="folder drop-zone" data-folder="presentations">
                                    <div class="folder-icon">📊</div>
                                    <span>Presentations</span>
                                    <small class="file-count">${this.getFilesByFolder('presentations').length} files</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="file-area">
                            <h4>📎 Unsorted Files <span class="action-hint">(Drag to folders)</span></h4>
                            <div class="file-list" id="unsortedFiles">
                                ${this.renderUnsortedFiles()}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shopping Cart Section -->
                <div class="drag-section" id="shopping-section">
                    <h3>Shopping Cart Manager</h3>
                    <p class="section-description">Drag items to add to cart or organize by category.</p>
                    
                    <div class="shopping-container">
                        <div class="products-area">
                            <h4>🛍️ Available Products</h4>
                            <div class="product-categories">
                                <div class="category-section">
                                    <h5>📱 Electronics</h5>
                                    <div class="product-list">
                                        ${this.renderShoppingItems('electronics', false)}
                                    </div>
                                </div>
                                <div class="category-section">
                                    <h5>🍎 Food</h5>
                                    <div class="product-list">
                                        ${this.renderShoppingItems('food', false)}
                                    </div>
                                </div>
                                <div class="category-section">
                                    <h5>👕 Clothing</h5>
                                    <div class="product-list">
                                        ${this.renderShoppingItems('clothing', false)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="cart-area">
                            <div class="shopping-cart drop-zone" data-target="cart">
                                <h4>🛒 Shopping Cart</h4>
                                <div class="cart-items" id="cartItems">
                                    ${this.renderCartItems()}
                                </div>
                                <div class="cart-total">
                                    <strong>Items in cart: <span id="cartCount">${this.shoppingItems.filter(item => item.cart).length}</span></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Controls -->
                <div class="action-controls">
                    <button type="button" id="undoBtn" class="control-btn" disabled>
                        <span class="btn-icon">↶</span> Undo Last Action
                    </button>
                    <button type="button" id="resetBtn" class="control-btn danger">
                        <span class="btn-icon">🔄</span> Reset All
                    </button>
                    <button type="button" id="randomizeBtn" class="control-btn">
                        <span class="btn-icon">🎲</span> Randomize
                    </button>
                </div>

                <!-- Activity Log -->
                <div class="activity-log">
                    <h4>📊 Activity Log</h4>
                    <div class="log-entries" id="activityLog">
                        <p class="log-placeholder">Drag and drop actions will appear here...</p>
                    </div>
                </div>

                <div id="dragResult"></div>
            </div>
        `;
    },

    renderTasks() {
        return this.tasks.map(task => `
            <div class="task-item" draggable="true" data-task-id="${task.id}">
                <div class="drag-handle">⋮⋮</div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-priority ${task.priority}">${task.priority.toUpperCase()}</div>
                </div>
            </div>
        `).join('');
    },

    renderKanbanTasks(status) {
        return this.getTasksByStatus(status).map(task => `
            <div class="kanban-task" draggable="true" data-task-id="${task.id}" data-status="${task.status}">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span class="priority ${task.priority}">${task.priority}</span>
                    <span class="task-id">#${task.id}</span>
                </div>
            </div>
        `).join('');
    },

    renderUnsortedFiles() {
        return this.files.filter(file => file.folder === 'unsorted').map(file => `
            <div class="file-item" draggable="true" data-file-id="${file.id}">
                <div class="file-icon">${this.getFileIcon(file.type)}</div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-type">${file.type}</div>
                </div>
            </div>
        `).join('');
    },

    renderShoppingItems(category, inCart) {
        return this.shoppingItems
            .filter(item => item.category === category && item.cart === inCart)
            .map(item => `
                <div class="shopping-item" draggable="true" data-item-id="${item.id}">
                    <div class="item-name">${item.name}</div>
                    <div class="item-category">${item.category}</div>
                </div>
            `).join('');
    },

    renderCartItems() {
        const cartItems = this.shoppingItems.filter(item => item.cart);
        if (cartItems.length === 0) {
            return '<p class="empty-cart">Drag items here to add to cart</p>';
        }
        return cartItems.map(item => `
            <div class="cart-item" draggable="true" data-item-id="${item.id}">
                <span class="item-name">${item.name}</span>
                <span class="remove-item" data-item-id="${item.id}">×</span>
            </div>
        `).join('');
    },

    getDescription() {
        return `
            <h3>Level 7 - Drag & Drop Interface</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Task Management:</h5>
            <ul>
                <li>Drag tasks to reorder by priority</li>
                <li>Use drag handles for precise control</li>
                <li>Verify visual feedback during drag</li>
                <li>Test drop position accuracy</li>
            </ul>
            
            <h5>Kanban Workflow:</h5>
            <ul>
                <li>Move tasks between workflow columns</li>
                <li>Drag from To Do → In Progress → Done</li>
                <li>Verify column counts update correctly</li>
                <li>Test invalid drop zones</li>
            </ul>
            
            <h5>File Organization:</h5>
            <ul>
                <li>Drag files into appropriate folders</li>
                <li>Test file type validation for folders</li>
                <li>Verify folder counts update</li>
                <li>Check visual drop zone feedback</li>
            </ul>
            
            <h5>Shopping Cart:</h5>
            <ul>
                <li>Drag products to add to cart</li>
                <li>Remove items from cart</li>
                <li>Verify cart count updates</li>
                <li>Test drag between categories</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Use mouse actions for drag operations</li>
                <li>Wait for drag start/end animations</li>
                <li>Verify source and target elements</li>
                <li>Check for visual feedback states</li>
                <li>Test touch/mobile interactions</li>
                <li>Validate drop zone highlighting</li>
                <li>Verify state changes after drop</li>
                <li>Test undo/redo functionality</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Mouse action sequences</li>
                <li>Drag and drop automation</li>
                <li>Drop zone validation</li>
                <li>Visual state verification</li>
                <li>Touch interaction testing</li>
                <li>Complex multi-step operations</li>
                <li>State persistence validation</li>
                <li>Animation and timing handling</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 7 - Drag & Drop Interface');

        this.draggedElement = null;
        this.draggedData = null;
        this.sourceContainer = null;
        this.history = [];

        this.bindEvents();
        this.setupDragAndDrop();
    },

    bindEvents() {
        // Section tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.getAttribute('data-section'));
            });
        });

        // Control buttons
        document.getElementById('undoBtn')?.addEventListener('click', () => {
            this.undoLastAction();
        });

        document.getElementById('resetBtn')?.addEventListener('click', () => {
            this.resetAll();
        });

        document.getElementById('randomizeBtn')?.addEventListener('click', () => {
            this.randomizeItems();
        });

        // Remove cart items
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const itemId = parseInt(e.target.getAttribute('data-item-id'));
                this.removeFromCart(itemId);
            }
        });
    },

    setupDragAndDrop() {
        // Add drag event listeners to all draggable elements
        document.addEventListener('dragstart', (e) => {
            if (e.target.draggable) {
                this.handleDragStart(e);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.draggable) {
                this.handleDragEnd(e);
            }
        });

        document.addEventListener('dragover', (e) => {
            this.handleDragOver(e);
        });

        document.addEventListener('drop', (e) => {
            this.handleDrop(e);
        });

        document.addEventListener('dragenter', (e) => {
            this.handleDragEnter(e);
        });

        document.addEventListener('dragleave', (e) => {
            this.handleDragLeave(e);
        });
    },

    handleDragStart(e) {
        this.draggedElement = e.target;
        this.sourceContainer = e.target.parentElement;

        // Store drag data based on element type
        if (e.target.hasAttribute('data-task-id')) {
            this.draggedData = {
                type: 'task',
                id: parseInt(e.target.getAttribute('data-task-id')),
                status: e.target.getAttribute('data-status') || null
            };
        } else if (e.target.hasAttribute('data-file-id')) {
            this.draggedData = {
                type: 'file',
                id: parseInt(e.target.getAttribute('data-file-id'))
            };
        } else if (e.target.hasAttribute('data-item-id')) {
            this.draggedData = {
                type: 'shopping',
                id: parseInt(e.target.getAttribute('data-item-id'))
            };
        }

        // Store original position for undo
        this.dragStartPosition = {
            container: this.sourceContainer,
            nextSibling: e.target.nextElementSibling,
            index: Array.from(this.sourceContainer.children).indexOf(e.target)
        };

        // Add drag styling
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';

        // Set drag image
        e.dataTransfer.setDragImage(e.target, e.target.offsetWidth / 2, e.target.offsetHeight / 2);

        this.logActivity(`Started dragging ${this.draggedData.type} item`, 'info');
    },

    handleDragEnd(e) {
        // Remove drag styling
        e.target.classList.remove('dragging');

        // Remove all drop zone highlights
        document.querySelectorAll('.drop-zone-active, .drop-zone-invalid').forEach(el => {
            el.classList.remove('drop-zone-active', 'drop-zone-invalid');
        });

        // Clear drag data
        this.draggedElement = null;
        this.draggedData = null;
        this.sourceContainer = null;
    },

    handleDragOver(e) {
        e.preventDefault();

        const dropZone = this.getDropZone(e.target);
        if (dropZone && this.isValidDropTarget(dropZone)) {
            e.dataTransfer.dropEffect = 'move';
        } else {
            e.dataTransfer.dropEffect = 'none';
        }
    },

    handleDragEnter(e) {
        const dropZone = this.getDropZone(e.target);
        if (dropZone) {
            if (this.isValidDropTarget(dropZone)) {
                dropZone.classList.add('drop-zone-active');
                dropZone.classList.remove('drop-zone-invalid');
            } else {
                dropZone.classList.add('drop-zone-invalid');
                dropZone.classList.remove('drop-zone-active');
            }
        }
    },

    handleDragLeave(e) {
        const dropZone = this.getDropZone(e.target);
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('drop-zone-active', 'drop-zone-invalid');
        }
    },

    handleDrop(e) {
        e.preventDefault();

        const dropZone = this.getDropZone(e.target);
        if (!dropZone || !this.isValidDropTarget(dropZone)) {
            this.logActivity('Invalid drop target', 'error');
            return;
        }

        // Save action for undo
        this.saveActionForUndo();

        // Handle different drop scenarios
        if (this.draggedData.type === 'task') {
            this.handleTaskDrop(dropZone, e);
        } else if (this.draggedData.type === 'file') {
            this.handleFileDrop(dropZone);
        } else if (this.draggedData.type === 'shopping') {
            this.handleShoppingDrop(dropZone);
        }

        // Remove drop zone highlights
        dropZone.classList.remove('drop-zone-active', 'drop-zone-invalid');
    },

    handleTaskDrop(dropZone, e) {
        const task = this.tasks.find(t => t.id === this.draggedData.id);

        if (dropZone.classList.contains('kanban-list')) {
            // Kanban drop
            const newStatus = dropZone.parentElement.getAttribute('data-status');
            task.status = newStatus;
            this.updateKanbanBoard();
            this.logActivity(`Moved task "${task.title}" to ${newStatus}`, 'success');
        } else if (dropZone.classList.contains('sortable-list')) {
            // Sortable list drop
            this.handleSortableDrop(dropZone, e);
        }
    },

    handleFileDrop(dropZone) {
        const file = this.files.find(f => f.id === this.draggedData.id);
        const folder = dropZone.getAttribute('data-folder');

        // Validate file type for folder
        if (this.isValidFileForFolder(file, folder)) {
            file.folder = folder;
            this.updateFileOrganizer();
            this.logActivity(`Moved file "${file.name}" to ${folder} folder`, 'success');
        } else {
            this.logActivity(`File "${file.name}" cannot be placed in ${folder} folder`, 'error');
        }
    },

    handleShoppingDrop(dropZone) {
        const item = this.shoppingItems.find(i => i.id === this.draggedData.id);

        if (dropZone.getAttribute('data-target') === 'cart') {
            item.cart = true;
            this.updateShoppingCart();
            this.logActivity(`Added "${item.name}" to cart`, 'success');
        }
    },

    handleSortableDrop(dropZone, e) {
        const task = this.tasks.find(t => t.id === this.draggedData.id);
        const dropY = e.clientY;
        const elements = Array.from(dropZone.children);

        let insertIndex = elements.length;

        // Find insertion point
        for (let i = 0; i < elements.length; i++) {
            const rect = elements[i].getBoundingClientRect();
            if (dropY < rect.top + rect.height / 2) {
                insertIndex = i;
                break;
            }
        }

        // Reorder tasks array
        const currentIndex = this.tasks.indexOf(task);
        this.tasks.splice(currentIndex, 1);
        this.tasks.splice(insertIndex > currentIndex ? insertIndex - 1 : insertIndex, 0, task);

        this.updateTaskList();
        this.logActivity(`Reordered task "${task.title}"`, 'success');
    },

    getDropZone(element) {
        // Find the nearest drop zone
        let current = element;
        while (current && current !== document.body) {
            if (current.classList.contains('drop-zone') ||
                current.classList.contains('kanban-list') ||
                current.classList.contains('sortable-list')) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    },

    isValidDropTarget(dropZone) {
        if (!this.draggedData) return false;

        if (this.draggedData.type === 'task') {
            return dropZone.classList.contains('kanban-list') ||
                dropZone.classList.contains('sortable-list');
        } else if (this.draggedData.type === 'file') {
            return dropZone.classList.contains('drop-zone') &&
                dropZone.hasAttribute('data-folder');
        } else if (this.draggedData.type === 'shopping') {
            return dropZone.hasAttribute('data-target');
        }

        return false;
    },

    isValidFileForFolder(file, folder) {
        const validTypes = {
            'documents': ['document'],
            'images': ['image'],
            'spreadsheets': ['spreadsheet'],
            'presentations': ['presentation']
        };

        return validTypes[folder]?.includes(file.type) || folder === 'unsorted';
    },

    // Update functions
    updateTaskList() {
        const taskList = document.getElementById('sortableTaskList');
        if (taskList) {
            taskList.innerHTML = this.renderTasks();
        }
    },

    updateKanbanBoard() {
        ['todo', 'inprogress', 'done'].forEach(status => {
            const list = document.getElementById(`${status}List`);
            const count = document.getElementById(`${status}Count`);
            if (list) list.innerHTML = this.renderKanbanTasks(status);
            if (count) count.textContent = this.getTasksByStatus(status).length;
        });
    },

    updateFileOrganizer() {
        const unsortedFiles = document.getElementById('unsortedFiles');
        if (unsortedFiles) {
            unsortedFiles.innerHTML = this.renderUnsortedFiles();
        }

        // Update folder counts
        document.querySelectorAll('.file-count').forEach((count, index) => {
            const folders = ['documents', 'images', 'spreadsheets', 'presentations'];
            const folder = folders[index];
            if (folder) {
                count.textContent = `${this.getFilesByFolder(folder).length} files`;
            }
        });
    },

    updateShoppingCart() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');

        if (cartItems) cartItems.innerHTML = this.renderCartItems();
        if (cartCount) cartCount.textContent = this.shoppingItems.filter(item => item.cart).length;

        // Update product lists
        ['electronics', 'food', 'clothing'].forEach(category => {
            const elements = document.querySelectorAll(`[data-item-id]`);
            elements.forEach(el => {
                const itemId = parseInt(el.getAttribute('data-item-id'));
                const item = this.shoppingItems.find(i => i.id === itemId);
                if (item && item.category === category) {
                    const shouldShow = !item.cart;
                    el.style.display = shouldShow ? 'block' : 'none';
                }
            });
        });
    },

    // Utility functions
    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    },

    getFilesByFolder(folder) {
        return this.files.filter(file => file.folder === folder);
    },

    getFileIcon(type) {
        const icons = {
            'document': '📄',
            'image': '🖼️',
            'spreadsheet': '📊',
            'presentation': '📊'
        };
        return icons[type] || '📄';
    },

    switchSection(section) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.drag-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.logActivity(`Switched to ${section} section`, 'info');
    },

    // Action controls
    saveActionForUndo() {
        const state = {
            tasks: JSON.parse(JSON.stringify(this.tasks)),
            files: JSON.parse(JSON.stringify(this.files)),
            shoppingItems: JSON.parse(JSON.stringify(this.shoppingItems)),
            timestamp: Date.now()
        };

        this.history.push(state);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        document.getElementById('undoBtn').disabled = false;
    },

    undoLastAction() {
        if (this.history.length === 0) return;

        const lastState = this.history.pop();
        this.tasks = lastState.tasks;
        this.files = lastState.files;
        this.shoppingItems = lastState.shoppingItems;

        // Update all sections
        this.updateTaskList();
        this.updateKanbanBoard();
        this.updateFileOrganizer();
        this.updateShoppingCart();

        if (this.history.length === 0) {
            document.getElementById('undoBtn').disabled = true;
        }

        this.logActivity('Undid last action', 'info');
    },

    resetAll() {
        if (confirm('Are you sure you want to reset all items to their original state?')) {
            // Reset to initial state
            this.tasks = [
                { id: 1, title: "Review project requirements", priority: "high", status: "todo" },
                { id: 2, title: "Update documentation", priority: "medium", status: "todo" },
                { id: 3, title: "Fix login bug", priority: "high", status: "inprogress" },
                { id: 4, title: "Create user interface mockups", priority: "low", status: "todo" },
                { id: 5, title: "Test payment integration", priority: "medium", status: "done" },
                { id: 6, title: "Deploy to staging", priority: "high", status: "inprogress" }
            ];

            this.files = [
                { id: 1, name: "report.pdf", type: "document", folder: "documents" },
                { id: 2, name: "vacation.jpg", type: "image", folder: "images" },
                { id: 3, name: "budget.xlsx", type: "spreadsheet", folder: "documents" },
                { id: 4, name: "presentation.pptx", type: "presentation", folder: "unsorted" },
                { id: 5, name: "photo.png", type: "image", folder: "unsorted" },
                { id: 6, name: "data.csv", type: "spreadsheet", folder: "unsorted" }
            ];

            this.shoppingItems = [
                { id: 1, name: "Laptop", category: "electronics", cart: false },
                { id: 2, name: "Apples", category: "food", cart: false },
                { id: 3, name: "T-Shirt", category: "clothing", cart: false },
                { id: 4, name: "Smartphone", category: "electronics", cart: true },
                { id: 5, name: "Bread", category: "food", cart: true },
                { id: 6, name: "Jeans", category: "clothing", cart: false }
            ];

            this.history = [];
            document.getElementById('undoBtn').disabled = true;

            // Update all sections
            this.updateTaskList();
            this.updateKanbanBoard();
            this.updateFileOrganizer();
            this.updateShoppingCart();

            this.logActivity('Reset all items to original state', 'warning');
        }
    },

    randomizeItems() {
        this.saveActionForUndo();

        // Randomize task order
        this.tasks = this.shuffleArray([...this.tasks]);

        // Randomize task statuses
        const statuses = ['todo', 'inprogress', 'done'];
        this.tasks.forEach(task => {
            task.status = statuses[Math.floor(Math.random() * statuses.length)];
        });

        // Randomize file folders
        const folders = ['unsorted', 'documents', 'images', 'spreadsheets', 'presentations'];
        this.files.forEach(file => {
            file.folder = folders[Math.floor(Math.random() * folders.length)];
        });

        // Randomize shopping cart
        this.shoppingItems.forEach(item => {
            item.cart = Math.random() > 0.5;
        });

        // Update all sections
        this.updateTaskList();
        this.updateKanbanBoard();
        this.updateFileOrganizer();
        this.updateShoppingCart();

        this.logActivity('Randomized all items', 'info');
    },

    removeFromCart(itemId) {
        const item = this.shoppingItems.find(i => i.id === itemId);
        if (item) {
            this.saveActionForUndo();
            item.cart = false;
            this.updateShoppingCart();
            this.logActivity(`Removed "${item.name}" from cart`, 'info');
        }
    },

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    logActivity(message, type = 'info') {
        const logContainer = document.getElementById('activityLog');
        const timestamp = new Date().toLocaleTimeString();

        // Remove placeholder if it exists
        const placeholder = logContainer.querySelector('.log-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `
            <span class="log-time">${timestamp}</span>
            <span class="log-message">${message}</span>
        `;

        // Add to top of log
        logContainer.insertBefore(logEntry, logContainer.firstChild);

        // Keep only last 15 entries
        const entries = logContainer.querySelectorAll('.log-entry');
        if (entries.length > 15) {
            entries[entries.length - 1].remove();
        }
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('dragResult');
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