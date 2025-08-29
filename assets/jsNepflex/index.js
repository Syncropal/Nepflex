document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');
            
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
        
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                    emailError.style.display = 'block';
                    emailInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                    emailInput.style.borderColor = '#ddd';
                }
                
                if (!passwordInput.value || passwordInput.value.length < 6) {
                    passwordError.style.display = 'block';
                    passwordInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    passwordError.style.display = 'none';
                    passwordInput.style.borderColor = '#ddd';
                }
                
                if (isValid) {
                    const loginBtn = document.querySelector('.login-btn');
                    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                    loginBtn.disabled = true;
                    
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
                        loginBtn.disabled = false;
                    }, 500);
                }
            });
            
            document.querySelectorAll('.socialBtn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const platform = this.querySelector('i').classList[1].split('-')[1];
                    
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                        btn.innerHTML = <i class="fab fa-${platform}"></i>;
                        btn.disabled = false;
                    }, );
                });
            });
        });