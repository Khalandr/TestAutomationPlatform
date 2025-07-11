// TestAutomationPlatform - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('TestAutomationPlatform loaded');

    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Initialize level switching functionality
    if (typeof LevelManager !== 'undefined') {
        LevelManager.init();
    } else {
        console.error('LevelManager not found');
    }

    // TODO: Initialize router when needed
    // if (typeof Router !== 'undefined') {
    //     Router.init();
    // }
}