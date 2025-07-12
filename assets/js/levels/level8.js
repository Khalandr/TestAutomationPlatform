// level8.js - Data Tables with Sorting

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
    importData: null,
    validationErrors: [],

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 8: Data Tables with Sorting</h2>
                
                <!-- Import Section -->
                <div class="import-section" id="importSection">
                    <h4>📤 Import Employee Data</h4>
                    
                    <div class="import-controls">
                        <div class="file-input-wrapper">
                            <input type="file" id="csvFileInput" accept=".csv" />
                            <label for="csvFileInput" class="file-input-label">
                                📁 Choose CSV File
                            </label>
                        </div>
                        
                        <button type="button" id="downloadTemplateBtn" class="action-btn secondary">
                            📋 Download Template
                        </button>
                        
                        <button type="button" id="cancelImportBtn" class="action-btn">
                            ✖️ Cancel
                        </button>
                    </div>
                    
                    <div class="drop-zone" id="csvDropZone">
                        <div class="drop-zone-content">
                            <div class="drop-icon">📂</div>
                            <div class="drop-text">Drag and drop your CSV file here</div>
                            <div class="drop-subtext">or click "Choose CSV File" button above</div>
                        </div>
                    </div>
                    
                    <div class="file-info" id="fileInfo">
                        <div class="file-details">
                            <span class="file-name" id="fileName"></span>
                            <span class="file-size" id="fileSize"></span>
                        </div>
                        
                        <div class="import-preview" id="importPreview"></div>
                        
                        <div class="validation-errors" id="validationErrors">
                            <h5>Validation Errors:</h5>
                            <ul class="error-list" id="errorList"></ul>
                        </div>
                        
                        <div class="import-actions">
                            <button type="button" id="validateBtn" class="action-btn secondary">
                                ✅ Validate Data
                            </button>
                            <button type="button" id="confirmImportBtn" class="action-btn success" disabled>
                                📤 Import Data
                            </button>
                        </div>
                    </div>
                </div>

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
                            <button type="button" id="importBtn" class="action-btn success">
                                📤 Import Data
                            </button>
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
            
            <h5>Data Import:</h5>
            <ul>
                <li>Import employee data from CSV files</li>
                <li>Download CSV template with sample data</li>
                <li>Drag and drop CSV files for import</li>
                <li>Validate data before importing</li>
                <li>Handle duplicate emails and validation errors</li>
                <li>Preview import data before confirmation</li>
            </ul>
            
            <h5>Data Export:</h5>
            <ul>
                <li>Export selected employees to CSV</li>
                <li>Include all employee information in export</li>
                <li>Automatic filename with timestamp</li>
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
                <li>Import CSV files with validation</li>
                <li>Export selected data to CSV</li>
                <li>Edit individual employee records</li>
                <li>Delete single or multiple employees</li>
                <li>Verify data persistence after actions</li>
                <li>Handle file upload errors and validation</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Wait for table updates after sorting/filtering</li>
                <li>Verify column sort indicators</li>
                <li>Check row selection state management</li>
                <li>Validate pagination calculations</li>
                <li>Test file upload and drag-drop functionality</li>
                <li>Verify import validation and error handling</li>
                <li>Test data export functionality</li>
                <li>Verify filter combinations work correctly</li>
                <li>Check responsive table behavior and scrolling</li>
                <li>Test CSV parsing with various file formats</li>
                <li>Validate template download functionality</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Table automation and verification</li>
                <li>Column sorting testing</li>
                <li>Search and filter validation</li>
                <li>Row selection automation</li>
                <li>Pagination navigation</li>
                <li>File upload automation</li>
                <li>Drag and drop testing</li>
                <li>CSV data validation</li>
                <li>Bulk action testing</li>
                <li>Data export/import verification</li>
                <li>Error handling validation</li>
                <li>Complex data validation</li>
                <li>Responsive design testing</li>
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
        this.importData = null;
        this.validationErrors = [];

        this.bindEvents();
        this.updateTable();
        this.checkTableScroll();
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
                if (column) {
                    this.sortTable(column);
                }
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
        document.getElementById('importBtn')?.addEventListener('click', () => {
            this.showImportSection();
        });

        document.getElementById('exportBtn')?.addEventListener('click', () => {
            this.exportSelected();
        });

        document.getElementById('deleteSelectedBtn')?.addEventListener('click', () => {
            this.deleteSelected();
        });

        // Import functionality
        document.getElementById('csvFileInput')?.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        document.getElementById('downloadTemplateBtn')?.addEventListener('click', () => {
            this.downloadTemplate();
        });

        document.getElementById('cancelImportBtn')?.addEventListener('click', () => {
            this.hideImportSection();
        });

        document.getElementById('validateBtn')?.addEventListener('click', () => {
            this.validateImportData();
        });

        document.getElementById('confirmImportBtn')?.addEventListener('click', () => {
            this.confirmImport();
        });

        // Drag and drop
        const dropZone = document.getElementById('csvDropZone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            });
        }

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
        console.log('sortTable called with column:', column);
        console.log('Current sort:', this.currentSort);

        // Toggle sort direction if same column, otherwise default to ascending
        if (this.currentSort.column === column) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.column = column;
            this.currentSort.direction = 'asc';
        }

        console.log('New sort:', this.currentSort);

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
            indicator.classList.remove('active', 'asc', 'desc');
        });

        // Set active indicator
        if (this.currentSort.column) {
            const activeHeader = document.querySelector(`[data-column="${this.currentSort.column}"] .sort-indicator`);
            if (activeHeader) {
                activeHeader.textContent = this.currentSort.direction === 'asc' ? '↑' : '↓';
                activeHeader.classList.add('active', this.currentSort.direction);
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

        // Check scroll after update
        setTimeout(() => this.checkTableScroll(), 100);
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

    // Import functionality
    showImportSection() {
        const importSection = document.getElementById('importSection');
        const tableControls = document.querySelector('.table-controls');

        if (importSection) {
            importSection.classList.add('active');
        }

        // Hide table controls
        if (tableControls) {
            tableControls.style.display = 'none';
        }

        this.logAction('Import section opened', 'info');
    },

    hideImportSection() {
        const importSection = document.getElementById('importSection');
        const tableControls = document.querySelector('.table-controls');
        const fileInfo = document.getElementById('fileInfo');

        if (importSection) {
            importSection.classList.remove('active');
        }

        // Show table controls
        if (tableControls) {
            tableControls.style.display = 'block';
        }

        // Reset import state
        if (fileInfo) {
            fileInfo.classList.remove('show');
        }

        this.importData = null;
        this.validationErrors = [];

        // Reset file input
        const fileInput = document.getElementById('csvFileInput');
        if (fileInput) {
            fileInput.value = '';
        }

        this.logAction('Import cancelled', 'info');
    },

    handleFileSelect(file) {
        if (!file) return;

        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            this.showFeedback('Please select a CSV file', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            this.showFeedback('File size must be less than 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.parseCSV(e.target.result, file);
        };
        reader.readAsText(file);

        // Show file info
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('fileSize').textContent = this.formatFileSize(file.size);
        document.getElementById('fileInfo').classList.add('show');

        this.logAction(`File selected: ${file.name}`, 'info');
    },

    parseCSV(csvText, file) {
        try {
            const lines = csvText.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

            // Expected headers
            const expectedHeaders = ['name', 'email', 'department', 'position', 'salary', 'hireDate', 'status'];
            const headerMapping = this.mapHeaders(headers, expectedHeaders);

            if (!headerMapping) {
                this.showFeedback('Invalid CSV format. Please check the headers.', 'error');
                return;
            }

            const data = [];
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    const employee = {};

                    expectedHeaders.forEach(header => {
                        const columnIndex = headerMapping[header];
                        employee[header] = columnIndex !== -1 ? (values[columnIndex] || '').trim().replace(/"/g, '') : '';
                    });

                    // Generate ID
                    employee.id = Math.max(...this.employees.map(e => e.id), 0) + data.length + 1;

                    data.push(employee);
                }
            }

            this.importData = data;
            this.renderImportPreview();

            // Reset validation
            document.getElementById('confirmImportBtn').disabled = true;
            document.getElementById('validationErrors').classList.remove('show');

            this.logAction(`Parsed ${data.length} records from ${file.name}`, 'success');

        } catch (error) {
            console.error('CSV parsing error:', error);
            this.showFeedback('Error parsing CSV file. Please check the format.', 'error');
        }
    },

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current);
        return result;
    },

    mapHeaders(fileHeaders, expectedHeaders) {
        const mapping = {};
        const lowerExpected = expectedHeaders.map(h => h.toLowerCase());
        const lowerFile = fileHeaders.map(h => h.toLowerCase());

        // Try exact matches first
        for (let i = 0; i < expectedHeaders.length; i++) {
            const expected = lowerExpected[i];
            const index = lowerFile.indexOf(expected);
            mapping[expectedHeaders[i]] = index;
        }

        // Try partial matches for missing headers
        for (let i = 0; i < expectedHeaders.length; i++) {
            if (mapping[expectedHeaders[i]] === -1) {
                const expected = lowerExpected[i];
                for (let j = 0; j < lowerFile.length; j++) {
                    if (lowerFile[j].includes(expected) || expected.includes(lowerFile[j])) {
                        mapping[expectedHeaders[i]] = j;
                        break;
                    }
                }
            }
        }

        // Check if critical fields are mapped
        const criticalFields = ['name', 'email'];
        for (const field of criticalFields) {
            if (mapping[field] === -1) {
                return null; // Critical field missing
            }
        }

        return mapping;
    },

    renderImportPreview() {
        const preview = document.getElementById('importPreview');
        if (!this.importData || this.importData.length === 0) {
            preview.innerHTML = '<p>No valid data found in the file.</p>';
            return;
        }

        const maxRows = Math.min(5, this.importData.length);
        const headers = ['Name', 'Email', 'Department', 'Position', 'Salary', 'Hire Date', 'Status'];

        let html = '<table><thead><tr>';
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead><tbody>';

        for (let i = 0; i < maxRows; i++) {
            const employee = this.importData[i];
            html += '<tr>';
            html += `<td>${employee.name || ''}</td>`;
            html += `<td>${employee.email || ''}</td>`;
            html += `<td>${employee.department || ''}</td>`;
            html += `<td>${employee.position || ''}</td>`;
            html += `<td>${employee.salary || ''}</td>`;
            html += `<td>${employee.hireDate || ''}</td>`;
            html += `<td>${employee.status || ''}</td>`;
            html += '</tr>';
        }

        html += '</tbody></table>';

        if (this.importData.length > maxRows) {
            html += `<p style="margin-top: 1rem; text-align: center; color: #666; font-size: 0.9rem;">Showing first ${maxRows} of ${this.importData.length} records</p>`;
        }

        preview.innerHTML = html;
    },

    validateImportData() {
        if (!this.importData) {
            this.showFeedback('No data to validate', 'error');
            return;
        }

        this.validationErrors = [];
        const existingEmails = this.employees.map(e => e.email.toLowerCase());

        this.importData.forEach((employee, index) => {
            const rowNum = index + 2; // +2 because of 0-index and header row

            // Required field validation
            if (!employee.name || employee.name.trim() === '') {
                this.validationErrors.push(`Row ${rowNum}: Name is required`);
            }

            if (!employee.email || employee.email.trim() === '') {
                this.validationErrors.push(`Row ${rowNum}: Email is required`);
            } else {
                // Email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(employee.email)) {
                    this.validationErrors.push(`Row ${rowNum}: Invalid email format`);
                }

                // Duplicate email check
                if (existingEmails.includes(employee.email.toLowerCase())) {
                    this.validationErrors.push(`Row ${rowNum}: Email already exists`);
                }
            }

            // Salary validation
            if (employee.salary && isNaN(parseFloat(employee.salary))) {
                this.validationErrors.push(`Row ${rowNum}: Invalid salary format`);
            }

            // Date validation
            if (employee.hireDate && employee.hireDate.trim() !== '') {
                const date = new Date(employee.hireDate);
                if (isNaN(date.getTime())) {
                    this.validationErrors.push(`Row ${rowNum}: Invalid hire date format`);
                }
            }

            // Department validation
            const validDepartments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Design'];
            if (employee.department && !validDepartments.includes(employee.department)) {
                this.validationErrors.push(`Row ${rowNum}: Invalid department "${employee.department}". Must be one of: ${validDepartments.join(', ')}`);
            }

            // Status validation
            const validStatuses = ['Active', 'Inactive'];
            if (employee.status && !validStatuses.includes(employee.status)) {
                this.validationErrors.push(`Row ${rowNum}: Invalid status "${employee.status}". Must be Active or Inactive`);
            }
        });

        this.displayValidationResults();
    },

    displayValidationResults() {
        const errorsContainer = document.getElementById('validationErrors');
        const errorList = document.getElementById('errorList');
        const confirmBtn = document.getElementById('confirmImportBtn');

        if (this.validationErrors.length > 0) {
            errorList.innerHTML = this.validationErrors.map(error =>
                `<li class="error-item">${error}</li>`
            ).join('');
            errorsContainer.classList.add('show');
            confirmBtn.disabled = true;

            this.logAction(`Validation failed: ${this.validationErrors.length} errors found`, 'error');
        } else {
            errorsContainer.classList.remove('show');
            confirmBtn.disabled = false;

            this.logAction(`Validation passed: ${this.importData.length} records ready to import`, 'success');
        }
    },

    confirmImport() {
        if (!this.importData || this.validationErrors.length > 0) {
            this.showFeedback('Cannot import data with validation errors', 'error');
            return;
        }

        // Process import data
        this.importData.forEach(employee => {
            // Set defaults for missing values
            employee.department = employee.department || 'Engineering';
            employee.position = employee.position || 'Employee';
            employee.salary = parseFloat(employee.salary) || 50000;
            employee.hireDate = employee.hireDate || new Date().toISOString().split('T')[0];
            employee.status = employee.status || 'Active';
        });

        // Add to employees array
        this.employees.push(...this.importData);

        // Update display
        this.applyFilters();
        this.updateTable();
        this.hideImportSection();

        this.logAction(`Successfully imported ${this.importData.length} employees`, 'success');
        this.showFeedback(`Successfully imported ${this.importData.length} employees`, 'success');
    },

    downloadTemplate() {
        const headers = ['name', 'email', 'department', 'position', 'salary', 'hireDate', 'status'];
        const sampleData = [
            ['John Doe', 'john.doe@company.com', 'Engineering', 'Software Engineer', '75000', '2023-01-15', 'Active'],
            ['Jane Smith', 'jane.smith@company.com', 'Marketing', 'Marketing Specialist', '60000', '2023-02-20', 'Active'],
            ['Bob Johnson', 'bob.johnson@company.com', 'Sales', 'Sales Representative', '55000', '2023-03-10', 'Inactive']
        ];

        const csvContent = [
            headers.join(','),
            ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employee_import_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.logAction('Downloaded import template', 'info');
    },

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    checkTableScroll() {
        const tableContainer = document.querySelector('.table-container');
        if (tableContainer) {
            const hasScroll = tableContainer.scrollWidth > tableContainer.clientWidth;
            if (hasScroll) {
                tableContainer.classList.add('has-scroll');
            } else {
                tableContainer.classList.remove('has-scroll');
            }
        }
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