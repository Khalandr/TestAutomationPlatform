// Level Manager - Handles level switching and content loading

const LevelManager = {
    currentLevel: 1,
    loadedLevels: {},

    init() {
        console.log('LevelManager initialized');
        this.bindLevelButtons();
        this.loadLevel(1); // Load Level 1 by default
    },

    bindLevelButtons() {
        const levelButtons = document.querySelectorAll('.level-btn');
        console.log('Found', levelButtons.length, 'level buttons');

        levelButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const levelNumber = parseInt(e.target.getAttribute('data-level'));
                this.switchToLevel(levelNumber);
            });
        });
    },

    switchToLevel(levelNumber) {
        console.log('Switching to level', levelNumber);

        // Update active button
        this.updateActiveButton(levelNumber);

        // Load level content
        this.loadLevel(levelNumber);

        // Update current level
        this.currentLevel = levelNumber;
    },

    updateActiveButton(levelNumber) {
        // Remove active class from all buttons
        document.querySelectorAll('.level-btn').forEach(btn =>
            btn.classList.remove('active')
        );

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-level="${levelNumber}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    },

    async loadLevel(levelNumber) {
        try {
            // Check if level module is available
            const levelKey = `Level${levelNumber}`;

            console.log(`Looking for ${levelKey}`, window[levelKey]);

            if (window[levelKey]) {
                console.log(`Loading ${levelKey} module`);
                const levelModule = window[levelKey];

                // Render content and description
                this.renderContent(levelModule.getContent());
                this.renderDescription(levelModule.getDescription());

                // Initialize level-specific functionality
                if (levelModule.initialize) {
                    levelModule.initialize();
                }

                // Store loaded level
                this.loadedLevels[levelNumber] = levelModule;
            } else {
                // Fallback for levels not yet implemented
                console.log(`Level ${levelNumber} module not found, using placeholder`);
                this.loadPlaceholderLevel(levelNumber);
            }
        } catch (error) {
            console.error('Error loading level:', error);
            this.loadPlaceholderLevel(levelNumber);
        }
    },

    loadPlaceholderLevel(levelNumber) {
        const content = `
            <div class="level-content">
                <h2>Level ${levelNumber}</h2>
                <p>This level is coming soon!</p>
                <p>Level ${levelNumber} content will be implemented here.</p>
            </div>
        `;

        const description = `
            <h3>Level ${levelNumber}</h3>
            <p>Description for Level ${levelNumber} coming soon!</p>
            <p>This level will include specific test automation challenges and scenarios.</p>
        `;

        this.renderContent(content);
        this.renderDescription(description);
    },

    renderContent(content) {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = content;
        }
    },

    renderDescription(description) {
        const sidebarRight = document.querySelector('.sidebar-right');
        if (sidebarRight) {
            sidebarRight.innerHTML = description;
        }
    },

    // Utility function for showing results (shared across levels)
    showResult(message, type, resultElement) {
        if (resultElement) {
            resultElement.innerHTML = message;
            resultElement.className = `result ${type}`;
        }
    }
};