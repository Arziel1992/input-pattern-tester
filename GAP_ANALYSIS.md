# Gap Analysis & Modernisation Audit

## 1. CSS Grid & Flexbox Feature Gap
Comparison against CSS-Tricks "Gold Standard".

| Feature Category | Property / Value | Status in Repo | Action Required |
|------------------|------------------|----------------|-----------------|
| **Grid Container** | `grid-template-areas` | ❌ Missing | Implement in main layout refactor. |
| | `grid-template-rows` | ❌ Missing | Add where explicit row sizing helps. |
| | `place-content` | ❌ Missing | Implement to center/distribute grid layouts. |
| | `place-items` | ❌ Missing | Use for centering card content. |
| | `justify-items` | ❌ Missing | Evaluate usage for card internals. |
| | `grid-auto-flow` | ❌ Missing | Check if 'dense' packing is useful for cheat sheet. |
| **Grid Items** | `justify-self` | ❌ Missing | Use for individual item alignment overrides. |
| | `align-self` | ❌ Missing | Use for individual item alignment overrides. |
| **Flex Container** | `flex-flow` | ❌ Missing | Replace separate direction/wrap props where applicable. |
| | `align-content` | ❌ Missing | Use for multi-line flex containers. |
| **Flex Items** | `order` | ❌ Missing | Use cautiously (check a11y) for visual reordering. |
| | `align-self` | ❌ Missing | Use for individual flex item alignment. |
| **Sizing Keywords** | `min-content` | ❌ Missing | Implement for adaptive sizing. |
| | `max-content` | ❌ Missing | Implement for adaptive sizing. |
| | `fit-content` | ❌ Missing | Implement for adaptive sizing. |
| **Sizing Functions** | `minmax()` | ✅ Present | Keep and refine. |
| | `repeat()` | ✅ Present | Keep and refine. |

## 2. 2025 Modern CSS Standards Audit

| Standard | Current State | Requirement |
|----------|---------------|-------------|
| **Logical Properties** | ❌ Physical properties used (`margin-left`, `width`, `top`) | **Replace All**: `margin-inline`, `padding-block`, `inset`, `inline-size`. |
| **CSS Nesting** | ❌ Flat CSS structure | **Refactor**: Use native `&` nesting for readability and component isolation. |
| **Container Queries** | ❌ Media Queries only (`@media`) | **Implement**: Convert `.input-type-card` & `.cheat-sheet-card` to use `@container` for component-level responsiveness. |
| **CSS Variables** | ⚠️ Basic usage (`:root`) | **Expand**: Use for semantic theming and layout values. |
| **Color Functions** | ⚠️ Hex codes used | **Modernize**: Consider `oklch()` or `hsl()` for better gamut/manipulation. |

## 3. JavaScript & Architecture Audit

| Category | Current State | Requirement |
|----------|---------------|-------------|
| **Modules** | ❌ Monolithic `script.js` (Global scope) | **Convert**: ES Modules (`type="module"`), strict imports with `.js` extensions. |
| **File Structure** | ❌ Flat root structure | **Reorganize**: `assets/css/`, `assets/js/modules/`. |
| **Semantics** | ⚠️ `<div>` soup in some areas | **Refactor**: Ensure `<article>`, `<section>`, `<aside>` are used correctly. |
| **Accessibility** | ⚠️ Basic ARIA present | **Strict Audit**: WCAG 2.2 AA. Check contrast, focus indicators, and distinct touch targets. |
