document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');
            
            // Toggle password visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
            
            // Form validation
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Email validation
                if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                    emailError.style.display = 'block';
                    emailInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                    emailInput.style.borderColor = '#ddd';
                }
                
                // Password validation
                if (!passwordInput.value || passwordInput.value.length < 6) {
                    passwordError.style.display = 'block';
                    passwordInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    passwordError.style.display = 'none';
                    passwordInput.style.borderColor = '#ddd';
                }
                
                if (isValid) {
                    // Simulate login process
                    const loginBtn = document.querySelector('.login-btn');
                    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                    loginBtn.disabled = true;
                    
                    setTimeout(function() {
                        // In a real application, you would redirect here
                        window.location.href = 'dashboard.html';
                        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
                        loginBtn.disabled = false;
                    }, 1500);
                }
            });
            
            // Social login buttons
            document.querySelectorAll('.social-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const platform = this.querySelector('i').classList[1].split('-')[1];
                    alert(`Redirecting to ${platform} login...`);
                    // In a real app, this would redirect to OAuth login
                });
            });
        });