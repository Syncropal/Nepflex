document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const logSleepBtn = document.getElementById('logSleepBtn');
            const sleepModal = document.getElementById('sleepModal');
            const sleepForm = document.getElementById('sleepForm');
            const cancelSleepLog = document.getElementById('cancelSleepLog');
            const logoutBtn = document.getElementById('logoutBtn');
            const sleepChart = document.getElementById('sleepChart');
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            // Sleep stage data for the chart
            const sleepStages = [
                { type: 'awake', duration: 15, start: 0 },
                { type: 'light', duration: 45, start: 15 },
                { type: 'deep', duration: 75, start: 60 },
                { type: 'light', duration: 30, start: 135 },
                { type: 'rem', duration: 25, start: 165 },
                { type: 'light', duration: 40, start: 190 },
                { type: 'deep', duration: 60, start: 230 },
                { type: 'light', duration: 35, start: 290 },
                { type: 'rem', duration: 30, start: 325 },
                { type: 'light', duration: 45, start: 355 },
                { type: 'awake', duration: 10, start: 400 },
                { type: 'light', duration: 50, start: 410 },
                { type: 'rem', duration: 20, start: 460 }
            ];
            
            // Initialize
            renderSleepChart();
            setupEventListeners();
            
            function renderSleepChart() {
                // Clear existing chart
                sleepChart.innerHTML = '';
                
                // Calculate total sleep duration
                const totalDuration = sleepStages.reduce((sum, stage) => sum + stage.duration, 0);
                
                // Create bars for each sleep stage
                sleepStages.forEach(stage => {
                    const bar = document.createElement('div');
                    bar.className = `chart-bar ${stage.type}`;
                    
                    // Calculate bar dimensions
                    const barWidth = 100 / sleepStages.length;
                    const barHeight = (stage.duration / totalDuration) * 100;
                    const barLeft = (stage.start / totalDuration) * 100;
                    
                    // Apply styles
                    bar.style.width = `${barWidth}%`;
                    bar.style.height = `${barHeight}%`;
                    bar.style.left = `${barLeft}%`;
                    
                    // Add tooltip
                    bar.title = `${stage.type.toUpperCase()}: ${stage.duration} min`;
                    
                    sleepChart.appendChild(bar);
                });
            }
            
            function setupEventListeners() {
                // Log Sleep Button
                logSleepBtn.addEventListener('click', function() {
                    sleepModal.classList.add('active');
                });
                
                // Cancel Button
                cancelSleepLog.addEventListener('click', function() {
                    sleepModal.classList.remove('active');
                });
                
                // Sleep Form Submission
                sleepForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // In a real app, you would save the sleep data here
                    sleepModal.classList.remove('active');
                    showToast('Sleep logged successfully!');
                });
                
                // Filter Buttons
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        // In a real app, you would filter the history here
                    });
                });
                
                // Logout Button
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to logout?')) {
                        window.location.href = 'login.html';
                    }
                });
                
                // Close modal when clicking outside
                sleepModal.addEventListener('click', function(e) {
                    if (e.target === sleepModal) {
                        sleepModal.classList.remove('active');
                    }
                });
            }
            
            function showToast(message) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = message;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }
        });