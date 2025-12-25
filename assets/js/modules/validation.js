/**
 * Validates the pattern against the test text.
 * @param {HTMLInputElement} patternInput
 * @param {HTMLInputElement} testText
 * @param {HTMLElement} validityResult
 * @param {HTMLElement} explanation
 */
export function validatePattern(patternInput, testText, validityResult, explanation) {
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
