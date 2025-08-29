document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.sidebar');
            
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                const isExpanded = sidebar.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
                this.classList.toggle('active');
            });
        
            const themeToggle = document.getElementById('themeToggle');
        
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
    
            const notificationIcon = document.querySelector('.notification-icon');
            const notificationDropdown = document.querySelector('.notification-dropdown');
            
            notificationIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationDropdown.classList.toggle('active');
            });

            document.addEventListener('click', function() {
                notificationDropdown.classList.remove('active');
            });
            
            notificationDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        
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
        on
            simulateLoading();
    
        });