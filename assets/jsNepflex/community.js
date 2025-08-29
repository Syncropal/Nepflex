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
            
        
            function initializeDarkMode() {
            
                if (window.parent !== window) {
                
                    window.parent.postMessage({ type: 'getDarkModeState' }, '*');

                    window.addEventListener('message', function(event) {
                        if (event.data.type === 'darkModeState') {
                            toggleDarkMode(event.data.enabled);
                        }
                    });
                } else {
                    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
                    toggleDarkMode(darkModeEnabled);
                }
            }

            function toggleDarkMode(enabled) {
                if (enabled) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }

            initializeDarkMode();

            newPostBtn.addEventListener('click', function() {
                postModal.classList.add('active');
            });

            closeModal.addEventListener('click', function() {
                postModal.classList.remove('active');
            });
            
            postModal.addEventListener('click', function(e) {
                if (e.target === postModal) {
                    postModal.classList.remove('active');
                }
            });

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

            removeImage.addEventListener('click', function() {
                previewImage.src = '#';
                imagePreview.style.display = 'none';
                fileInput.value = '';
            });

            postForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Post';

                    this.reset();
                    previewImage.src = '#';
                    imagePreview.style.display = 'none';

                    postModal.classList.remove('active');

                    alert('Your post has been shared successfully!');
                }, 1500);
            });

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

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

            rsvpBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.classList.contains('going')) {
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
                        if (this.textContent === 'Interested') {
                            this.textContent = 'Interested';
                        } else {
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

            setTimeout(() => {
                if (!document.body.classList.contains('dark-mode') && 
                    !document.body.classList.contains('light-mode')) {
                    if (localStorage.getItem('darkMode') === 'true') {
                        document.body.classList.add('dark-mode');
                    }
                }
            }, 500);
        });