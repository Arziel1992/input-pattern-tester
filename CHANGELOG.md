# Changelog

All notable changes to Input Pattern Tester will be documented in this file.

## [v2026-02-07-2308] 2026-02-07 - 23:08

### Changed

- **BREAKING**: Replaced Tailwind CDN with production-ready CLI build
- Enhanced i18n system to dynamically apply translations to DOM elements
- Added data-i18n attributes to title and pattern labels for Spanish translation
- Consolidated all styles into src/input.css for centralized theming

### Added

- `npm run build` compiles Tailwind CSS to assets/css/main.css
- `npm run watch` for development with hot reload
- Added devDependencies: tailwindcss@^4.0.6, flowbite@^3.1.2, @tailwindcss/cli

## [v2026-02-07-2251] 2026-02-07 - 22:51

### Changed

- Consolidated flags tooltips into single info modal with all flags explained
- Added inline descriptions (global, case-insensitive, multiline, dotall, unicode) to each flag
- Unified navbar style to match CSS Layout Tester homepage
- Added scrollbar-gutter prevention for layout shift
- Updated footer with GitHub repository link and Swinburne attribution
- Updated i18n translations (en, es) with Swinburne attribution
- Extracted styles to assets/css/main.css for separation of concerns
- Extracted JavaScript to assets/js/main.js for separation of concerns

## [v2026-02-07-1930] 2026-02-07 - 19:30

### Added

- Complete UI/UX overhaul with Flowbite design system
- Brand identity with green (#028f00) color scheme
- Internationalization (i18n) support for English and Spanish
- Language toggle dropdown in navigation
- Enhanced Regex Tester features:
  - Multi-flavor regex support (JavaScript, Python, PCRE)
  - Real-time match highlighting in test text
  - Capture groups visualization panel
  - Regex flags toggles (g, i, m, s, u)
  - Match count badge
  - Replace/substitution mode
  - Multi-line test input
  - Code generation panel (JavaScript, Python, PHP)
- Pattern cheat sheet with common regex patterns
- Quick reference guide for regex syntax
- SEO meta tags and Open Graph support
- WCAG accessibility compliance

### Changed

- Migrated from vanilla CSS to Tailwind CSS + Flowbite
- Improved responsive design for mobile devices
- Enhanced visual feedback for valid/invalid patterns
