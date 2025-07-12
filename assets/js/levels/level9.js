// Level 9 - Image Gallery with Lightbox

window.Level9 = {
    images: [
        { id: 1, title: "Landscape Photo #1018", category: "landscape", src: "https://picsum.photos/id/1018/800/600", thumb: "https://picsum.photos/id/1018/200/200", width: 800, height: 600 },
        { id: 2, title: "Landscape Photo #1022", category: "landscape", src: "https://picsum.photos/id/1022/800/600", thumb: "https://picsum.photos/id/1022/200/200", width: 800, height: 600 },
        { id: 3, title: "Landscape Photo #1015", category: "landscape", src: "https://picsum.photos/id/1015/800/600", thumb: "https://picsum.photos/id/1015/200/200", width: 800, height: 600 },
        { id: 4, title: "Portrait Photo #1025", category: "portrait", src: "https://picsum.photos/id/1025/600/800", thumb: "https://picsum.photos/id/1025/200/200", width: 600, height: 800 },
        { id: 5, title: "Portrait Photo #1027", category: "portrait", src: "https://picsum.photos/id/1027/600/800", thumb: "https://picsum.photos/id/1027/200/200", width: 600, height: 800 },
        { id: 6, title: "Portrait Photo #1035", category: "portrait", src: "https://picsum.photos/id/1035/600/800", thumb: "https://picsum.photos/id/1035/200/200", width: 600, height: 800 },
        { id: 7, title: "Square Photo #1041", category: "square", src: "https://picsum.photos/id/1041/600/600", thumb: "https://picsum.photos/id/1041/200/200", width: 600, height: 600 },
        { id: 8, title: "Square Photo #1043", category: "square", src: "https://picsum.photos/id/1043/600/600", thumb: "https://picsum.photos/id/1043/200/200", width: 600, height: 600 },
        { id: 9, title: "Square Photo #1045", category: "square", src: "https://picsum.photos/id/1045/600/600", thumb: "https://picsum.photos/id/1045/200/200", width: 600, height: 600 },
        { id: 10, title: "Landscape Photo #1059", category: "landscape", src: "https://picsum.photos/id/1059/800/600", thumb: "https://picsum.photos/id/1059/200/200", width: 800, height: 600 },
        { id: 11, title: "Portrait Photo #1062", category: "portrait", src: "https://picsum.photos/id/1062/600/800", thumb: "https://picsum.photos/id/1062/200/200", width: 600, height: 800 },
        { id: 12, title: "Square Photo #1070", category: "square", src: "https://picsum.photos/id/1070/600/600", thumb: "https://picsum.photos/id/1070/200/200", width: 600, height: 600 }
    ],

    filteredImages: [],
    currentFilter: 'all',
    viewMode: 'grid',
    currentImageIndex: 0,
    isLightboxOpen: false,
    isSlideshow: false,
    slideshowInterval: null,
    slideshowSpeed: 3000,
    zoomLevel: 1,
    maxZoom: 3,
    minZoom: 0.5,
    panX: 0,
    panY: 0,
    isDragging: false,
    lastPanPoint: null,

    getContent() {
        return `
            <div class="level-content">
                <h2>Level 9: Image Gallery with Lightbox</h2>
                
                <!-- Gallery Controls -->
                <div class="gallery-controls">
                    <div class="controls-row">
                        <div class="filter-section">
                            <button class="category-filter active" data-category="all">All Photos</button>
                            <button class="category-filter" data-category="landscape">Landscape</button>
                            <button class="category-filter" data-category="portrait">Portrait</button>
                            <button class="category-filter" data-category="square">Square</button>
                        </div>
                        
                        <div class="view-controls">
                            <button class="view-toggle active" data-view="grid" title="Grid View">⊞</button>
                            <button class="view-toggle" data-view="list" title="List View">☰</button>
                        </div>
                    </div>
                    
                    <div class="gallery-info">
                        <span id="imageCount">Showing ${this.images.length} photos</span>
                        
                        <div class="slideshow-controls">
                            <button id="slideshowToggle" class="slideshow-btn">▶ Start Slideshow</button>
                            <select id="slideshowSpeed" class="slideshow-btn">
                                <option value="2000">Fast (2s)</option>
                                <option value="3000" selected>Normal (3s)</option>
                                <option value="5000">Slow (5s)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Image Gallery -->
                <div class="image-gallery">
                    <div class="gallery-grid" id="galleryGrid">
                        ${this.renderGalleryItems()}
                    </div>
                </div>

                <!-- Lightbox Modal -->
                <div class="lightbox-overlay" id="lightboxOverlay">
                    <div class="lightbox-container">
                        <!-- Header Controls -->
                        <div class="lightbox-header">
                            <div class="lightbox-info">
                                <div class="lightbox-title" id="lightboxTitle"></div>
                                <div class="lightbox-meta" id="lightboxMeta"></div>
                            </div>
                            <div class="lightbox-controls">
                                <button class="lightbox-btn" id="fullscreenBtn" title="Toggle Fullscreen">⛶</button>
                                <button class="lightbox-btn" id="downloadBtn" title="Download Image">⬇</button>
                                <button class="lightbox-btn" id="shareBtn" title="Share Image">⚐</button>
                                <button class="lightbox-btn close-btn" id="closeLightbox" title="Close (ESC)">×</button>
                            </div>
                        </div>

                        <!-- Main Image -->
                        <img class="lightbox-image" id="lightboxImage" alt="" draggable="false">
                        <div class="zoom-controls">
                            <button class="zoom-btn" id="zoomIn" title="Zoom In (+)">+</button>
                            <button class="zoom-btn" id="zoomOut" title="Zoom Out (-)">−</button>
                            <button class="zoom-btn" id="zoomReset" title="Fit to Screen (0)">⌂</button>
                        </div>

                        <!-- Footer Controls -->
                        <div class="lightbox-footer">
                            <div class="image-counter" id="imageCounter">1 of ${this.images.length}</div>
                            <div class="lightbox-actions">
                                <button class="lightbox-btn" id="lightboxSlideshowToggle" title="Toggle Slideshow (Space)">▶</button>
                                <button class="lightbox-btn" id="thumbnailsToggle" title="Show Thumbnails (T)">⊞</button>
                            </div>
                        </div>

                        <!-- Slideshow Progress -->
                        <div class="slideshow-progress" id="slideshowProgress" style="display: none;">
                            <div class="progress-bar" id="progressBar"></div>
                        </div>

                        <!-- Thumbnails Strip -->
                        <div class="thumbnails-strip" id="thumbnailsStrip" style="display: none;">
                            ${this.renderThumbnails()}
                        </div>
                    </div>
                </div>

                <div id="galleryResult"></div>
            </div>
        `;
    },

    renderGalleryItems() {
        return this.filteredImages.map((image, index) => `
            <div class="gallery-item" data-image-id="${image.id}" data-index="${index}" tabindex="0" style="--item-index: ${index}">
                <img class="gallery-image" 
                     src="${image.thumb}" 
                     alt="${image.title}"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='">
                <div class="gallery-overlay">
                    <div class="image-info">
                        <div class="image-title">${image.title}</div>
                        <div class="image-details">
                            <span class="image-category">${image.category}</span>
                            <span>${image.width}×${image.height}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderThumbnails() {
        return this.filteredImages.map((image, index) => `
            <div class="thumbnail-item ${index === this.currentImageIndex ? 'active' : ''}" 
                 data-index="${index}" 
                 title="${image.title}">
                <img class="thumbnail-image" src="${image.thumb}" alt="${image.title}">
            </div>
        `).join('');
    },

    getDescription() {
        return `
            <h3>Level 9 - Image Gallery with Lightbox</h3>
            
            <h4>Test Scenarios:</h4>
            <h5>Gallery Navigation:</h5>
            <ul>
                <li>Filter images by category (All, Nature, Urban, Art)</li>
                <li>Switch between grid and list view modes</li>
                <li>Click thumbnails to open lightbox</li>
                <li>Verify image loading and error states</li>
            </ul>
            
            <h5>Lightbox Functionality:</h5>
            <ul>
                <li>Navigate with arrow buttons and keyboard (←/→)</li>
                <li>Close with X button or ESC key</li>
                <li>Zoom in/out with buttons or mouse wheel</li>
                <li>Pan zoomed images by dragging</li>
                <li>Reset zoom to fit screen</li>
            </ul>
            
            <h5>Slideshow Mode:</h5>
            <ul>
                <li>Start/stop slideshow from gallery or lightbox</li>
                <li>Adjust slideshow speed (Fast/Normal/Slow)</li>
                <li>Progress bar shows current slide timing</li>
                <li>Pause on user interaction, resume automatically</li>
            </ul>
            
            <h5>Advanced Features:</h5>
            <ul>
                <li>Thumbnail strip navigation in lightbox</li>
                <li>Fullscreen mode simulation</li>
                <li>Download and share button actions</li>
                <li>Touch/swipe gestures on mobile</li>
                <li>Keyboard shortcuts (Space, T, +, -, 0)</li>
            </ul>
            
            <h5>Responsive Testing:</h5>
            <ul>
                <li>Test on different screen sizes</li>
                <li>Verify touch interactions on mobile</li>
                <li>Check thumbnail strip behavior</li>
                <li>Validate control positioning</li>
            </ul>
            
            <h4>Automation Tips:</h4>
            <ul>
                <li>Wait for image loading before interactions</li>
                <li>Test both mouse and keyboard navigation</li>
                <li>Verify lightbox modal appearance/disappearance</li>
                <li>Check zoom level and pan position changes</li>
                <li>Test slideshow timing and progress</li>
                <li>Validate filter state persistence</li>
                <li>Test error handling for broken images</li>
            </ul>
            
            <h4>Skills Practiced:</h4>
            <ul>
                <li>Image gallery automation</li>
                <li>Modal/lightbox testing</li>
                <li>Mouse actions and gestures</li>
                <li>Keyboard navigation testing</li>
                <li>Zoom and pan interactions</li>
                <li>Slideshow and timing validation</li>
                <li>Responsive design testing</li>
                <li>Touch gesture simulation</li>
            </ul>
        `;
    },

    initialize() {
        console.log('Initializing Level 9 - Image Gallery with Lightbox');

        this.filteredImages = [...this.images];
        this.currentFilter = 'all';
        this.viewMode = 'grid';
        this.currentImageIndex = 0;
        this.isLightboxOpen = false;
        this.isSlideshow = false;
        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
        this.lastClickTime = null;

        this.bindEvents();
        this.updateGallery();
    },

    bindEvents() {
        // Category filters
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterImages(e.target.getAttribute('data-category'));
            });
        });

        // View mode toggles
        document.querySelectorAll('.view-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setViewMode(e.target.getAttribute('data-view'));
            });
        });

        // Slideshow controls
        document.getElementById('slideshowToggle')?.addEventListener('click', () => {
            this.toggleSlideshow();
        });

        document.getElementById('slideshowSpeed')?.addEventListener('change', (e) => {
            this.slideshowSpeed = parseInt(e.target.value);
            if (this.isSlideshow) {
                this.restartSlideshow();
            }
        });

        // Gallery item clicks
        document.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                const imageId = parseInt(galleryItem.getAttribute('data-image-id'));
                const index = this.filteredImages.findIndex(img => img.id === imageId);
                if (index !== -1) {
                    this.openLightbox(index);
                }
            }
        });

        // Gallery item keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isLightboxOpen) {
                const focusedItem = document.activeElement;
                if (focusedItem && focusedItem.classList.contains('gallery-item')) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const imageId = parseInt(focusedItem.getAttribute('data-image-id'));
                        const index = this.filteredImages.findIndex(img => img.id === imageId);
                        if (index !== -1) {
                            this.openLightbox(index);
                        }
                    }
                }
            }
        });

        // Lightbox controls
        this.bindLightboxEvents();
    },

    bindLightboxEvents() {
        // Close lightbox
        document.getElementById('closeLightbox')?.addEventListener('click', () => {
            this.closeLightbox();
        });

        // Navigation
        // Navigation is now keyboard-only (arrow keys)

        // Zoom controls
        document.getElementById('zoomIn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.zoomImage(1.5);
        });

        document.getElementById('zoomOut')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.zoomImage(0.67);
        });

        document.getElementById('zoomReset')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.resetZoom();
        });

        // Lightbox slideshow
        document.getElementById('lightboxSlideshowToggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleSlideshow();
        });

        // Thumbnails toggle
        document.getElementById('thumbnailsToggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleThumbnails();
        });

        // Action buttons
        document.getElementById('fullscreenBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleFullscreen();
        });

        document.getElementById('downloadBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.downloadImage();
        });

        document.getElementById('shareBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.shareImage();
        });

        // Overlay click to close
        document.getElementById('lightboxOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'lightboxOverlay') {
                this.closeLightbox();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.isLightboxOpen) {
                this.handleKeyboardNavigation(e);
            }
        });

        // Mouse events for pan and zoom
        this.bindMouseEvents();

        // Touch events for mobile
        this.bindTouchEvents();

        // Thumbnail navigation
        document.addEventListener('click', (e) => {
            const thumbnailItem = e.target.closest('.thumbnail-item');
            if (thumbnailItem) {
                const index = parseInt(thumbnailItem.getAttribute('data-index'));
                this.goToImage(index);
            }
        });
    },

    bindMouseEvents() {
        const lightboxImage = document.getElementById('lightboxImage');

        // Mouse wheel zoom
        lightboxImage?.addEventListener('wheel', (e) => {
            if (this.isLightboxOpen) {
                e.preventDefault();
                const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
                this.zoomImage(zoomFactor);
            }
        });

        // Mouse drag for panning
        let isDragging = false;
        let startX, startY;
        let hasDragged = false;

        lightboxImage?.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - this.panX;
            startY = e.clientY - this.panY;
            hasDragged = false;

            if (this.zoomLevel > 1) {
                lightboxImage.classList.add('dragging');
            }
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging && this.isLightboxOpen) {
                const deltaX = Math.abs(e.clientX - (startX + this.panX));
                const deltaY = Math.abs(e.clientY - (startY + this.panY));

                // Only pan if zoomed in
                if (this.zoomLevel > 1) {
                    this.panX = e.clientX - startX;
                    this.panY = e.clientY - startY;
                    this.updateImageTransform();
                }

                // Mark as dragged if moved more than 5 pixels
                if (deltaX > 5 || deltaY > 5) {
                    hasDragged = true;
                }
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                isDragging = false;
                lightboxImage?.classList.remove('dragging');

                // Only allow double-click zoom if user didn't drag and is zoomed out
                if (!hasDragged && e.target === lightboxImage && this.zoomLevel === 1) {
                    // Check for double-click with a small delay
                    if (this.lastClickTime && (Date.now() - this.lastClickTime) < 300) {
                        this.zoomImage(2);
                        this.lastClickTime = null;
                    } else {
                        this.lastClickTime = Date.now();
                        setTimeout(() => {
                            this.lastClickTime = null;
                        }, 300);
                    }
                } else if (!hasDragged && e.target === lightboxImage && this.zoomLevel > 1) {
                    // Double-click when zoomed to reset
                    if (this.lastClickTime && (Date.now() - this.lastClickTime) < 300) {
                        this.resetZoom();
                        this.lastClickTime = null;
                    } else {
                        this.lastClickTime = Date.now();
                        setTimeout(() => {
                            this.lastClickTime = null;
                        }, 300);
                    }
                }
            }
        });
    },

    bindTouchEvents() {
        const lightboxContainer = document.querySelector('.lightbox-container');
        let touchStartX = 0;
        let touchStartY = 0;
        let initialDistance = 0;
        let initialZoom = 1;

        lightboxContainer?.addEventListener('touchstart', (e) => {
            if (!this.isLightboxOpen) return;

            if (e.touches.length === 1) {
                // Single touch - start swipe detection
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                // Pinch zoom
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                initialDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                initialZoom = this.zoomLevel;
            }
        }, { passive: true });

        lightboxContainer?.addEventListener('touchmove', (e) => {
            if (!this.isLightboxOpen) return;

            if (e.touches.length === 2) {
                // Pinch zoom
                e.preventDefault();
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const zoomFactor = currentDistance / initialDistance;
                this.setZoom(initialZoom * zoomFactor);
            }
        });

        lightboxContainer?.addEventListener('touchend', (e) => {
            if (!this.isLightboxOpen || e.touches.length > 0) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Detect swipe gestures
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.navigateImage(-1); // Swipe right = previous
                } else {
                    this.navigateImage(1); // Swipe left = next
                }
            }
        }, { passive: true });
    },

    // Gallery Management
    filterImages(category) {
        this.currentFilter = category;

        if (category === 'all') {
            this.filteredImages = [...this.images];
        } else {
            this.filteredImages = this.images.filter(img => img.category === category);
        }

        // Update active filter button
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.updateGallery();
        this.logAction(`Filtered photos by: ${category}`, 'info');
    },

    setViewMode(mode) {
        this.viewMode = mode;

        const galleryGrid = document.getElementById('galleryGrid');
        const viewToggles = document.querySelectorAll('.view-toggle');

        // Update view toggle buttons
        viewToggles.forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${mode}"]`).classList.add('active');

        // Update gallery grid class
        if (mode === 'list') {
            galleryGrid.classList.add('list-view');
        } else {
            galleryGrid.classList.remove('list-view');
        }

        this.logAction(`Switched to ${mode} view`, 'info');
    },

    updateGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        const imageCount = document.getElementById('imageCount');

        galleryGrid.innerHTML = this.renderGalleryItems();
        imageCount.textContent = `Showing ${this.filteredImages.length} photos`;

        // Apply view mode
        if (this.viewMode === 'list') {
            galleryGrid.classList.add('list-view');
        }
    },

    // Lightbox Management
    openLightbox(index) {
        this.currentImageIndex = index;
        this.isLightboxOpen = true;

        const lightboxOverlay = document.getElementById('lightboxOverlay');
        const lightboxImage = document.getElementById('lightboxImage');

        // Show overlay
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load image
        this.loadLightboxImage();

        // Update info and navigation
        this.updateLightboxInfo();
        this.updateNavigation();

        // Reset zoom and pan
        this.resetZoom();

        // Focus management
        setTimeout(() => {
            document.getElementById('closeLightbox')?.focus();
        }, 100);

        this.logAction(`Opened lightbox for photo: ${this.filteredImages[index].title}`, 'info');
    },

    closeLightbox() {
        this.isLightboxOpen = false;

        const lightboxOverlay = document.getElementById('lightboxOverlay');
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Stop slideshow if active
        if (this.isSlideshow) {
            this.stopSlideshow();
        }

        // Hide thumbnails
        document.getElementById('thumbnailsStrip').style.display = 'none';

        this.logAction('Closed lightbox', 'info');
    },

    loadLightboxImage() {
        const lightboxImage = document.getElementById('lightboxImage');
        const currentImage = this.filteredImages[this.currentImageIndex];

        lightboxImage.classList.add('loading');
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.title;

        lightboxImage.onload = () => {
            lightboxImage.classList.remove('loading');
        };

        lightboxImage.onerror = () => {
            lightboxImage.classList.remove('loading');
            lightboxImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
        };
    },

    updateLightboxInfo() {
        const currentImage = this.filteredImages[this.currentImageIndex];
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxMeta = document.getElementById('lightboxMeta');
        const imageCounter = document.getElementById('imageCounter');

        lightboxTitle.textContent = currentImage.title;
        lightboxMeta.textContent = `${currentImage.category} • ${currentImage.width}×${currentImage.height}`;
        imageCounter.textContent = `${this.currentImageIndex + 1} of ${this.filteredImages.length}`;
    },

    updateNavigation() {
        // Navigation is now keyboard-only, no buttons to update
        // Update thumbnails
        this.updateThumbnails();
    },

    navigateImage(direction) {
        const newIndex = this.currentImageIndex + direction;

        if (newIndex >= 0 && newIndex < this.filteredImages.length) {
            this.goToImage(newIndex);
        }
    },

    goToImage(index) {
        if (index >= 0 && index < this.filteredImages.length) {
            this.currentImageIndex = index;
            this.loadLightboxImage();
            this.updateLightboxInfo();
            this.updateNavigation();
            this.resetZoom();

            const currentImage = this.filteredImages[index];
            this.logAction(`Navigated to photo: ${currentImage.title}`, 'info');
        }
    },

    // Zoom and Pan
    zoomImage(factor) {
        const newZoom = this.zoomLevel * factor;
        this.setZoom(newZoom);
    },

    setZoom(zoom) {
        this.zoomLevel = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));

        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');

        zoomInBtn.disabled = this.zoomLevel >= this.maxZoom;
        zoomOutBtn.disabled = this.zoomLevel <= this.minZoom;

        this.updateImageTransform();

        // Reset pan if zoomed out
        if (this.zoomLevel <= 1) {
            this.panX = 0;
            this.panY = 0;
        }

        const lightboxImage = document.getElementById('lightboxImage');
        if (this.zoomLevel > 1) {
            lightboxImage.classList.add('zoomed');
        } else {
            lightboxImage.classList.remove('zoomed');
        }
    },

    resetZoom() {
        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
        this.updateImageTransform();

        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.classList.remove('zoomed');

        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        zoomInBtn.disabled = false;
        zoomOutBtn.disabled = false;
    },

    updateImageTransform() {
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`;
    },

    // Slideshow
    toggleSlideshow() {
        if (this.isSlideshow) {
            this.stopSlideshow();
        } else {
            // If lightbox is not open, open it first with the current filtered first image
            if (!this.isLightboxOpen) {
                if (this.filteredImages.length > 0) {
                    this.openLightbox(0);
                    // Wait for lightbox to open, then start slideshow
                    setTimeout(() => {
                        this.startSlideshow();
                    }, 300);
                }
            } else {
                this.startSlideshow();
            }
        }
    },

    startSlideshow() {
        this.isSlideshow = true;

        const slideshowToggle = document.getElementById('slideshowToggle');
        const lightboxSlideshowToggle = document.getElementById('lightboxSlideshowToggle');

        slideshowToggle.innerHTML = '⏸ Stop Slideshow';
        slideshowToggle.classList.add('active');
        lightboxSlideshowToggle.innerHTML = '⏸';

        this.runSlideshow();
        this.showSlideshowProgress();

        this.logAction('Started slideshow', 'info');
    },

    stopSlideshow() {
        this.isSlideshow = false;

        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
        }

        const slideshowToggle = document.getElementById('slideshowToggle');
        const lightboxSlideshowToggle = document.getElementById('lightboxSlideshowToggle');
        const slideshowProgress = document.getElementById('slideshowProgress');

        slideshowToggle.innerHTML = '▶ Start Slideshow';
        slideshowToggle.classList.remove('active');
        lightboxSlideshowToggle.innerHTML = '▶';
        slideshowProgress.style.display = 'none';

        this.logAction('Stopped slideshow', 'info');
    },

    restartSlideshow() {
        if (this.isSlideshow) {
            this.stopSlideshow();
            this.startSlideshow();
        }
    },

    runSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
        }

        this.slideshowInterval = setInterval(() => {
            if (this.isSlideshow) {
                const nextIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
                this.goToImage(nextIndex);
            }
        }, this.slideshowSpeed);
    },

    showSlideshowProgress() {
        const slideshowProgress = document.getElementById('slideshowProgress');
        const progressBar = document.getElementById('progressBar');

        slideshowProgress.style.display = 'block';

        let progress = 0;
        const updateInterval = 50; // Update every 50ms
        const increment = (100 / this.slideshowSpeed) * updateInterval;

        const progressInterval = setInterval(() => {
            if (!this.isSlideshow) {
                clearInterval(progressInterval);
                return;
            }

            progress += increment;
            if (progress >= 100) {
                progress = 0;
            }

            progressBar.style.width = `${progress}%`;
        }, updateInterval);
    },

    // Thumbnails
    toggleThumbnails() {
        const thumbnailsStrip = document.getElementById('thumbnailsStrip');
        const isVisible = thumbnailsStrip.style.display !== 'none';

        thumbnailsStrip.style.display = isVisible ? 'none' : 'flex';

        if (!isVisible) {
            this.updateThumbnails();
        }

        this.logAction(`${isVisible ? 'Hidden' : 'Shown'} thumbnails`, 'info');
    },

    updateThumbnails() {
        const thumbnailsStrip = document.getElementById('thumbnailsStrip');
        thumbnailsStrip.innerHTML = this.renderThumbnails();

        // Scroll to active thumbnail
        const activeThumbnail = thumbnailsStrip.querySelector('.thumbnail-item.active');
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    },

    // Action Buttons
    toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            this.logAction('Exited fullscreen mode', 'info');
        } else {
            document.documentElement.requestFullscreen().catch(() => {
                this.logAction('Fullscreen not supported', 'warning');
            });
            this.logAction('Entered fullscreen mode', 'info');
        }
    },

    downloadImage() {
        const currentImage = this.filteredImages[this.currentImageIndex];

        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = currentImage.src;
        link.download = `${currentImage.title.replace(/\s+/g, '_')}.jpg`;
        link.target = '_blank';
        link.style.display = 'none';

        document.body.appendChild(link);

        // Prevent any event bubbling that might interfere
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
        }, 100);

        this.logAction(`Downloaded photo: ${currentImage.title}`, 'success');
    },

    shareImage() {
        const currentImage = this.filteredImages[this.currentImageIndex];

        if (navigator.share) {
            navigator.share({
                title: currentImage.title,
                text: `Check out this image: ${currentImage.title}`,
                url: currentImage.src
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(currentImage.src).then(() => {
                this.logAction('Image URL copied to clipboard', 'success');
            }).catch(() => {
                this.logAction('Share not supported', 'warning');
            });
        }

        this.logAction(`Shared photo: ${currentImage.title}`, 'info');
    },

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.navigateImage(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.navigateImage(1);
                break;
            case ' ':
                e.preventDefault();
                this.toggleSlideshow();
                break;
            case '+':
            case '=':
                e.preventDefault();
                this.zoomImage(1.5);
                break;
            case '-':
                e.preventDefault();
                this.zoomImage(0.67);
                break;
            case '0':
                e.preventDefault();
                this.resetZoom();
                break;
            case 't':
            case 'T':
                e.preventDefault();
                this.toggleThumbnails();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                this.toggleFullscreen();
                break;
        }
    },

    // Utility Functions
    logAction(message, type = 'info') {
        console.log(`Gallery Action: ${message}`);

        // You could extend this to show actions in the UI
        const resultDiv = document.getElementById('galleryResult');
        if (resultDiv) {
            resultDiv.innerHTML = message;
            resultDiv.className = `result ${type}`;

            // Auto-hide after 2 seconds
            setTimeout(() => {
                resultDiv.innerHTML = '';
                resultDiv.className = '';
            }, 2000);
        }
    },

    showFeedback(message, type) {
        const resultDiv = document.getElementById('galleryResult');
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