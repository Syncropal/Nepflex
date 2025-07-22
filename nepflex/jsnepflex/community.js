document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const newPostBtn = document.getElementById('newPostBtn');
            const postModal = document.getElementById('postModal');
            const closeModal = document.getElementById('closeModal');
            const postForm = document.getElementById('postForm');
            const fileInput = document.getElementById('fileInput');
            const imagePreview = document.getElementById('imagePreview');
            const previewImage = document.getElementById('previewImage');
            const removeImage = document.getElementById('removeImage');
            const logoutBtn = document.getElementById('logoutBtn');
            const tabs = document.querySelectorAll('.tab');
            const joinBtns = document.querySelectorAll('.join-btn');
            const rsvpBtns = document.querySelectorAll('.rsvp-btn');
            
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
            
            // New Post Button
            newPostBtn.addEventListener('click', function() {
                postModal.classList.add('active');
            });
            
            // Close Modal Button
            closeModal.addEventListener('click', function() {
                postModal.classList.remove('active');
            });
            
            // Close modal when clicking outside
            postModal.addEventListener('click', function(e) {
                if (e.target === postModal) {
                    postModal.classList.remove('active');
                }
            });
            
            // File Input Change
            fileInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                        imagePreview.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                }
            });
            
            // Remove Image Button
            removeImage.addEventListener('click', function() {
                previewImage.src = '#';
                imagePreview.style.display = 'none';
                fileInput.value = '';
            });
            
            // Post Form Submission
            postForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Post';
                    
                    // Reset form
                    this.reset();
                    previewImage.src = '#';
                    imagePreview.style.display = 'none';
                    
                    // Close modal
                    postModal.classList.remove('active');
                    
                    // Show success message
                    alert('Your post has been shared successfully!');
                }, 1500);
            });
            
            // Tab Switching
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Join Group Buttons
            joinBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.classList.contains('joined')) {
                        this.classList.remove('joined');
                        this.textContent = 'Join';
                    } else {
                        this.classList.add('joined');
                        this.textContent = 'Joined';
                    }
                });
            });
            
            // RSVP Buttons
            rsvpBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.classList.contains('going')) {
                        // Already going, clicking will remove RSVP
                        rsvpBtns.forEach(b => {
                            if (b.parentElement === this.parentElement) {
                                b.classList.remove('going');
                                if (b.textContent === 'Going') {
                                    b.textContent = 'Going';
                                } else {
                                    b.textContent = 'Interested';
                                }
                            }
                        });
                    } else {
                        // Not going yet
                        if (this.textContent === 'Interested') {
                            // Clicking "Interested"
                            this.textContent = 'Interested';
                        } else {
                            // Clicking "Going"
                            rsvpBtns.forEach(b => {
                                if (b.parentElement === this.parentElement && b.textContent === 'Going') {
                                    b.classList.remove('going');
                                }
                            });
                            this.classList.add('going');
                        }
                    }
                });
            });
            
            // Fallback dark mode check
            setTimeout(() => {
                if (!document.body.classList.contains('dark-mode') && 
                    !document.body.classList.contains('light-mode')) {
                    if (localStorage.getItem('darkMode') === 'true') {
                        document.body.classList.add('dark-mode');
                    }
                }
            }, 500);
        });