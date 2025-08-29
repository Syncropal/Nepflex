document.addEventListener('DOMContentLoaded', function() {
            const currentDateEl = document.getElementById('currentDate');
            const prevDayBtn = document.getElementById('prevDay');
            const nextDayBtn = document.getElementById('nextDay');
            
            let currentDate = new Date();
            
            function updateDateDisplay() {
                const options = { weekday: 'long', month: 'long', day: 'numeric' };
                currentDateEl.textContent = currentDate.toLocaleDateString('en-US', options);
            }
            
            prevDayBtn.addEventListener('click', function() {
                currentDate.setDate(currentDate.getDate() - 1);
                updateDateDisplay();
                
            });
            
            nextDayBtn.addEventListener('click', function() {
                currentDate.setDate(currentDate.getDate() + 1);
                updateDateDisplay();
            });
            
            updateDateDisplay();
            
            const mealTabs = document.querySelectorAll('.meal-tab');
            mealTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    mealTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
    
            document.getElementById('addMealBtn').addEventListener('click', function() {
                alert('Open meal entry form');
            });

            const waterProgress = document.querySelector('.water-progress-bar');
            const waterLabel = document.querySelector('.water-label');
            let waterAmount = 2.1;
            const waterTarget = 3;
            
            document.getElementById('addWater').addEventListener('click', function() {
                waterAmount += 0.25;
                if(waterAmount > waterTarget) waterAmount = waterTarget;
                
                const percent = Math.round((waterAmount / waterTarget) * 100);
                waterProgress.style.width = `${percent}%`;
                waterLabel.textContent = `${percent}% Completed`;
                
            });

            document.querySelectorAll('.fa-trash').forEach(btn => {
                btn.addEventListener('click', function() {
                    const mealItem = this.closest('.meal-item');
                    if(confirm('Delete this food item?')) {
                        mealItem.style.transform = 'translateX(-100%)';
                        mealItem.style.opacity = '0';
                        setTimeout(() => mealItem.remove(), 300);
                    }
                });
            });
        
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        });