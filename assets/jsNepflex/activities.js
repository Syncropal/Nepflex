document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const newActivityBtn = document.getElementById('newActivityBtn');
            const activitiesGrid = document.getElementById('activitiesGrid');
            const activityTypeFilter = document.getElementById('activityType');
            const logoutBtn = document.getElementById('logoutBtn');
            const modal = document.getElementById('activityModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalClose = document.getElementById('modalClose');
            const darkModeToggle = document.getElementById('darkModeToggle');
            
            // State
            let activities = [];
            
            // Initialize
            loadActivities();
            setupEventListeners();
            checkDarkModePreference();
            
            function loadActivities() {
                // Show loading state
                activitiesGrid.classList.add('loading');

                setTimeout(() => {
                    // Mock data for demo
                    activities = [
                        {
                            id: 1,
                            type: 'running',
                            name: 'Morning Run',
                            description: 'Great run through the park with perfect weather conditions.',
                            duration: '32 min',
                            calories: '420 cal',
                            distance: '5.2 km',
                            image: 'assets/images/running in park.jpg',
                            imageAlt: 'Person running in park'
                        },
                        {
                            id: 2,
                            type: 'yoga',
                            name: 'Evening Yoga Session',
                            description: 'Relaxing yoga flow to unwind after a long day.',
                            duration: '45 min',
                            calories: '280 cal',
                            effort: '85%',
                            image: 'assets/images/yoga teacher.webp',
                            imageAlt: 'Person doing yoga'
                        },
                        {
                            id: 3,
                            type: 'cycling',
                            name: 'Weekend Bike Ride',
                            description: 'Long ride along the river trail with friends.',
                            duration: '2h 15m',
                            calories: '950 cal',
                            distance: '28 km',
                            image: 'assets/images/weekend bike ride.jpg',
                            imageAlt: 'People taking Picture Behind Sun with their Bikes'
                        }
                    ];
                    
                    renderActivities();
                    activitiesGrid.classList.remove('loading');
                }, 1000);
            }
            
            function renderActivities(filteredActivities = activities) {
                if (filteredActivities.length === 0) {
                    activitiesGrid.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-calendar-times"></i>
                            <h3>No Activities Found</h3>
                            <p>Get started by logging your first activity!</p>
                            <button class="new-activity-btn" id="emptyStateNewActivityBtn">
                                <i class="fas fa-plus"></i> New Activity
                            </button>
                        </div>
                    `;
                    return;
                }
                
                activitiesGrid.innerHTML = filteredActivities.map(activity => `
                    <div class="activity-card" data-id="${activity.id}">
                        <div class="activity-image" 
                             style="background-image: url('${activity.image}');"
                             aria-label="${activity.imageAlt}">
                        </div>
                        <div class="activity-details">
                            <span class="activity-type">${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                            <h3 class="activity-name">${activity.name}</h3>
                            <p class="activity-description">${activity.description}</p>
                            <div class="activity-stats">
                                <div class="stat">
                                    <i class="fas fa-clock" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${activity.duration}</div>
                                        <div class="stat-label">Duration</div>
                                    </div>
                                </div>
                                <div class="stat">
                                    <i class="fas fa-fire" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${activity.calories}</div>
                                        <div class="stat-label">Burned</div>
                                    </div>
                                </div>
                                ${activity.distance ? `
                                <div class="stat">
                                    <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${activity.distance}</div>
                                        <div class="stat-label">Distance</div>
                                    </div>
                                </div>
                                ` : activity.effort ? `
                                <div class="stat">
                                    <i class="fas fa-heart" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${activity.effort}</div>
                                        <div class="stat-label">Effort</div>
                                    </div>
                                </div>
                                ` : ''}
                            </div>
                            <div class="activity-actions">
                                <button class="action-btn edit-btn">
                                    <i class="fas fa-edit" aria-hidden="true"></i> Edit
                                </button>
                                <button class="action-btn delete-btn delete">
                                    <i class="fas fa-trash" aria-hidden="true"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Reattach event listeners to new elements
                setupCardEventListeners();
            }
            
            function setupEventListeners() {
                // New Activity Button
                newActivityBtn.addEventListener('click', showNewActivityForm);
                
                // Filter functionality
                activityTypeFilter.addEventListener('change', filterActivities);
                
                // Logout button
                logoutBtn.addEventListener('click', handleLogout);
                
                // Modal close button
                modalClose.addEventListener('click', closeModal);
                
                // Close modal when clicking outside
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
                
                // Dark mode toggle
                darkModeToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleDarkMode();
                });
                
                // Listen for system color scheme changes
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                    // Only respond if the user hasn't set a preference
                    if (localStorage.getItem('darkMode') === null) {
                        if (e.matches) {
                            document.body.classList.add('dark-mode');
                            updateDarkModeIcon(true);
                        } else {
                            document.body.classList.remove('dark-mode');
                            updateDarkModeIcon(false);
                        }
                    }
                });
                
                // Setup card event listeners for initial cards
                setupCardEventListeners();
            }
            
            function setupCardEventListeners() {
                // Edit buttons
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const activityId = this.closest('.activity-card').dataset.id;
                        const activity = activities.find(a => a.id == activityId);
                        showModal('Edit Activity', `Editing: ${activity.name}`);
                    });
                });
                
                // Delete buttons
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const activityCard = this.closest('.activity-card');
                        const activityId = activityCard.dataset.id;
                        const activity = activities.find(a => a.id == activityId);
                        
                        showModal('Delete Activity', `Are you sure you want to delete "${activity.name}"?`, true, () => {
                            // Confirm delete
                            activityCard.style.opacity = '0';
                            setTimeout(() => {
                                activities = activities.filter(a => a.id != activityId);
                                renderActivities();
                                showModal('Success', 'Activity deleted successfully');
                            }, 300);
                        });
                    });
                });
            }
            
            function filterActivities() {
                const filterValue = activityTypeFilter.value.toLowerCase();
                
                if (filterValue === 'all') {
                    renderActivities();
                    return;
                }
                
                const filtered = activities.filter(activity => 
                    activity.type.toLowerCase() === filterValue
                );
                
                renderActivities(filtered);
            }
            
            function showNewActivityForm() {
                showModal('New Activity', 'This would show a form to create a new activity in a real app');
            }
            
            function handleLogout(e) {
                e.preventDefault();
                showModal('Logout', 'Are you sure you want to logout?', true, () => {
                    // In a real app, you would clear session data here
                    window.location.href = 'index.html';
                });
            }
            
            function showModal(title, message, showCancel = false, confirmCallback = null) {
                modalTitle.textContent = title;
                modalMessage.textContent = message;
                modal.classList.add('active');
                
                // Focus the close button for accessibility
                modalClose.focus();
            }
            
            function closeModal() {
                modal.classList.remove('active');
            }
            
            // Dark Mode Functions
            function checkDarkModePreference() {
                // Check localStorage first
                const savedPreference = localStorage.getItem('darkMode');
                
                // If no preference saved, check system preference
                if (savedPreference === null) {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                        document.body.classList.add('dark-mode');
                        updateDarkModeIcon(true);
                    }
                    return;
                }
                
                // Use saved preference
                const isDarkMode = savedPreference === 'enabled';
                if (isDarkMode) {
                    document.body.classList.add('dark-mode');
                    updateDarkModeIcon(true);
                }
            }
            
            function updateDarkModeIcon(isDarkMode) {
                const icon = darkModeToggle.querySelector('i');
                const text = darkModeToggle.querySelector('span');
                if (isDarkMode) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    text.textContent = 'Light Mode';
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    text.textContent = 'Dark Mode';
                }
            }
            
            function toggleDarkMode() {
                const isDarkMode = document.body.classList.toggle('dark-mode');
                if (isDarkMode) {
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    localStorage.setItem('darkMode', 'disabled');
                }
                updateDarkModeIcon(isDarkMode);
            }
        });