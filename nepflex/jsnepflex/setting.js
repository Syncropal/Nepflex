document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const logoutBtn = document.getElementById('logoutBtn');
            
            // Initialize dark mode from parent or localStorage
            function initializeDarkMode() {
                // Check if we're embedded in the dashboard iframe
                if (window.parent !== window) {
                    // Request dark mode state from parent
                    window.parent.postMessage({ type: 'getDarkModeState' }, '*');
                    
                    // Listen for response
                    window.addEventListener('message', function(event) {
                        if (event.data.type === 'darkModeState') {
                            toggleDarkMode(event.data.enabled);
                        }
                    });
                } else {
                    // Check localStorage if standalone
                    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
                    toggleDarkMode(darkModeEnabled);
                }
            }
            
            // Toggle dark mode
            function toggleDarkMode(enabled) {
                if (enabled) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }
            
            // Initialize dark mode
            initializeDarkMode();
            
            // Fallback dark mode check
            setTimeout(() => {
                if (!document.body.classList.contains('dark-mode') && 
                    !document.body.classList.contains('light-mode')) {
                    if (localStorage.getItem('darkMode') === 'true') {
                        document.body.classList.add('dark-mode');
                    }
                }
            }, 500);
            
            // Logout button
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real app, you would handle logout here
                alert('You have been logged out');
                window.location.href = 'login.html';
            });
        });