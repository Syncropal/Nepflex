document.addEventListener('DOMContentLoaded', function() {
            // Toggle sidebar on mobile
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.sidebar');
            
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                const isExpanded = sidebar.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
                this.classList.toggle('active');
            });
            
            // Dark mode toggle with localStorage persistence
            const themeToggle = document.getElementById('themeToggle');
            
            // Check for saved user preference or use system preference
            const savedMode = localStorage.getItem('darkMode');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedMode === 'true' || (!savedMode && systemPrefersDark)) {
                themeToggle.checked = true;
                document.body.classList.add('dark-mode');
            }
            
            themeToggle.addEventListener('change', function() {
                if(this.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'true');
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'false');
                }
            });
            
            // Notification dropdown
            const notificationIcon = document.querySelector('.notification-icon');
            const notificationDropdown = document.querySelector('.notification-dropdown');
            
            notificationIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                notificationDropdown.classList.remove('active');
            });
            
            // Prevent dropdown from closing when clicking inside
            notificationDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Simulate loading data
            function simulateLoading() {
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.classList.add('loading');
                });
                
                setTimeout(() => {
                    cards.forEach(card => {
                        card.classList.remove('loading');
                    });
                }, 1500);
            }
            
            // Initial load simulation
            simulateLoading();
            
            // You would replace this with actual API calls in a real app
            // Example:
            // async function fetchDashboardData() {
            //     try {
            //         const response = await fetch('/api/dashboard');
            //         const data = await response.json();
            //         updateUI(data);
            //     } catch (error) {
            //         console.error('Error fetching data:', error);
            //     }
            // }
        });