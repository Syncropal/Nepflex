document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const newWorkoutBtn = document.getElementById('newWorkoutBtn');
            const workoutPrograms = document.getElementById('workoutPrograms');
            const workoutTypeFilter = document.getElementById('workoutType');
            const difficultyFilter = document.getElementById('difficulty');
            const durationFilter = document.getElementById('duration');
            const categoryCards = document.querySelectorAll('.category-card');
            const logoutBtn = document.getElementById('logoutBtn');
            const modal = document.getElementById('workoutModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalClose = document.getElementById('modalClose');
            
            // State
            let programs = [];
            let currentCategory = 'all';
            let currentFilters = {
                type: 'all',
                difficulty: 'all',
                duration: 'all'
            };
            
            // Initialize
            loadWorkoutPrograms();
            setupEventListeners();
            
            function loadWorkoutPrograms() {
                // Show loading state
                workoutPrograms.classList.add('loading');
                
                // Simulate API call
                setTimeout(() => {
                    // Mock data for demo
                    programs = [
                        {
                            id: 1,
                            name: 'Full Body Strength',
                            description: 'Build muscle and strength with this comprehensive full body workout.',
                            category: 'strength',
                            difficulty: 'intermediate',
                            duration: '45 min',
                            exercises: 6,
                            calories: '450 cal',
                            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                            imageAlt: 'Person lifting weights'
                        },
                        {
                            id: 2,
                            name: 'Cardio Blast',
                            description: 'Boost your endurance with this high-energy cardio session.',
                            category: 'cardio',
                            difficulty: 'beginner',
                            duration: '25 min',
                            exercises: 4,
                            calories: '350 cal',
                            image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                            imageAlt: 'Person running on treadmill'
                        },
                        {
                            id: 3,
                            name: 'HIIT Challenge',
                            description: 'Maximize fat burning with this intense HIIT workout.',
                            category: 'hiit',
                            difficulty: 'advanced',
                            duration: '20 min',
                            exercises: 8,
                            calories: '500 cal',
                            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                            imageAlt: 'Person doing burpees'
                        },
                        {
                            id: 4,
                            name: 'Morning Yoga Flow',
                            description: 'Start your day with this energizing yoga sequence.',
                            category: 'yoga',
                            difficulty: 'beginner',
                            duration: '30 min',
                            exercises: 12,
                            calories: '200 cal',
                            image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                            imageAlt: 'Person doing yoga'
                        }
                    ];
                    
                    renderWorkoutPrograms();
                    workoutPrograms.classList.remove('loading');
                }, 1000);
            }
            
            function renderWorkoutPrograms(filteredPrograms = programs) {
                if (filteredPrograms.length === 0) {
                    workoutPrograms.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-dumbbell"></i>
                            <h3>No Workout Programs Found</h3>
                            <p>Try adjusting your filters or create a new custom workout</p>
                            <button class="new-workout-btn" id="emptyStateNewWorkoutBtn">
                                <i class="fas fa-plus"></i> New Workout
                            </button>
                        </div>
                    `;
                    return;
                }
                
                workoutPrograms.innerHTML = filteredPrograms.map(program => `
                    <div class="program-card" 
                         data-id="${program.id}" 
                         data-category="${program.category}" 
                         data-difficulty="${program.difficulty}" 
                         data-duration="${program.duration.includes('min') ? 
                             (parseInt(program.duration) < 30 ? 'short' : 
                             (parseInt(program.duration) <= 60 ? 'medium' : 'long')) : 'medium'}">
                        <div class="program-image" 
                             style="background-image: url('${program.image}');"
                             aria-label="${program.imageAlt}">
                        </div>
                        <div class="program-details">
                            <span class="program-level">${program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}</span>
                            <h3 class="program-name">${program.name}</h3>
                            <p class="program-description">${program.description}</p>
                            <div class="program-stats">
                                <div class="stat">
                                    <i class="fas fa-clock" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${program.duration}</div>
                                        <div class="stat-label">Duration</div>
                                    </div>
                                </div>
                                <div class="stat">
                                    <i class="fas fa-dumbbell" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${program.exercises}</div>
                                        <div class="stat-label">${program.category === 'yoga' ? 'Poses' : 'Exercises'}</div>
                                    </div>
                                </div>
                                <div class="stat">
                                    <i class="fas fa-fire" aria-hidden="true"></i>
                                    <div>
                                        <div class="stat-value">${program.calories}</div>
                                        <div class="stat-label">Burned</div>
                                    </div>
                                </div>
                            </div>
                            <div class="program-actions">
                                <button class="action-btn start-btn">
                                    <i class="fas fa-play" aria-hidden="true"></i> Start
                                </button>
                                <button class="action-btn view-btn">
                                    <i class="fas fa-eye" aria-hidden="true"></i> View
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Reattach event listeners to new elements
                setupProgramEventListeners();
            }
            
            function setupEventListeners() {
                // New Workout Button
                newWorkoutBtn.addEventListener('click', showNewWorkoutForm);
                
                // Filter functionality
                workoutTypeFilter.addEventListener('change', updateFilters);
                difficultyFilter.addEventListener('change', updateFilters);
                durationFilter.addEventListener('change', updateFilters);
                
                // Category cards
                categoryCards.forEach(card => {
                    card.addEventListener('click', function() {
                        categoryCards.forEach(c => c.classList.remove('active'));
                        this.classList.add('active');
                        currentCategory = this.dataset.category;
                        filterPrograms();
                    });
                });
                
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
                
                // Setup program event listeners for initial programs
                setupProgramEventListeners();
            }
            
            function setupProgramEventListeners() {
                // Start buttons
                document.querySelectorAll('.start-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const programId = this.closest('.program-card').dataset.id;
                        const program = programs.find(p => p.id == programId);
                        showModal('Start Workout', `Starting: ${program.name}`);
                    });
                });
                
                // View buttons
                document.querySelectorAll('.view-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const programId = this.closest('.program-card').dataset.id;
                        const program = programs.find(p => p.id == programId);
                        showModal('View Workout', `Viewing details for: ${program.name}`);
                    });
                });
            }
            
            function updateFilters() {
                currentFilters = {
                    type: workoutTypeFilter.value,
                    difficulty: difficultyFilter.value,
                    duration: durationFilter.value
                };
                filterPrograms();
            }
            
            function filterPrograms() {
                let filtered = programs;
                
                // Filter by category
                if (currentCategory !== 'all') {
                    filtered = filtered.filter(program => program.category === currentCategory);
                }
                
                // Apply other filters
                if (currentFilters.type !== 'all') {
                    filtered = filtered.filter(program => program.category === currentFilters.type);
                }
                
                if (currentFilters.difficulty !== 'all') {
                    filtered = filtered.filter(program => program.difficulty === currentFilters.difficulty);
                }
                
                if (currentFilters.duration !== 'all') {
                    const durationMap = {
                        'short': p => parseInt(p.duration) < 30,
                        'medium': p => parseInt(p.duration) >= 30 && parseInt(p.duration) <= 60,
                        'long': p => parseInt(p.duration) > 60
                    };
                    filtered = filtered.filter(durationMap[currentFilters.duration]);
                }
                
                renderWorkoutPrograms(filtered);
            }
            
            function showNewWorkoutForm() {
                showModal('New Workout', 'This would show a form to create a new workout program in a real app');
            }
            
            function handleLogout(e) {
                e.preventDefault();
                showModal('Logout', 'Are you sure you want to logout?', () => {
                    // In a real app, you would clear session data here
                    window.location.href = 'login.html';
                });
            }
            
            function showModal(title, message) {
                modalTitle.textContent = title;
                modalMessage.textContent = message;
                modal.classList.add('active');
                
                // Focus the close button for accessibility
                modalClose.focus();
            }
            
            function closeModal() {
                modal.classList.remove('active');
            }
        });