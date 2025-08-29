document.addEventListener('DOMContentLoaded', function() {
            // Time period selector
            const timeOptions = document.querySelectorAll('.timeOption');
            timeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    timeOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    // In real app: Update charts and data
                    updateCharts(this.textContent.trim());
                });
            });
            
            // Initialize charts
            const activityChart = initActivityChart();
            const sleepChart = initSleepChart();
            
            // New goal button
            document.getElementById('newGoalBtn').addEventListener('click', function() {
                const goalList = document.getElementById('goalList');
                const newGoal = document.createElement('li');
                newGoal.className = 'goalItem';
                newGoal.innerHTML = `
                    <input type="checkbox" class="goalCheckbox">
                    <div class="goalInfo">
                        <div class="goalName">New fitness goal</div>
                        <div class="goalProgress">
                            <div class="goalProgressBar" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="goalActions">
                        <button class="goalAction-btn" aria-label="Edit goal">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="goalAction-btn" aria-label="Delete goal">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                goalList.prepend(newGoal);
                setupGoalInteractions(newGoal);
            });
            
            // Setup goal interactions
            function setupGoalInteractions(goalItem) {
                const checkbox = goalItem.querySelector('.goalCheckbox');
                const deleteBtn = goalItem.querySelector('.fa-trash').closest('button');
                
                checkbox.addEventListener('change', function() {
                    goalItem.style.opacity = this.checked ? '0.6' : '1';
                });
                
                deleteBtn.addEventListener('click', function() {
                    if(confirm('Delete this goal?')) {
                        goalItem.style.transform = 'translateX(-100%)';
                        goalItem.style.opacity = '0';
                        setTimeout(() => goalItem.remove(), 300);
                    }
                });
            }
            
            // Initialize all existing goals
            document.querySelectorAll('.goalItem').forEach(setupGoalInteractions);
            
            // Logout button
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                // In real app: Clear session data
                window.location.href = 'login.html';
            });
            
            // Chart functions
            function initActivityChart() {
                const ctx = document.getElementById('activityChart').getContext('2d');
                return new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Steps',
                            data: [6500, 5900, 8000, 8100, 5600, 10500, 9800],
                            borderColor: '#2e7d32',
                            borderWidth: 3,
                            tension: 0.3,
                            fill: true,
                            backgroundColor: 'rgba(46, 125, 50, 0.1)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        devicePixelRatio: 2,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(46, 125, 50, 0.9)',
                                bodyFont: { size: 12 },
                                titleFont: { size: 14, weight: 'bold' },
                                padding: 10,
                                cornerRadius: 6,
                                displayColors: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: { color: 'rgba(0,0,0,0.05)' },
                                ticks: { color: '#666' }
                            },
                            x: {
                                grid: { display: false },
                                ticks: { color: '#666' }
                            }
                        },
                        animation: {
                            duration: 1000
                        }
                    }
                });
            }
            
            function initSleepChart() {
                const ctx = document.getElementById('sleepChart').getContext('2d');
                return new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Hours',
                            data: [7.2, 6.8, 7.5, 8.1, 6.5, 9.2, 8.7],
                            backgroundColor: 'rgba(46, 125, 50, 0.7)',
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        devicePixelRatio: 2,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(46, 125, 50, 0.9)',
                                bodyFont: { size: 12 },
                                titleFont: { size: 14, weight: 'bold' },
                                padding: 10,
                                cornerRadius: 6,
                                displayColors: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 5,
                                max: 10,
                                grid: { color: 'rgba(0,0,0,0.05)' },
                                ticks: { color: '#666' }
                            },
                            x: {
                                grid: { display: false },
                                ticks: { color: '#666' }
                            }
                        },
                        animation: {
                            duration: 1000
                        }
                    }
                });
            }
            
            function updateCharts(timeRange) {
                // In real app: Fetch new data based on timeRange
                console.log('Updating charts for:', timeRange);
                // Simulate loading
                activityChart.data.datasets[0].data = [7000, 6500, 8500, 8200, 6000, 11000, 10000];
                sleepChart.data.datasets[0].data = [7.5, 7.0, 7.8, 8.3, 6.8, 9.5, 9.0];
                activityChart.update();
                sleepChart.update();
            }
        });