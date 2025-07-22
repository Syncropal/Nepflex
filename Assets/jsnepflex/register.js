document.addEventListener('DOMContentLoaded', function() {
            const registerForm = document.getElementById('registerForm');
            const firstNameInput = document.getElementById('firstName');
            const lastNameInput = document.getElementById('lastName');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const togglePassword = document.getElementById('togglePassword');
            const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
            
            // Toggle password visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
            
            toggleConfirmPassword.addEventListener('click', function() {
                const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmPasswordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
            
            // Form validation
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Reset error messages
                document.querySelectorAll('.error-message').forEach(el => {
                    el.style.display = 'none';
                });
                
                // First name validation
                if (!firstNameInput.value.trim()) {
                    document.getElementById('firstName-error').style.display = 'block';
                    firstNameInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    firstNameInput.style.borderColor = '#ddd';
                }
                
                // Last name validation
                if (!lastNameInput.value.trim()) {
                    document.getElementById('lastName-error').style.display = 'block';
                    lastNameInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    lastNameInput.style.borderColor = '#ddd';
                }
                
                // Email validation
                if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                    document.getElementById('email-error').style.display = 'block';
                    emailInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    emailInput.style.borderColor = '#ddd';
                }
                
                // Password validation
                if (!passwordInput.value || passwordInput.value.length < 8) {
                    document.getElementById('password-error').style.display = 'block';
                    passwordInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    passwordInput.style.borderColor = '#ddd';
                }
                
                // Confirm password validation
                if (passwordInput.value !== confirmPasswordInput.value) {
                    document.getElementById('confirmPassword-error').style.display = 'block';
                    confirmPasswordInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    confirmPasswordInput.style.borderColor = '#ddd';
                }
                
                // Terms checkbox validation
                if (!document.getElementById('agreeTerms').checked) {
                    alert('Please agree to the Terms of Service and Privacy Policy');
                    isValid = false;
                }
                
                if (isValid) {
                    // Simulate registration process
                    const registerBtn = document.querySelector('.register-btn');
                    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
                    registerBtn.disabled = true;
                    
                    setTimeout(function() {
                        // Redirect to dashboard after successful login
                        window.location.href = 'dashboard.html';
                        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
                        registerBtn.disabled = false;
                    }, 2000);
                }
            });
        });