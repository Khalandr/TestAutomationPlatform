// Level 8 - Data Tables with Sorting

window.Level8 = {
    employees: [
        { id: 1, name: "Alice Johnson", email: "alice.johnson@company.com", department: "Engineering", position: "Senior Developer", salary: 85000, hireDate: "2020-03-15", status: "Active" },
        { id: 2, name: "Bob Smith", email: "bob.smith@company.com", department: "Marketing", position: "Marketing Manager", salary: 72000, hireDate: "2019-07-22", status: "Active" },
        { id: 3, name: "Carol Davis", email: "carol.davis@company.com", department: "Engineering", position: "DevOps Engineer", salary: 78000, hireDate: "2021-01-10", status: "Active" },
        { id: 4, name: "David Wilson", email: "david.wilson@company.com", department: "Sales", position: "Sales Representative", salary: 55000, hireDate: "2020-11-05", status: "Inactive" },
        { id: 5, name: "Emma Brown", email: "emma.brown@company.com", department: "HR", position: "HR Specialist", salary: 58000, hireDate: "2018-09-12", status: "Active" },
        { id: 6, name: "Frank Miller", email: "frank.miller@company.com", department: "Engineering", position: "Frontend Developer", salary: 75000, hireDate: "2021-06-18", status: "Active" },
        { id: 7, name: "Grace Lee", email: "grace.lee@company.com", department: "Finance", position: "Financial Analyst", salary: 68000, hireDate: "2019-12-03", status: "Active" },
        { id: 8, name: "Henry Garcia", email: "henry.garcia@company.com", department: "Sales", position: "Sales Manager", salary: 82000, hireDate: "2017-04-28", status: "Active" },
        { id: 9, name: "Ivy Chen", email: "ivy.chen@company.com", department: "Marketing", position: "Content Specialist", salary: 52000, hireDate: "2022-02-14", status: "Active" },
        { id: 10, name: "Jack Thompson", email: "jack.thompson@company.com", department: "Engineering", position: "Backend Developer", salary: 80000, hireDate: "2020-08-07", status: "Active" },
        { id: 11, name: "Kelly Martinez", email: "kelly.martinez@company.com", department: "HR", position: "HR Manager", salary: 75000, hireDate: "2018-05-20", status: "Active" },
        { id: 12, name: "Liam Rodriguez", email: "liam.rodriguez@company.com", department: "Finance", position: "Accountant", salary: 62000, hireDate: "2021-03-08", status: "Active" },
        { id: 13, name: "Mia Anderson", email: "mia.anderson@company.com", department: "Marketing", position: "Digital Marketing Specialist", salary: 59000, hireDate: "2020-10-15", status: "Inactive" },
        { id: 14, name: "Noah Taylor", email: "noah.taylor@company.com", department: "Engineering", position: "QA Engineer", salary: 70000, hireDate: "2019-11-30", status: "Active" },
        { id: 15, name: "Olivia Moore", email: "olivia.moore@company.com", department: "Sales", position: "Account Executive", salary: 65000, hireDate: "2021-09-12", status: "Active" },
        { id: 16, name: "Paul Jackson", email: "paul.jackson@company.com", department: "IT", position: "System Administrator", salary: 67000, hireDate: "2018-12-01", status: "Active" },
        { id: 17, name: "Quinn White", email: "quinn.white@company.com", department: "Engineering", position: "Tech Lead", salary: 95000, hireDate: "2017-08-14", status: "Active" },
        { id: 18, name: "Ruby Harris", email: "ruby.harris@company.com", department: "Design", position: "UX Designer", salary: 73000, hireDate: "2020-04-22", status: "Active" },
        { id: 19, name: "Sam Clark", email: "sam.clark@company.com", department: "Finance", position: "Finance Manager", salary: 85000, hireDate: "2017-01-15", status: "Active" },
        { id: 20, name: "Tina Lewis", email: "tina.lewis@company.com", department: "Marketing", position: "Brand Manager", salary: 78000, hireDate: "2019-06-08", status: "Active" },
        { id: 21, name: "Uma Patel", email: "uma.patel@company.com", department: "Engineering", position: "Data Scientist", salary: 92000, hireDate: "2021-11-25", status: "Active" },
        { id: 22, name: "Victor Kim", email: "victor.kim@company.com", department: "Sales", position: "Inside Sales Rep", salary: 48000, hireDate: "2022-01-03", status: "Active" },
        { id: 23, name: "Wendy Foster", email: "wendy.foster@company.com", department: "HR", position: "Recruiter", salary: 55000, hireDate: "2020-07-16", status: "Inactive" },
        { id: 24, name: "Xavier Bell", email: "xavier.bell@company.com", department: "IT", position: "Network Engineer", salary: 72000, hireDate: "2019-03-05", status: "Active" },
        { id: 25, name: "Yuki Tanaka", email: "yuki.tanaka@company.com", department: "Design", position: "Graphic Designer", salary: 58000, hireDate: "2021-05-30", status: "Active" }
    ],

    filteredEmployees: [],
    selectedRows: new Set(),
    currentSort: { column: null, direction: 'asc' },
    currentPage: 1,
    rowsPerPage: 10,
    filters: {
        search: '',
        department: '',
        status: ''
    },

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 8: Data Tables with Sorting</h2>
                
                <!-- Table Controls -->
                <div class="table-controls">
                    <div class="controls-row">
                        <div class="search-section">
                            <input type="text" id="searchInput" placeholder="🔍 Search employees..." class="search-input">
                        </div>
                        
                        <div class="filter-section">
                            <select id="departmentFilter" class="filter-select">
                                <option value="">All Departments</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="IT">IT</option>
                                <option value="Design">Design</option>
                            </select>
                            
                            <select id="statusFilter" class="filter-select">
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        
                        <div class="action-section">
                            <button type="button" id="exportBtn" class="action-btn secondary" disabled>
                                📊 Export Selected
                            </button>
                            <button type="button" id="deleteSelectedBtn" class="action-btn danger" disabled>
                                🗑️ Delete Selected
                            </button>
                        </div>
                    </div>
                    
                    <div class="info-row">
                        <div class="table-info">
                            <span class="info-item">
                                Showing <strong id="startRecord">1</strong>-<strong id="endRecord">10</strong> 
                                of <strong id="totalRecords">${this.employees.length}</strong> employees
                            </span>
                            <span class="info-item" id="selectedInfo" style="display: none;">
                                <strong id="selectedCount">0</strong> selected
                            </span>
                        </div>
                        
                        <div class="rows-per-page">
                            <label for="rowsPerPageSelect">Show:</label>
                            <select id="rowsPerPageSelect" class="page-size-select">
                                <option value="5">5</option>
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            <span>per page</span>
                        </div>
                    </div>
                </div>

                <!-- Data Table -->
                <div class="table-container">
                    <table class="data-table" id="employeeTable">
                        <thead>
                            <tr>
                                <th class="checkbox-column">
                                    <input type="checkbox" id="selectAllCheckbox" class="select-all-checkbox">
                                </th>
                                <th class="sortable" data-column="name">
                                    Name <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-column="email">
                                    Email <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-column="department">
                                    Department <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-column="position">
                                    Position <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable numeric" data-column="salary">
                                    Salary <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-column="hireDate">
                                    Hire Date <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-column="status">
                                    Status <span class="sort-indicator"></span>
                                </th>
                                <th class="actions-column">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            ${this.renderTableRows()}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="pagination-container">
                    <div class="pagination-info">
                        <span id="paginationInfo">Page 1 of 1</span>
                    </div>
                    <div class="pagination-controls" id="paginationControls">
                        ${this.renderPagination()}
                    </div>
                </div>

                <!-- Results -->
                <div class="table-results">
                    <h4>Table Actions Log</h4>
                    <div id="tableLog" class="action-log">
                        <p class="log-placeholder">Table actions will appear here...</p>
                    </div>
                </div>

                <div id="tableResult"></div>
            </div>
        `;
    },

    getDescription() {
        return `
            <h3>Level 8 - Data Tables with Sorting</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Column Sorting:</h5>
            <ul>
                <li>Click column headers to sort ascending/descending</li>
                <li>Sort by name, email, department, salary, date</li>
                <li>Verify sort indicators (↑↓) display correctly</li>
                <li>Test numeric vs alphabetic sorting</li>
            </ul>
            
            <h5>Search & Filtering:</h5>
            <ul>
                <li>Global search across all columns</li>
                <li>Filter by department dropdown</li>
                <li>Filter by status (Active/Inactive)</li>
                <li>Combine multiple filters</li>
                <li>Clear filters and verify reset</li>
            </ul>
            
            <h5>Row Selection:</h5>
            <ul>
                <li>Select individual rows with checkboxes</li>
                <li>Use "Select All" checkbox functionality</li>
                <li>Verify selected count updates</li>
                <li>Test bulk actions on selected rows</li>
            </ul>
            
            <h5>Pagination:</h5>
            <ul>
                <li>Navigate between pages</li>
                <li>Change rows per page (5, 10, 25, 50)</li>
                <li>Verify page counts and record ranges</li>
                <li>Test first/last page navigation</li>
            </ul>
            
            <h5>Data Actions:</h5>
            <ul>
                <li>Edit individual employee records</li>
                <li>Delete single or multiple employees</li>
                <li>Export selected data to CSV</li>
                <li>Verify data persistence after actions</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Wait for table updates after sorting/filtering</li>
                <li>Verify column sort indicators</li>
                <li>Check row selection state management</li>
                <li>Validate pagination calculations</li>
                <li>Test data export functionality</li>
                <li>Verify filter combinations work correctly</li>
                <li>Check responsive table behavior</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Table automation and verification</li>
                <li>Column sorting testing</li>
                <li>Search and filter validation</li>
                <li>Row selection automation</li>
                <li>Pagination navigation</li>
                <li>Bulk action testing</li>
                <li>Data export verification</li>
                <li>Complex data validation</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 8 - Data Tables with Sorting');

        this.filteredEmployees = [...this.employees];
        this.selectedRows = new Set();
        this.currentSort = { column: null, direction: 'asc' };
        this.currentPage = 1;
        this.rowsPerPage = 10;
        this.filters = { search: '', department: '', status: '' };

        this.bindEvents();
        this.updateTable();
    },

    bindEvents() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.updateTable();
            });
        }

        // Filter dropdowns
        const departmentFilter = document.getElementById('departmentFilter');
        const statusFilter = document.getElementById('statusFilter');

        if (departmentFilter) {
            departmentFilter.addEventListener('change', (e) => {
                this.filters.department = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.updateTable();
            });
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.updateTable();
            });
        }

        // Rows per page
        const rowsPerPageSelect = document.getElementById('rowsPerPageSelect');
        if (rowsPerPageSelect) {
            rowsPerPageSelect.addEventListener('change', (e) => {
                this.rowsPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.updateTable();
            });
        }

        // Sort headers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sortable') || e.target.parentElement.classList.contains('sortable')) {
                const header = e.target.classList.contains('sortable') ? e.target : e.target.parentElement;
                const column = header.getAttribute('data-column');
                this.sortTable(column);
            }
        });

        // Select all checkbox
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                this.toggleSelectAll(e.target.checked);
            });
        }

        // Row checkboxes (using event delegation)
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('row-checkbox')) {
                const employeeId = parseInt(e.target.value);
                this.toggleRowSelection(employeeId, e.target.checked);
            }
        });

        // Action buttons
        document.getElementById('exportBtn')?.addEventListener('click', () => {
            this.exportSelected();
        });

        document.getElementById('deleteSelectedBtn')?.addEventListener('click', () => {
            this.deleteSelected();
        });

        // Row actions (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const employeeId = parseInt(e.target.getAttribute('data-id'));
                this.editEmployee(employeeId);
            }

            if (e.target.classList.contains('delete-btn')) {
                const employeeId = parseInt(e.target.getAttribute('data-id'));
                this.deleteEmployee(employeeId);
            }
        });

        // Pagination (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                const page = parseInt(e.target.getAttribute('data-page'));
                this.goToPage(page);
            }

            if (e.target.classList.contains('prev-btn')) {
                this.goToPage(this.currentPage - 1);
            }

            if (e.target.classList.contains('next-btn')) {
                this.goToPage(this.currentPage + 1);
            }
        });
    },

    applyFilters() {
        this.filteredEmployees = this.employees.filter(employee => {
            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const searchableText = [
                    employee.name,
                    employee.email,
                    employee.department,
                    employee.position,
                    employee.salary.toString(),
                    employee.status
                ].join(' ').toLowerCase();

                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            // Department filter
            if (this.filters.department && employee.department !== this.filters.department) {
                return false;
            }

            // Status filter
            if (this.filters.status && employee.status !== this.filters.status) {
                return false;
            }

            return true;
        });

        this.logAction(`Applied filters: ${Object.entries(this.filters).filter(([k,v]) => v).map(([k,v]) => `${k}="${v}"`).join(', ') || 'none'}`, 'info');
    },

    sortTable(column) {
        // Toggle sort direction if same column, otherwise default to ascending
        if (this.currentSort.column === column) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.column = column;
            this.currentSort.direction = 'asc';
        }

        this.filteredEmployees.sort((a, b) => {
            let valueA = a[column];
            let valueB = b[column];

            // Handle different data types
            if (column === 'salary') {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            } else if (column === 'hireDate') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
            } else {
                valueA = valueA.toString().toLowerCase();
                valueB = valueB.toString().toLowerCase();
            }

            let comparison = 0;
            if (valueA > valueB) comparison = 1;
            if (valueA < valueB) comparison = -1;

            return this.currentSort.direction === 'desc' ? -comparison : comparison;
        });

        this.currentPage = 1; // Reset to first page after sorting
        this.updateTable();
        this.updateSortIndicators();
        this.logAction(`Sorted by ${column} (${this.currentSort.direction})`, 'info');
    },

    updateSortIndicators() {
        // Clear all indicators
        document.querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.textContent = '';
            indicator.className = 'sort-indicator';
        });

        // Set active indicator
        if (this.currentSort.column) {
            const activeHeader = document.querySelector(`[data-column="${this.currentSort.column}"] .sort-indicator`);
            if (activeHeader) {
                activeHeader.textContent = this.currentSort.direction === 'asc' ? '↑' : '↓';
                activeHeader.className = `sort-indicator active ${this.currentSort.direction}`;
            }
        }
    },

    toggleSelectAll(checked) {
        const currentPageEmployees = this.getCurrentPageEmployees();

        if (checked) {
            currentPageEmployees.forEach(emp => this.selectedRows.add(emp.id));
        } else {
            currentPageEmployees.forEach(emp => this.selectedRows.delete(emp.id));
        }

        this.updateTable();
        this.updateSelectionUI();
        this.logAction(`${checked ? 'Selected' : 'Deselected'} all visible rows`, 'info');
    },

    toggleRowSelection(employeeId, checked) {
        if (checked) {
            this.selectedRows.add(employeeId);
        } else {
            this.selectedRows.delete(employeeId);
        }

        this.updateSelectionUI();

        const employee = this.employees.find(emp => emp.id === employeeId);
        this.logAction(`${checked ? 'Selected' : 'Deselected'} employee: ${employee.name}`, 'info');
    },

    updateSelectionUI() {
        const selectedCount = this.selectedRows.size;
        const selectedInfo = document.getElementById('selectedInfo');
        const selectedCountEl = document.getElementById('selectedCount');
        const exportBtn = document.getElementById('exportBtn');
        const deleteBtn = document.getElementById('deleteSelectedBtn');

        // Update selected count display
        if (selectedCountEl) selectedCountEl.textContent = selectedCount;

        if (selectedInfo) {
            selectedInfo.style.display = selectedCount > 0 ? 'inline' : 'none';
        }

        // Enable/disable action buttons
        if (exportBtn) exportBtn.disabled = selectedCount === 0;
        if (deleteBtn) deleteBtn.disabled = selectedCount === 0;

        // Update select all checkbox state
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        const currentPageEmployees = this.getCurrentPageEmployees();
        const currentPageIds = currentPageEmployees.map(emp => emp.id);
        const selectedOnCurrentPage = currentPageIds.filter(id => this.selectedRows.has(id)).length;

        if (selectAllCheckbox) {
            if (selectedOnCurrentPage === 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            } else if (selectedOnCurrentPage === currentPageIds.length) {
                selectAllCheckbox.checked = true;
                selectAllCheckbox.indeterminate = false;
            } else {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = true;
            }
        }
    },

    getCurrentPageEmployees() {
        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        return this.filteredEmployees.slice(startIndex, endIndex);
    },

    renderTableRows() {
        const currentPageEmployees = this.getCurrentPageEmployees();

        if (currentPageEmployees.length === 0) {
            return `
                <tr class="no-data">
                    <td colspan="9" class="text-center">
                        <div class="no-data-message">
                            <span class="no-data-icon">📋</span>
                            <p>No employees found</p>
                            <small>Try adjusting your search or filters</small>
                        </div>
                    </td>
                </tr>
            `;
        }

        return currentPageEmployees.map(employee => `
            <tr class="data-row ${this.selectedRows.has(employee.id) ? 'selected' : ''}" data-id="${employee.id}">
                <td class="checkbox-cell">
                    <input type="checkbox" class="row-checkbox" value="${employee.id}" 
                           ${this.selectedRows.has(employee.id) ? 'checked' : ''}>
                </td>
                <td class="name-cell">
                    <div class="employee-name">
                        <strong>${employee.name}</strong>
                    </div>
                </td>
                <td class="email-cell">${employee.email}</td>
                <td class="department-cell">
                    <span class="department-badge ${employee.department.toLowerCase()}">${employee.department}</span>
                </td>
                <td class="position-cell">${employee.position}</td>
                <td class="salary-cell">$${employee.salary.toLocaleString()}</td>
                <td class="date-cell">${this.formatDate(employee.hireDate)}</td>
                <td class="status-cell">
                    <span class="status-badge ${employee.status.toLowerCase()}">${employee.status}</span>
                </td>
                <td class="actions-cell">
                    <button type="button" class="action-btn edit-btn" data-id="${employee.id}" title="Edit employee">✏️</button>
                    <button type="button" class="action-btn delete-btn" data-id="${employee.id}" title="Delete employee">🗑️</button>
                </td>
            </tr>
        `).join('');
    },

    renderPagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.rowsPerPage);

        if (totalPages <= 1) {
            return '<span class="no-pagination">All records shown</span>';
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <button type="button" class="pagination-btn prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>
                ← Previous
            </button>
        `;

        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationHTML += `<button type="button" class="pagination-btn page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button type="button" class="pagination-btn page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
            paginationHTML += `<button type="button" class="pagination-btn page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        paginationHTML += `
            <button type="button" class="pagination-btn next-btn" ${this.currentPage === totalPages ? 'disabled' : ''}>
                Next →
            </button>
        `;

        return paginationHTML;
    },

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.rowsPerPage);

        if (page < 1 || page > totalPages) return;

        this.currentPage = page;
        this.updateTable();
        this.logAction(`Navigated to page ${page}`, 'info');
    },

    updateTable() {
        // Update table body
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = this.renderTableRows();
        }

        // Update pagination
        const paginationControls = document.getElementById('paginationControls');
        if (paginationControls) {
            paginationControls.innerHTML = this.renderPagination();
        }

        // Update info displays
        this.updateTableInfo();
        this.updateSelectionUI();
    },

    updateTableInfo() {
        const totalRecords = this.filteredEmployees.length;
        const startRecord = totalRecords === 0 ? 0 : (this.currentPage - 1) * this.rowsPerPage + 1;
        const endRecord = Math.min(this.currentPage * this.rowsPerPage, totalRecords);
        const totalPages = Math.ceil(totalRecords / this.rowsPerPage);

        document.getElementById('startRecord').textContent = startRecord;
        document.getElementById('endRecord').textContent = endRecord;
        document.getElementById('totalRecords').textContent = totalRecords;
        document.getElementById('paginationInfo').textContent = `Page ${this.currentPage} of ${Math.max(1, totalPages)}`;
    },

    // CRUD Operations
    editEmployee(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (!employee) return;

        // Simple prompt-based editing (in real app, would use modal)
        const newName = prompt('Edit name:', employee.name);
        if (newName && newName.trim() !== employee.name) {
            employee.name = newName.trim();
            this.updateTable();
            this.logAction(`Updated employee name: ${employee.name}`, 'success');
        }
    },

    deleteEmployee(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (!employee) return;

        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            this.employees = this.employees.filter(emp => emp.id !== employeeId);
            this.selectedRows.delete(employeeId);
            this.applyFilters();
            this.updateTable();
            this.logAction(`Deleted employee: ${employee.name}`, 'warning');
        }
    },

    deleteSelected() {
        if (this.selectedRows.size === 0) return;

        const selectedEmployees = Array.from(this.selectedRows)
            .map(id => this.employees.find(emp => emp.id === id))
            .filter(emp => emp);

        if (confirm(`Are you sure you want to delete ${selectedEmployees.length} selected employee(s)?`)) {
            this.employees = this.employees.filter(emp => !this.selectedRows.has(emp.id));
            this.selectedRows.clear();
            this.applyFilters();
            this.updateTable();
            this.logAction(`Deleted ${selectedEmployees.length} selected employees`, 'warning');
        }
    },

    exportSelected() {
        if (this.selectedRows.size === 0) {
            this.logAction('No employees selected for export', 'error');
            return;
        }

        const selectedEmployees = Array.from(this.selectedRows)
            .map(id => this.employees.find(emp => emp.id === id))
            .filter(emp => emp);

        // Create CSV content
        const headers = ['Name', 'Email', 'Department', 'Position', 'Salary', 'Hire Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...selectedEmployees.map(emp => [
                `"${emp.name}"`,
                `"${emp.email}"`,
                `"${emp.department}"`,
                `"${emp.position}"`,
                emp.salary,
                emp.hireDate,
                emp.status
            ].join(','))
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employees_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.logAction(`Exported ${selectedEmployees.length} employees to CSV`, 'success');
    },

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    },

    logAction(message, type = 'info') {
        const logContainer = document.getElementById('tableLog');
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

        // Keep only last 20 entries
        const entries = logContainer.querySelectorAll('.log-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('tableResult');
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