document.addEventListener('DOMContentLoaded', function () {
    // Pattern tester functionality
    const patternInput = document.getElementById('pattern');
    const testText = document.getElementById('test-text');
    const validityResult = document.getElementById('validity-result');
    const explanation = document.getElementById('explanation');

    // Initial validation check
    validatePattern();

    // Add event listeners for live validation
    patternInput.addEventListener('input', validatePattern);
    testText.addEventListener('input', validatePattern);

    // Function to validate pattern against test text
    function validatePattern() {
        try {
            const patternValue = patternInput.value;
            const testValue = testText.value;

            if (!patternValue || !testValue) {
                validityResult.textContent = 'N/A';
                validityResult.className = '';
                explanation.textContent = 'Enter both pattern and test text';
                return;
            }

            // Create RegExp object from pattern input
            // HTML pattern attribute logic wraps the pattern in ^(?: )$ and uses 'u' flag
            // This ensures "a|b" matches "a" or "b", not "starts with a" or "ends with b"
            let regex;
            try {
                // Try with 'v' flag first (newer standard)
                regex = new RegExp(`^(?:${patternValue})$`, 'v');
            } catch (e) {
                // Fallback to 'u' flag
                regex = new RegExp(`^(?:${patternValue})$`, 'u');
            }

            const isValid = regex.test(testValue);

            // Update the UI
            validityResult.textContent = isValid ? 'True' : 'False';
            validityResult.className = isValid ? 'valid' : 'invalid';

            // Set explanation text
            if (isValid) {
                explanation.textContent = `"${testValue}" matches the pattern`;
                explanation.className = 'valid-text';
            } else {
                explanation.textContent = `"${testValue}" does not match the pattern`;
                explanation.className = 'invalid-text';
            }
        } catch (error) {
            // Handle invalid regex
            validityResult.textContent = 'Error';
            validityResult.className = 'invalid';
            explanation.textContent = 'Invalid regex pattern: ' + error.message;
            explanation.className = 'invalid-text';
        }
    }

    // Try it buttons functionality
    const tryButtons = document.querySelectorAll('.try-it');

    tryButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // Get pattern from data attribute
            const pattern = this.getAttribute('data-pattern');

            // Set pattern in the tester
            patternInput.value = pattern;

            // Provide example test text based on pattern type
            const patternTitle = this.parentElement
                .querySelector('h3')
                .textContent.toLowerCase();

            // Set appropriate example text based on pattern type
            if (patternTitle.includes('email')) {
                testText.value = 'test@example.com';
            } else if (
                patternTitle.includes('phone') &&
                patternTitle.includes('format')
            ) {
                testText.value = '(123) 456-7890';
            } else if (patternTitle.includes('phone')) {
                testText.value = '1234567890';
            } else if (
                patternTitle.includes('date') &&
                patternTitle.includes('dd/mm')
            ) {
                testText.value = '25/12/2023';
            } else if (
                patternTitle.includes('date') &&
                patternTitle.includes('yyyy-mm')
            ) {
                testText.value = '2023-12-25';
            } else if (
                patternTitle.includes('time') &&
                patternTitle.includes('24')
            ) {
                testText.value = '14:30';
            } else if (
                patternTitle.includes('time') &&
                patternTitle.includes('12')
            ) {
                testText.value = '02:30 PM';
            } else if (patternTitle.includes('url')) {
                testText.value = 'https://example.com';
            } else if (patternTitle.includes('password')) {
                testText.value = 'Password123';
            } else if (patternTitle.includes('username')) {
                testText.value = 'user_name123';
            } else if (patternTitle.includes('hex')) {
                testText.value = '#FF5733';
            } else if (patternTitle.includes('ip')) {
                testText.value = '192.168.1.1';
            } else {
                testText.value = 'Test input';
            }

            // Scroll to the pattern tester section
            document.querySelector('.pattern-tester').scrollIntoView({
                behavior: 'smooth',
            });

            // Validate with the new values
            validatePattern();

            // Highlight the tester container briefly
            const testerContainer = document.querySelector('.tester-container');
            testerContainer.classList.add('highlight-pulse');
            setTimeout(() => {
                testerContainer.classList.remove('highlight-pulse');
            }, 1000);
        });
    });

    // Copy buttons functionality
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const codeElement = this.parentElement.querySelector('code');
            const textToCopy = codeElement.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // Highlight input cards on hover to show interactivity
    const inputCards = document.querySelectorAll('.input-type-card');

    inputCards.forEach((card) => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor =
                this.getAttribute('data-supports') === 'true'
                    ? 'var(--success-color)'
                    : 'var(--danger-color)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = '#ddd';
        });
    });

    // Add form validation to demonstrate pattern attribute
    const supportedInputs = document.querySelectorAll(
        '.input-type-card[data-supports="true"] input'
    );

    supportedInputs.forEach((input) => {
        // Add required attribute for validation
        input.required = true;

        // Add visual feedback for validity
        input.addEventListener('input', function () {
            if (this.validity.patternMismatch) {
                this.style.borderColor = 'var(--danger-color)';
                this.title = 'Does not match the required pattern';
            } else {
                this.style.borderColor = 'var(--success-color)';
                this.title = 'Matches the required pattern';
            }
        });
    });
});
