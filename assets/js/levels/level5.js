// Level 5 - File Upload Simulator

window.Level5 = {
    files: [],
    uploading: false,
    settings: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        allowedTypes: {
            'image/jpeg': { ext: '.jpg', icon: '🖼️', preview: true },
            'image/png': { ext: '.png', icon: '🖼️', preview: true },
            'image/gif': { ext: '.gif', icon: '🖼️', preview: true },
            'application/pdf': { ext: '.pdf', icon: '📄', preview: false },
            'text/plain': { ext: '.txt', icon: '📝', preview: false },
            'application/msword': { ext: '.doc', icon: '📄', preview: false },
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { ext: '.docx', icon: '📄', preview: false },
            'application/vnd.ms-excel': { ext: '.xls', icon: '📊', preview: false },
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { ext: '.xlsx', icon: '📊', preview: false }
        }
    },

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 5: File Upload Simulator</h2>
                
                <!-- Upload Settings -->
                <div class="upload-settings">
                    <div class="settings-row">
                        <label>
                            Max File Size: 
                            <select id="maxSizeSelect">
                                <option value="1048576">1 MB</option>
                                <option value="5242880">5 MB</option>
                                <option value="10485760" selected>10 MB</option>
                                <option value="52428800">50 MB</option>
                            </select>
                        </label>
                        <label>
                            Max Files: 
                            <select id="maxFilesSelect">
                                <option value="1">1 file</option>
                                <option value="3">3 files</option>
                                <option value="5" selected>5 files</option>
                                <option value="10">10 files</option>
                            </select>
                        </label>
                        <label>
                            <input type="checkbox" id="simulateFailures" checked>
                            Simulate Random Failures (20%)
                        </label>
                    </div>
                </div>

                <!-- Upload Area -->
                <div class="upload-area" id="uploadArea">
                    <div class="upload-zone" id="uploadZone">
                        <div class="upload-icon">📁</div>
                        <h3>Drop files here or click to browse</h3>
                        <p>Supported: Images (JPG, PNG, GIF), Documents (PDF, DOC, XLS, TXT)</p>
                        <p>Max size: <span id="maxSizeDisplay">10 MB</span> | Max files: <span id="maxFilesDisplay">5</span></p>
                        <button type="button" id="browseBtn" class="browse-btn">Browse Files</button>
                        <input type="file" id="fileInput" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx,.xls,.xlsx" style="display: none;">
                    </div>
                </div>

                <!-- File Queue -->
                <div class="file-queue" id="fileQueue" style="display: none;">
                    <div class="queue-header">
                        <h3>Upload Queue (<span id="queueCount">0</span>)</h3>
                        <div class="queue-actions">
                            <button type="button" id="uploadAllBtn" class="primary-btn">Upload All</button>
                            <button type="button" id="clearQueueBtn" class="secondary-btn">Clear Queue</button>
                        </div>
                    </div>
                    <div class="file-list" id="fileList"></div>
                </div>

                <!-- Upload Progress -->
                <div class="upload-progress" id="uploadProgress" style="display: none;">
                    <h3>Upload Progress</h3>
                    <div class="overall-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="overallProgress"></div>
                        </div>
                        <span id="overallProgressText">0%</span>
                    </div>
                </div>

                <!-- Uploaded Files -->
                <div class="uploaded-files" id="uploadedFiles" style="display: none;">
                    <h3>Uploaded Files (<span id="uploadedCount">0</span>)</h3>
                    <div class="file-gallery" id="fileGallery"></div>
                </div>

                <div id="uploadResult"></div>
            </div>
        `;
    },

    getDescription() {
        return `
            <h3>Level 5 - File Upload Simulator</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>File Selection:</h5>
            <ul>
                <li>Drag and drop files onto upload zone</li>
                <li>Browse and select files using file dialog</li>
                <li>Select multiple files at once</li>
                <li>Add files to existing queue</li>
            </ul>
            
            <h5>File Validation:</h5>
            <ul>
                <li>Upload supported file types (images, PDF, DOC, TXT)</li>
                <li>Test file size limits (1MB to 50MB)</li>
                <li>Exceed maximum file count limit</li>
                <li>Upload unsupported file types</li>
            </ul>
            
            <h5>Upload Process:</h5>
            <ul>
                <li>Monitor individual file progress bars</li>
                <li>Track overall upload progress</li>
                <li>Handle upload failures and retries</li>
                <li>Preview uploaded images</li>
                <li>View file information and status</li>
            </ul>
            
            <h5>Negative Testing:</h5>
            <ul>
                <li>Upload files exceeding size limit</li>
                <li>Upload too many files</li>
                <li>Upload unsupported formats</li>
                <li>Simulate network failures</li>
                <li>Cancel uploads in progress</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Use file input element for file selection</li>
                <li>Verify drag and drop functionality</li>
                <li>Wait for progress bars to complete</li>
                <li>Check file validation error messages</li>
                <li>Verify file previews and thumbnails</li>
                <li>Test retry mechanisms for failed uploads</li>
                <li>Validate file queue management</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>File input automation</li>
                <li>Drag and drop testing</li>
                <li>Progress bar monitoring</li>
                <li>File validation testing</li>
                <li>Error handling verification</li>
                <li>Image preview validation</li>
                <li>Queue management testing</li>
                <li>Settings configuration testing</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 5 - File Upload Simulator');

        this.files = [];
        this.uploading = false;
        this.bindEvents();
        this.updateSettingsDisplay();
    },

    bindEvents() {
        // File input change
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelection(e.target.files);
            });
        }

        // Browse button
        const browseBtn = document.getElementById('browseBtn');
        if (browseBtn) {
            browseBtn.addEventListener('click', () => {
                fileInput.click();
            });
        }

        // Drag and drop
        const uploadZone = document.getElementById('uploadZone');
        if (uploadZone) {
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('drag-over');
            });

            uploadZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('drag-over');
            });

            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('drag-over');
                this.handleFileSelection(e.dataTransfer.files);
            });
        }

        // Settings changes
        const maxSizeSelect = document.getElementById('maxSizeSelect');
        const maxFilesSelect = document.getElementById('maxFilesSelect');

        if (maxSizeSelect) {
            maxSizeSelect.addEventListener('change', () => {
                this.settings.maxFileSize = parseInt(maxSizeSelect.value);
                this.updateSettingsDisplay();
            });
        }

        if (maxFilesSelect) {
            maxFilesSelect.addEventListener('change', () => {
                this.settings.maxFiles = parseInt(maxFilesSelect.value);
                this.updateSettingsDisplay();
            });
        }

        // Queue actions
        const uploadAllBtn = document.getElementById('uploadAllBtn');
        const clearQueueBtn = document.getElementById('clearQueueBtn');

        if (uploadAllBtn) {
            uploadAllBtn.addEventListener('click', () => {
                this.startUpload();
            });
        }

        if (clearQueueBtn) {
            clearQueueBtn.addEventListener('click', () => {
                this.clearQueue();
            });
        }
    },

    updateSettingsDisplay() {
        const maxSizeDisplay = document.getElementById('maxSizeDisplay');
        const maxFilesDisplay = document.getElementById('maxFilesDisplay');

        if (maxSizeDisplay) {
            maxSizeDisplay.textContent = this.formatFileSize(this.settings.maxFileSize);
        }

        if (maxFilesDisplay) {
            maxFilesDisplay.textContent = this.settings.maxFiles;
        }
    },

    handleFileSelection(fileList) {
        const newFiles = Array.from(fileList);

        // Check total file count
        if (this.files.length + newFiles.length > this.settings.maxFiles) {
            this.showFeedback(`Maximum ${this.settings.maxFiles} files allowed. Currently have ${this.files.length} files.`, 'error');
            return;
        }

        let validFiles = [];
        let errors = [];

        newFiles.forEach(file => {
            const validation = this.validateFile(file);
            if (validation.valid) {
                validFiles.push({
                    id: Date.now() + Math.random(),
                    file: file,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    status: 'pending', // pending, uploading, completed, failed
                    progress: 0,
                    preview: null
                });
            } else {
                errors.push(`${file.name}: ${validation.error}`);
            }
        });

        if (validFiles.length > 0) {
            this.files.push(...validFiles);
            this.generatePreviews(validFiles);
            this.updateFileQueue();
            this.showFeedback(`${validFiles.length} file(s) added to queue`, 'success');
        }

        if (errors.length > 0) {
            this.showFeedback(`Errors: ${errors.join(', ')}`, 'error');
        }
    },

    validateFile(file) {
        // Check file type
        if (!this.settings.allowedTypes[file.type]) {
            return { valid: false, error: 'Unsupported file type' };
        }

        // Check file size
        if (file.size > this.settings.maxFileSize) {
            return { valid: false, error: `File too large (max ${this.formatFileSize(this.settings.maxFileSize)})` };
        }

        // Check for duplicate names
        if (this.files.some(f => f.name === file.name)) {
            return { valid: false, error: 'File with same name already exists' };
        }

        return { valid: true };
    },

    generatePreviews(files) {
        files.forEach(fileObj => {
            if (this.settings.allowedTypes[fileObj.type]?.preview && fileObj.file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    fileObj.preview = e.target.result;
                    this.updateFileQueue();
                };
                reader.readAsDataURL(fileObj.file);
            }
        });
    },

    updateFileQueue() {
        const fileQueue = document.getElementById('fileQueue');
        const fileList = document.getElementById('fileList');
        const queueCount = document.getElementById('queueCount');

        if (this.files.length === 0) {
            fileQueue.style.display = 'none';
            return;
        }

        fileQueue.style.display = 'block';
        queueCount.textContent = this.files.length;

        fileList.innerHTML = this.files.map(file => `
            <div class="file-item" data-file-id="${file.id}">
                <div class="file-preview">
                    ${file.preview ?
            `<img src="${file.preview}" alt="${file.name}" class="file-thumbnail">` :
            `<div class="file-icon">${this.settings.allowedTypes[file.type]?.icon || '📄'}</div>`
        }
                </div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-details">${this.formatFileSize(file.size)} • ${file.type.split('/')[1].toUpperCase()}</div>
                    <div class="file-status status-${file.status}">${this.getStatusText(file.status)}</div>
                </div>
                <div class="file-progress">
                    <div class="progress-bar ${file.status}">
                        <div class="progress-fill" style="width: ${file.progress}%"></div>
                    </div>
                    <span class="progress-text">${file.progress}%</span>
                </div>
                <div class="file-actions">
                    ${file.status === 'failed' ?
            `<button class="retry-btn" data-file-id="${file.id}">Retry</button>` : ''
        }
                    <button class="remove-btn" data-file-id="${file.id}">Remove</button>
                </div>
            </div>
        `).join('');

        // Bind file action events
        this.bindFileActions();
    },

    bindFileActions() {
        // Remove file buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fileId = parseFloat(e.target.getAttribute('data-file-id'));
                this.removeFile(fileId);
            });
        });

        // Retry file buttons
        document.querySelectorAll('.retry-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fileId = parseFloat(e.target.getAttribute('data-file-id'));
                this.retryFile(fileId);
            });
        });
    },

    removeFile(fileId) {
        this.files = this.files.filter(file => file.id !== fileId);
        this.updateFileQueue();
        this.updateUploadedFiles();
        this.showFeedback('File removed from queue', 'success');
    },

    retryFile(fileId) {
        const file = this.files.find(f => f.id === fileId);
        if (file) {
            file.status = 'pending';
            file.progress = 0;
            this.updateFileQueue();
            this.uploadFile(file);
        }
    },

    startUpload() {
        if (this.uploading) {
            this.showFeedback('Upload already in progress', 'error');
            return;
        }

        const pendingFiles = this.files.filter(f => f.status === 'pending');
        if (pendingFiles.length === 0) {
            this.showFeedback('No files to upload', 'error');
            return;
        }

        this.uploading = true;
        this.showUploadProgress();
        this.showFeedback(`Starting upload of ${pendingFiles.length} files...`, 'success');

        // Upload files sequentially
        this.uploadNextFile(0);
    },

    uploadNextFile(index) {
        const pendingFiles = this.files.filter(f => f.status === 'pending');

        if (index >= pendingFiles.length) {
            this.completeUpload();
            return;
        }

        const file = pendingFiles[index];
        this.uploadFile(file).then(() => {
            this.uploadNextFile(index + 1);
        });
    },

    uploadFile(fileObj) {
        return new Promise((resolve) => {
            fileObj.status = 'uploading';
            fileObj.progress = 0;
            this.updateFileQueue();

            // Simulate upload progress
            const uploadDuration = Math.random() * 3000 + 1000; // 1-4 seconds
            const updateInterval = 50; // Update every 50ms
            const totalUpdates = uploadDuration / updateInterval;
            let currentUpdate = 0;

            const progressInterval = setInterval(() => {
                currentUpdate++;
                fileObj.progress = Math.min(100, (currentUpdate / totalUpdates) * 100);

                this.updateFileQueue();
                this.updateOverallProgress();

                if (fileObj.progress >= 100) {
                    clearInterval(progressInterval);

                    // Simulate random failures
                    const simulateFailures = document.getElementById('simulateFailures').checked;
                    const shouldFail = simulateFailures && Math.random() < 0.2; // 20% failure rate

                    if (shouldFail) {
                        fileObj.status = 'failed';
                        fileObj.progress = 0;
                        this.showFeedback(`Upload failed: ${fileObj.name}`, 'error');
                    } else {
                        fileObj.status = 'completed';
                        fileObj.progress = 100;
                    }

                    this.updateFileQueue();
                    this.updateUploadedFiles();
                    resolve();
                }
            }, updateInterval);
        });
    },

    showUploadProgress() {
        const uploadProgress = document.getElementById('uploadProgress');
        uploadProgress.style.display = 'block';
    },

    updateOverallProgress() {
        const totalFiles = this.files.filter(f => f.status !== 'pending').length;
        const completedFiles = this.files.filter(f => f.status === 'completed').length;
        const failedFiles = this.files.filter(f => f.status === 'failed').length;

        const overallPercent = totalFiles > 0 ?
            Math.round(((completedFiles + failedFiles) / totalFiles) * 100) : 0;

        const overallProgress = document.getElementById('overallProgress');
        const overallProgressText = document.getElementById('overallProgressText');

        if (overallProgress) overallProgress.style.width = `${overallPercent}%`;
        if (overallProgressText) overallProgressText.textContent = `${overallPercent}%`;
    },

    completeUpload() {
        this.uploading = false;

        const completedFiles = this.files.filter(f => f.status === 'completed');
        const failedFiles = this.files.filter(f => f.status === 'failed');

        let message = `Upload complete! ${completedFiles.length} files uploaded successfully`;
        if (failedFiles.length > 0) {
            message += `, ${failedFiles.length} failed`;
        }

        this.showFeedback(message, completedFiles.length > 0 ? 'success' : 'error');
        this.updateUploadedFiles();
    },

    updateUploadedFiles() {
        const uploadedFiles = document.getElementById('uploadedFiles');
        const fileGallery = document.getElementById('fileGallery');
        const uploadedCount = document.getElementById('uploadedCount');

        const completed = this.files.filter(f => f.status === 'completed');

        if (completed.length === 0) {
            uploadedFiles.style.display = 'none';
            return;
        }

        uploadedFiles.style.display = 'block';
        uploadedCount.textContent = completed.length;

        fileGallery.innerHTML = completed.map(file => `
            <div class="uploaded-file">
                <div class="uploaded-preview">
                    ${file.preview ?
            `<img src="${file.preview}" alt="${file.name}" class="uploaded-thumbnail">` :
            `<div class="uploaded-icon">${this.settings.allowedTypes[file.type]?.icon || '📄'}</div>`
        }
                </div>
                <div class="uploaded-info">
                    <div class="uploaded-name">${file.name}</div>
                    <div class="uploaded-size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
        `).join('');
    },

    clearQueue() {
        if (this.uploading) {
            this.showFeedback('Cannot clear queue during upload', 'error');
            return;
        }

        this.files = [];
        this.updateFileQueue();
        this.updateUploadedFiles();

        const uploadProgress = document.getElementById('uploadProgress');
        uploadProgress.style.display = 'none';

        this.showFeedback('Queue cleared', 'success');
    },

    getStatusText(status) {
        const statusMap = {
            'pending': 'Pending',
            'uploading': 'Uploading...',
            'completed': 'Completed',
            'failed': 'Failed'
        };
        return statusMap[status] || status;
    },

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('uploadResult');
        if (resultDiv) {
            resultDiv.innerHTML = message;
            resultDiv.className = `result ${type}`;

            // Auto-hide after 4 seconds
            setTimeout(() => {
                resultDiv.innerHTML = '';
                resultDiv.className = '';
            }, 4000);
        }
    }
};