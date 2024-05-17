
      document.addEventListener("DOMContentLoaded", function () {
        const passwordInput = document.getElementById("password");
        const togglePassword = document.querySelector(".toggle-password i");
        const specialCharCheckbox = document.getElementById("special-char");
        const minLengthCheckbox = document.getElementById("min-length");
        const numberCheckbox = document.getElementById("number");
        const submitButton = document.querySelector('button[type="submit"]');
        const passwordStrengthMeter = document.getElementById(
          "password-strength-meter"
        );

        function calculatePasswordStrength(password) {
          let strength = 0;

          // Check for the presence of different character types
          const hasUppercase = /[A-Z]/.test(password);
          const hasLowercase = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

          // Calculate strength based on character types
          if (hasUppercase) {
            strength += 20; // Add strength for uppercase letters
          }
          if (hasLowercase) {
            strength += 20; // Add strength for lowercase letters
          }
          if (hasNumber) {
            strength += 20; // Add strength for numbers
          }
          if (hasSpecialChar) {
            strength += 20; // Add strength for special characters
          }

          // Calculate strength based on length
          const length = password.length;
          if (length >= 8) {
            strength += Math.min(20, length * 2); // Add strength for length
          } else if (length >= 5) {
            strength += 10; // Partial strength for moderate length
          }

          // Ensure strength is not more than 100
          return Math.min(100, strength);
        }

        function updatePasswordStrength() {
          const password = passwordInput.value;
          const strength = calculatePasswordStrength(password);
          passwordStrengthMeter.value = strength;

          // Remove all previous strength classes
          passwordStrengthMeter.classList.remove("weak", "medium", "strong");

          // Add class based on strength
          if (strength < 40) {
            passwordStrengthMeter.classList.add("weak");
          } else if (strength < 70) {
            passwordStrengthMeter.classList.add("medium");
          } else {
            passwordStrengthMeter.classList.add("strong");
          }
        }

        passwordInput.addEventListener("input", function () {
          validatePassword();
          updatePasswordStrength(); // Update password strength whenever input changes
        });

        function validatePassword() {
          const password = passwordInput.value;

          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          const hasMinLength = password.length >= 8;
          const hasNumber = /\d/.test(password);

          specialCharCheckbox.checked = hasSpecialChar;
          minLengthCheckbox.checked = hasMinLength;
          numberCheckbox.checked = hasNumber;

          submitButton.disabled = !(
            hasSpecialChar &&
            hasMinLength &&
            hasNumber
          );
        }

        function togglePasswordVisibility() {
          const isPasswordVisible = passwordInput.type === "text";
          passwordInput.type = isPasswordVisible ? "password" : "text";
          togglePassword.classList.toggle("fa-eye");
          togglePassword.classList.toggle("fa-eye-slash");
        }

        passwordInput.addEventListener("input", validatePassword);
        togglePassword.parentElement.addEventListener(
          "click",
          togglePasswordVisibility
        );
      });
   
