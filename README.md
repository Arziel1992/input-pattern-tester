# Input Pattern Tester

> Interactive regex pattern tester with real-time match highlighting, capture group visualization, and code generation.

## Project Identity

Input Pattern Tester is a browser-based, interactive tool for testing and understanding regular expressions. The application provides real-time feedback with match highlighting, capture group visualization, and generates code snippets for multiple languages.

### Architecture

```
input-pattern-tester/
├── index.html              # Main regex tester interface
├── assets/
│   ├── logo.svg            # Application logo
│   └── favicon.svg         # Browser favicon
├── locales/
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
└── package.json            # Project manifest
```

## Objectives

1. **Educational**: Make regex concepts accessible through hands-on experimentation
2. **Practical**: Test patterns against text and generate production-ready code
3. **Visual**: See matches highlighted in real-time with capture group breakdown

## Features

### Pattern Tester

- ✅ Real-time pattern testing with instant feedback
- ✅ Match highlighting in test text
- ✅ Pattern validity indicator
- ✅ Match count display

### Regex Flags

- ✅ Global (g) - Find all matches
- ✅ Case Insensitive (i)
- ✅ Multiline (m)
- ✅ DotAll (s)
- ✅ Unicode (u)

### Capture Groups

- ✅ Numbered capture group visualization
- ✅ Named capture group support
- ✅ Color-coded group display
- ✅ Multiple match support

### Replace Mode

- ✅ Toggle-able replacement mode
- ✅ Live replacement preview
- ✅ Supports backreferences ($1, $2, etc.)

### Code Generation

- ✅ JavaScript code snippets
- ✅ Python code snippets
- ✅ PHP code snippets
- ✅ One-click copy to clipboard

### Common Patterns

- ✅ Email validation
- ✅ Phone number
- ✅ URL
- ✅ IP Address
- ✅ Date (YYYY-MM-DD)
- ✅ Hex color code

### General

- 🌐 Internationalization (English, Spanish)
- 🎨 Flowbite design system with Tailwind CSS
- ♿ WCAG accessibility compliance
- 📱 Fully responsive design

## Usage

### Development Server

```bash
# Start development server
npx serve .
```

Navigate to `http://localhost:3000` in your browser.

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Version:** v2026-02-07-2308
