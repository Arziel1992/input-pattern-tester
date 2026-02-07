/**
 * Input Pattern Tester - Main JavaScript
 * Interactive regex pattern tester with real-time match highlighting
 */

// Open the combined flags modal
window.openFlagsModal = function () {
    document.getElementById('modal-title').textContent =
        'Regex Flags Explained';
    document.getElementById('modal-content').innerHTML = `
        <div class="space-y-4">
            <div class="p-3 bg-gray-50 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-1"><code class="bg-primary-100 text-primary-700 px-1 rounded">g</code> Global</h4>
                <p class="text-sm">Find all matches in the string, not just the first one.</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-1"><code class="bg-primary-100 text-primary-700 px-1 rounded">i</code> Case Insensitive</h4>
                <p class="text-sm">Match regardless of letter case. <code>/hello/i</code> matches "Hello", "HELLO", etc.</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-1"><code class="bg-primary-100 text-primary-700 px-1 rounded">m</code> Multiline</h4>
                <p class="text-sm"><code>^</code> and <code>$</code> match the start/end of each line, not just the whole string.</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-1"><code class="bg-primary-100 text-primary-700 px-1 rounded">s</code> Dotall</h4>
                <p class="text-sm">Makes <code>.</code> match newline characters as well as any other character.</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-1"><code class="bg-primary-100 text-primary-700 px-1 rounded">u</code> Unicode</h4>
                <p class="text-sm">Enable full Unicode support, including surrogate pairs and <code>\\p{Letter}</code> escapes.</p>
            </div>
        </div>
    `;
    document.getElementById('info-modal').classList.remove('hidden');
    document.getElementById('info-modal').classList.add('flex');
    document.getElementById('modal-backdrop').classList.remove('hidden');
};

// Close modal
window.closeModal = function () {
    document.getElementById('info-modal').classList.add('hidden');
    document.getElementById('info-modal').classList.remove('flex');
    document.getElementById('modal-backdrop').classList.add('hidden');
};

// Common regex patterns library
const commonPatterns = {
    email: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    phone: '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
    url: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    ip: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    date: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])',
    hex: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})',
};

// Load a common pattern
window.loadPattern = function (name) {
    if (commonPatterns[name]) {
        document.getElementById('pattern-input').value = commonPatterns[name];
        updateMatches();
    }
};

// DOM Elements
const patternInput = document.getElementById('pattern-input');
const testTextInput = document.getElementById('test-text-input');
const flagG = document.getElementById('flag-g');
const flagI = document.getElementById('flag-i');
const flagM = document.getElementById('flag-m');
const flagS = document.getElementById('flag-s');
const flagU = document.getElementById('flag-u');
const flagsDisplay = document.getElementById('flags-display');
const matchesDisplay = document.getElementById('matches-display');
const matchCount = document.getElementById('match-count');
const captureGroups = document.getElementById('capture-groups');
const patternStatus = document.getElementById('pattern-status');
const replaceToggle = document.getElementById('replace-toggle');
const replaceSection = document.getElementById('replace-section');
const replaceInput = document.getElementById('replace-input');
const replaceResult = document.getElementById('replace-result');
const codeOutput = document.getElementById('code-output');
let currentCodeLang = 'js';

// Get current flags
function getFlags() {
    let flags = '';
    if (flagG.checked) flags += 'g';
    if (flagI.checked) flags += 'i';
    if (flagM.checked) flags += 'm';
    if (flagS.checked) flags += 's';
    if (flagU.checked) flags += 'u';
    return flags;
}

// Update flags display
function updateFlagsDisplay() {
    flagsDisplay.textContent = '/' + getFlags();
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update matches display
function updateMatches() {
    const pattern = patternInput.value;
    const text = testTextInput.value;
    const flags = getFlags();
    updateFlagsDisplay();

    if (!pattern) {
        matchesDisplay.innerHTML =
            '<span class="text-gray-400">No matches found</span>';
        matchCount.textContent = '0';
        captureGroups.innerHTML =
            '<p class="text-sm text-gray-500">No capture groups in this pattern</p>';
        patternStatus.classList.add('hidden');
        updateCodeGeneration();
        return;
    }

    try {
        const regex = new RegExp(pattern, flags);
        patternStatus.classList.add('hidden');

        const matches = [
            ...text.matchAll(
                new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'),
            ),
        ];
        matchCount.textContent = matches.length.toString();

        if (matches.length === 0) {
            matchesDisplay.innerHTML =
                escapeHtml(text) ||
                '<span class="text-gray-400">No matches found</span>';
            captureGroups.innerHTML =
                '<p class="text-sm text-gray-500">No capture groups in this pattern</p>';
        } else {
            let result = '';
            let lastIndex = 0;
            matches.forEach((match, i) => {
                result += escapeHtml(text.slice(lastIndex, match.index));
                result += `<span class="match-highlight${i % 2 ? '-alt' : ''}">${escapeHtml(match[0])}</span>`;
                lastIndex = match.index + match[0].length;
            });
            result += escapeHtml(text.slice(lastIndex));
            matchesDisplay.innerHTML = result;

            let groupsHtml = '';
            matches.forEach((match, matchIdx) => {
                groupsHtml += `<div class="p-3 rounded-lg capture-group-${matchIdx % 5}"><p class="text-sm font-medium text-gray-800">Match ${matchIdx + 1}: ${escapeHtml(match[0])}</p>`;
                for (let i = 1; i < match.length; i++) {
                    if (match[i] !== undefined) {
                        groupsHtml += `<p class="text-sm text-gray-600 ml-3">Group ${i}: ${escapeHtml(match[i])}</p>`;
                    }
                }
                if (match.groups) {
                    for (const [name, value] of Object.entries(match.groups)) {
                        if (value !== undefined) {
                            groupsHtml += `<p class="text-sm text-gray-600 ml-3">${name}: ${escapeHtml(value)}</p>`;
                        }
                    }
                }
                groupsHtml += '</div>';
            });
            captureGroups.innerHTML =
                groupsHtml ||
                '<p class="text-sm text-gray-500">No capture groups in this pattern</p>';
        }

        updateReplace();
        updateCodeGeneration();
    } catch (e) {
        patternStatus.textContent = `Invalid pattern: ${e.message}`;
        patternStatus.classList.remove('hidden');
        patternStatus.classList.add('text-red-600');
        matchesDisplay.innerHTML = escapeHtml(text);
        matchCount.textContent = '0';
    }
}

// Update replace result
function updateReplace() {
    if (!replaceToggle.checked) return;
    const pattern = patternInput.value;
    const text = testTextInput.value;
    const replacement = replaceInput.value;
    if (!pattern || !text) {
        replaceResult.innerHTML =
            '<span class="text-gray-400">Enter replacement string</span>';
        return;
    }
    try {
        const regex = new RegExp(pattern, getFlags());
        const result = text.replace(regex, replacement);
        replaceResult.textContent = result;
    } catch (e) {
        replaceResult.innerHTML =
            '<span class="text-red-500">Invalid pattern</span>';
    }
}

// Update code generation
function updateCodeGeneration() {
    const pattern = patternInput.value;
    const flags = getFlags();
    if (!pattern) {
        codeOutput.textContent = '// Enter a pattern to generate code';
        return;
    }
    const escapedPattern = pattern.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    if (currentCodeLang === 'js') {
        codeOutput.textContent = `const regex = /${pattern}/${flags};\nconst text = 'your text here';\n\n// Test if matches\nconst isMatch = regex.test(text);\n\n// Find all matches\nconst matches = text.match(regex);\n\n// Replace\nconst result = text.replace(regex, 'replacement');`;
    } else if (currentCodeLang === 'py') {
        codeOutput.textContent = `import re\n\npattern = r'${escapedPattern}'\ntext = 'your text here'\n\n# Find all matches\nmatches = re.findall(pattern, text${flagI.checked ? ', re.IGNORECASE' : ''}${flagM.checked ? ', re.MULTILINE' : ''})\n\n# Replace\nresult = re.sub(pattern, 'replacement', text)`;
    } else if (currentCodeLang === 'php') {
        codeOutput.textContent = `<?php\n$pattern = '/${escapedPattern}/${flags}';\n$text = 'your text here';\n\n// Test if matches\n$isMatch = preg_match($pattern, $text);\n\n// Find all matches\npreg_match_all($pattern, $text, $matches);\n\n// Replace\n$result = preg_replace($pattern, 'replacement', $text);`;
    }
}

// Update code tabs styling
function updateCodeTabs() {
    ['js', 'py', 'php'].forEach((lang) => {
        const btn = document.getElementById('code-' + lang);
        if (lang === currentCodeLang) {
            btn.classList.add('bg-primary-100', 'text-primary-700');
            btn.classList.remove('text-gray-600', 'hover:bg-gray-100');
        } else {
            btn.classList.remove('bg-primary-100', 'text-primary-700');
            btn.classList.add('text-gray-600', 'hover:bg-gray-100');
        }
    });
}

// Event listeners
replaceToggle.addEventListener('change', () => {
    replaceSection.classList.toggle('hidden', !replaceToggle.checked);
    updateReplace();
});

document.getElementById('code-js').addEventListener('click', () => {
    currentCodeLang = 'js';
    updateCodeTabs();
    updateCodeGeneration();
});
document.getElementById('code-py').addEventListener('click', () => {
    currentCodeLang = 'py';
    updateCodeTabs();
    updateCodeGeneration();
});
document.getElementById('code-php').addEventListener('click', () => {
    currentCodeLang = 'php';
    updateCodeTabs();
    updateCodeGeneration();
});

document.getElementById('copy-code').addEventListener('click', () => {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        const btn = document.getElementById('copy-code');
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy';
        }, 2000);
    });
});

patternInput.addEventListener('input', updateMatches);
testTextInput.addEventListener('input', updateMatches);
replaceInput.addEventListener('input', updateReplace);
[flagG, flagI, flagM, flagS, flagU].forEach((flag) =>
    flag.addEventListener('change', updateMatches),
);

// Initialize
updateMatches();

// i18n
let currentLocale = localStorage.getItem('locale') || 'en';
async function loadTranslations(locale) {
    try {
        await fetch(`locales/${locale}.json`);
        document.getElementById('current-lang').textContent =
            locale.toUpperCase();
    } catch (e) {}
}
window.setLanguage = function (locale) {
    currentLocale = locale;
    localStorage.setItem('locale', locale);
    loadTranslations(locale);
};
loadTranslations(currentLocale);
