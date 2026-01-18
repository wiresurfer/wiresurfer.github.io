# Typography and Readability Improvements - TODO List

Based on the comprehensive audit of blog.shaishav.kr completed January 2026.

## Overview
This document contains actionable tasks to improve typography, readability, and accessibility of the blog. Tasks are organized by priority with dependencies handled sequentially.

---

## PRIORITY 1: CRITICAL READABILITY IMPROVEMENTS

### Task 1.1: Establish CSS Spacing System
**Issue**: Inconsistent spacing throughout the site causes visual rhythm disruption
**Change**: Create CSS custom properties for standardized spacing scale
**File**: `docs/assets/css/site.css` or `docs/assets/css/typography.css`
**Implementation**:
```css
:root {
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
}
```
**Completion Criteria**:
- [ ] Variables defined in root CSS file
- [ ] No console errors
- [ ] Variables accessible in browser dev tools

---

### Task 1.2: Increase Body Text Line-Height
**Issue**: Current line-height (1.5-1.6) causes reading fatigue in long-form content
**Change**: Increase to 1.7-1.8 for improved readability
**File**: `docs/assets/css/typography.css`
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:
```css
body {
  font-size: 17px;  /* Increase from ~16px */
  line-height: 1.75; /* Increase from ~1.5-1.6 */
  letter-spacing: 0.3px; /* Slight improvement for dark theme */
}

/* Ensure article content specifically uses improved line-height */
article p,
.post-content p {
  line-height: 1.75;
  margin-bottom: var(--spacing-md);
}
```
**Completion Criteria**:
- [ ] Body text line-height is 1.75
- [ ] Paragraph spacing uses spacing variable
- [ ] Text is more comfortable to read (visual check on long articles)
- [ ] No layout breaks on desktop or mobile

---

### Task 1.3: Enhance Inline Code Visual Distinction
**Issue**: Inline code relies only on color (green/cyan) making it hard to distinguish, especially for colorblind users
**Change**: Add background, border, and padding to inline code elements
**File**: `docs/assets/css/typography.css` or `docs/assets/css/article.css`
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:
```css
code {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  border: 1px solid rgba(95, 181, 132, 0.2);
  font-size: 0.95em;
  color: #5fb584;
}

/* Prevent double styling for code inside pre blocks */
pre code {
  background-color: transparent;
  border: none;
  padding: 0;
}
```
**Completion Criteria**:
- [ ] Inline code has visible background
- [ ] Border is subtle but visible
- [ ] Code inside code blocks not double-styled
- [ ] Contrast ratio meets WCAG AA (test with tool)
- [ ] Visual distinction clear without relying on color alone

---

### Task 1.4: Standardize Heading Spacing
**Issue**: Variable spacing before/after H2 and H3 headings disrupts visual flow
**Change**: Apply consistent spacing using heading hierarchy
**File**: `docs/assets/css/typography.css`
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:
```css
h1 {
  margin-bottom: 1.5em;
  line-height: 1.4;
}

h2 {
  margin-top: var(--spacing-xl);  /* 2em / 32px */
  margin-bottom: var(--spacing-lg); /* 1.5em / 24px */
  font-size: 1.75em;
  line-height: 1.4;
}

h3 {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
  font-size: 1.25em;
  line-height: 1.4;
}

/* Reduce top margin when heading follows heading */
h2 + h3 {
  margin-top: 0.8em;
}
```
**Completion Criteria**:
- [ ] H2 has consistent 2em top margin, 1em bottom margin
- [ ] H3 has consistent 1.2em top margin, 0.6em bottom margin
- [ ] Sequential headings have reduced spacing
- [ ] Visual breathing room improved on sample posts

---

### Task 1.5: Improve List Item Spacing and Readability
**Issue**: List items have tight spacing (0.2-0.3em) and compressed line-height
**Change**: Increase spacing and line-height to match body text
**File**: `docs/assets/css/list.css` or `docs/assets/css/typography.css`
**Dependencies**: Task 1.1 (spacing system), Task 1.2 (line-height)
**Implementation**:
```css
ul, ol {
  margin-bottom: var(--spacing-md);
  padding-left: 1.5em;
}

li {
  margin-bottom: var(--spacing-sm); /* 0.5em */
  line-height: 1.7; /* Match body text */
}

/* Reduce spacing for nested lists */
li ul, li ol {
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

/* Add spacing between list and following content */
ul + p, ol + p,
ul + h2, ol + h2,
ul + h3, ol + h3 {
  margin-top: var(--spacing-lg);
}
```
**Completion Criteria**:
- [ ] List items have 0.5em bottom margin
- [ ] Line-height matches body text (1.7)
- [ ] Nested lists have appropriate reduced spacing
- [ ] Lists don't feel cramped on test pages

---

### Task 1.6: Enhance Nested List Visual Hierarchy
**Issue**: Deep nesting (4+ levels) uses only indentation; bullets don't change style
**Change**: Use different bullet styles per nesting level
**File**: `docs/assets/css/list.css`
**Dependencies**: Task 1.5 (list spacing)
**Implementation**:
```css
/* Level 1: filled circle (default) */
ul {
  list-style-type: disc;
}

/* Level 2: hollow circle */
ul ul {
  list-style-type: circle;
  margin-left: 1.5em;
}

/* Level 3: square */
ul ul ul {
  list-style-type: square;
}

/* Level 4+: back to disc but with additional indent */
ul ul ul ul {
  list-style-type: disc;
}
```
**Completion Criteria**:
- [ ] Level 1 lists use filled bullets
- [ ] Level 2 lists use hollow circles
- [ ] Level 3 lists use squares
- [ ] Deep nesting (4+ levels) is visually distinguishable
- [ ] Test on posts with nested Table of Contents

---

## PRIORITY 2: VISUAL HIERARCHY IMPROVEMENTS

### Task 2.1: Enhance Code Block Visual Separation
**Issue**: Code blocks lack clear borders and shadow; separation from body text is subtle
**Change**: Add border, shadow, and ensure proper padding
**File**: `docs/assets/css/article.css` or `docs/assets/css/typography.css`
**Dependencies**: Task 1.1 (spacing system), Task 1.3 (inline code styling)
**Implementation**:
```css
pre {
  background-color: #252526;
  padding: 28px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow-x: auto;
  margin: var(--spacing-lg) 0; /* 24px top and bottom */
}

pre code {
  font-size: 14px;
  line-height: 1.6;
  color: #e0e0e0;
}
```
**Completion Criteria**:
- [ ] Code blocks have visible border
- [ ] Subtle shadow creates depth
- [ ] Padding is generous (28px)
- [ ] Consistent margins (24px) above and below
- [ ] Horizontal scroll works for long lines

---

### Task 2.2: Improve Blockquote Styling
**Issue**: Blockquotes adequate but could be more prominent; italic styling subtle
**Change**: Enhance background, border, and typography
**File**: `docs/assets/css/article.css` or `docs/assets/css/typography.css`
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:
```css
blockquote {
  background-color: rgba(255, 255, 255, 0.02);
  border-left: 4px solid #ff9800;
  padding: var(--spacing-md) var(--spacing-lg); /* 16px 24px */
  margin: var(--spacing-lg) 0;
  font-style: italic;
  color: #999;
}

blockquote p {
  margin: 0;
  line-height: 1.7;
}

blockquote p + p {
  margin-top: var(--spacing-sm);
}

/* Style attribution/citation */
blockquote cite,
blockquote footer {
  display: block;
  margin-top: var(--spacing-sm);
  font-style: normal;
  font-size: 0.9em;
  color: #777;
}

blockquote cite::before {
  content: "— ";
}
```
**Completion Criteria**:
- [ ] Blockquotes have subtle background
- [ ] Left border is 4px orange/coral
- [ ] Text is italic and slightly muted
- [ ] Citations styled distinctly
- [ ] Margins consistent with spacing system

---

### Task 2.3: Implement Complete Syntax Highlighting for Code Blocks
**Issue**: Current syntax highlighting is partial; keywords, strings, and variables need distinct colors
**Change**: Configure MkDocs to use full syntax highlighting
**File**: `mkdocs.yml`
**Dependencies**: Task 2.1 (code block styling)
**Implementation**:
```yaml
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences

theme:
  # ... existing config ...

extra_css:
  # ... existing files ...

# Configure Pygments theme for code highlighting
# Add to custom CSS or use built-in theme
```

**Additional CSS** (if needed in `docs/assets/css/article.css`):
```css
/* Syntax highlighting color scheme for dark theme */
.highlight .k  { color: #ff9800; } /* Keywords - orange */
.highlight .s  { color: #5fb584; } /* Strings - green */
.highlight .n  { color: #4dd0e1; } /* Variables - cyan */
.highlight .m  { color: #ffd700; } /* Numbers - yellow */
.highlight .c  { color: #666; font-style: italic; } /* Comments - gray */
.highlight .o  { color: #999; } /* Operators */
.highlight .p  { color: #ccc; } /* Punctuation */
```

**Completion Criteria**:
- [ ] PyMdown Extensions installed (`pip install pymdownx`)
- [ ] MkDocs config includes syntax highlighting extensions
- [ ] Keywords appear in orange
- [ ] Strings appear in green
- [ ] Variables/identifiers appear in cyan
- [ ] Numbers appear in yellow
- [ ] Comments appear gray and italic
- [ ] Test with sample code blocks in multiple languages

---

### Task 2.4: Add Line Numbers to Long Code Blocks (Optional)
**Issue**: Long code blocks lack line numbers for reference
**Change**: Enable line numbers via MkDocs configuration
**File**: `mkdocs.yml`
**Dependencies**: Task 2.3 (syntax highlighting)
**Implementation**:

Update markdown extension config:
```yaml
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
      linenums: true  # Enable line numbers by default
  - pymdownx.superfences
```

For selective line numbers in markdown:
```markdown
```python linenums="1"
def example():
    pass
```
```

**CSS for line numbers** (`docs/assets/css/article.css`):
```css
.highlight .linenos {
  user-select: none;
  color: #666;
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,0.1);
  margin-right: 12px;
}
```

**Completion Criteria**:
- [ ] Line numbers appear on code blocks with linenums directive
- [ ] Numbers are non-selectable (user-select: none)
- [ ] Numbers visually separated from code
- [ ] Works on test pages with long code samples

---

## PRIORITY 3: NAVIGATION AND INTERACTION IMPROVEMENTS

### Task 3.1: Improve Pagination Contrast and Accessibility
**Issue**: Inactive pagination links have low contrast (~3:1); active state relies only on background color
**Change**: Increase contrast, add clear visual indicators, improve accessibility
**File**: `docs/assets/css/site.css` or create pagination-specific CSS
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:
```css
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: var(--spacing-2xl) 0; /* 48px top and bottom */
}

.pagination a,
.pagination span,
.pagination .current {
  padding: 10px 14px;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s ease;
  min-width: 44px; /* Touch target size */
  text-align: center;
}

/* Active/current page */
.pagination .current {
  background-color: #ff9800;
  color: #1a1a1a;
  font-weight: bold;
  cursor: default;
}

/* Inactive page links */
.pagination a {
  color: #999; /* Increased from #888 for better contrast */
  border: 1px solid #333;
  text-decoration: none;
}

.pagination a:hover {
  background-color: rgba(255, 152, 0, 0.1);
  color: #fff;
  border-color: #ff9800;
}

.pagination a:focus {
  outline: 2px solid #ff9800;
  outline-offset: 2px;
}

/* Disabled/ellipsis */
.pagination .disabled {
  color: #555;
  cursor: not-allowed;
}
```

**HTML Requirements** (update MkDocs template if needed):
```html
<nav class="pagination" role="navigation" aria-label="Pagination">
  <a href="?page=1" aria-label="Go to page 1">1</a>
  <span class="current" aria-current="page" aria-label="Current page, page 2">2</span>
  <a href="?page=3" aria-label="Go to page 3">3</a>
</nav>
```

**Completion Criteria**:
- [ ] Inactive links have minimum 4.5:1 contrast ratio (test with tool)
- [ ] Current page uses color + bold + aria-current
- [ ] Hover state clearly visible
- [ ] Focus outline visible for keyboard navigation
- [ ] Touch targets minimum 44px for mobile
- [ ] ARIA labels present
- [ ] Test with keyboard navigation (Tab key)

---

### Task 3.2: Enhance Table of Contents with Active Section Indicator
**Issue**: No visual indicator for current section when scrolling
**Change**: Add JavaScript-based scroll spy to highlight current section
**File**: Create `docs/assets/js/toc.js` and update CSS
**Dependencies**: None (standalone feature)
**Implementation**:

**CSS** (`docs/assets/css/article.css`):
```css
/* Table of Contents base styles */
.toc {
  position: sticky;
  top: 20px;
}

.toc a {
  color: #4dd0e1;
  text-decoration: none;
  transition: all 0.2s ease;
  display: block;
  padding: 4px 0;
}

.toc a:hover {
  color: #fff;
  text-decoration: underline;
}

/* Active section indicator */
.toc a.active {
  color: #ff9800;
  font-weight: bold;
  border-left: 2px solid #ff9800;
  padding-left: 8px;
  margin-left: -8px;
}
```

**JavaScript** (`docs/assets/js/toc.js`):
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  const sections = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  }).filter(section => section !== null);

  function updateActiveLink() {
    let currentSection = null;
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section;
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (currentSection && link.getAttribute('href') === '#' + currentSection.id) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Initial call
});
```

**MkDocs Config** (`mkdocs.yml`):
```yaml
extra_javascript:
  - assets/js/toc.js
```

**Completion Criteria**:
- [ ] JavaScript file created and linked
- [ ] Active section highlighted in orange
- [ ] Highlighting updates smoothly on scroll
- [ ] Works with nested TOC items
- [ ] No console errors
- [ ] Test on posts with 10+ sections

---

## PRIORITY 4: BLOG CARDS AND IMAGES

### Task 4.1: Standardize Featured Image Aspect Ratio
**Issue**: Varying aspect ratios cause inconsistent card heights; some images cropped unexpectedly
**Change**: Enforce 16:9 aspect ratio with proper object-fit
**File**: `docs/assets/css/site.css` or blog card CSS
**Dependencies**: None
**Implementation**:
```css
.blog-card-image,
.featured-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center top; /* Prioritize top of image */
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin-bottom: var(--spacing-md);
}

/* Fallback for browsers without aspect-ratio support */
@supports not (aspect-ratio: 16 / 9) {
  .blog-card-image,
  .featured-image {
    padding-bottom: 56.25%; /* 16:9 ratio */
    height: 0;
    position: relative;
  }

  .blog-card-image img,
  .featured-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

**Completion Criteria**:
- [ ] All featured images display at 16:9 ratio
- [ ] No distortion or stretching
- [ ] Important content not cropped (visual check)
- [ ] Consistent card heights in grid
- [ ] Works in Safari, Chrome, Firefox

---

### Task 4.2: Improve Blog Card Metadata Layout and Spacing
**Issue**: Metadata (date, category, read time) is tightly packed and creates visual clutter
**Change**: Reorganize metadata into single line with better spacing
**File**: `docs/assets/css/site.css` or blog card CSS
**Dependencies**: Task 1.1 (spacing system), Task 4.1 (image ratio)
**Implementation**:
```css
.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blog-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--spacing-sm);
  font-size: 13px;
  color: #888;
  flex-wrap: wrap;
}

.blog-card-date {
  font-weight: 500;
  color: #999;
}

.blog-card-separator {
  color: #555;
}

.blog-card-read-time {
  color: #888;
}

.blog-card-category {
  background-color: rgba(255, 107, 53, 0.15);
  color: #ff6b35;
  padding: 2px 8px;
  border-radius: 2px;
  font-weight: 600;
  font-size: 12px;
  margin-left: auto; /* Push to right */
}

.blog-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  color: #fff;
}

.blog-card-excerpt {
  font-size: 14px;
  line-height: 1.6;
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: auto; /* Push to bottom of card */
}
```

**HTML Structure** (update MkDocs template):
```html
<div class="blog-card">
  <img class="blog-card-image" src="..." alt="...">
  <div class="blog-card-meta">
    <span class="blog-card-date">September 11, 2024</span>
    <span class="blog-card-separator">•</span>
    <span class="blog-card-read-time">9 min read</span>
    <span class="blog-card-category">Engineering</span>
  </div>
  <h3 class="blog-card-title">Post Title</h3>
  <p class="blog-card-excerpt">Post excerpt...</p>
</div>
```

**Completion Criteria**:
- [ ] Metadata in single line: "Date • Read time [Category]"
- [ ] Category badge on right side
- [ ] Increased font size (13px minimum)
- [ ] Better color contrast (test with tool)
- [ ] Spacing between image and metadata: 16px
- [ ] Spacing between metadata and title: 12px

---

### Task 4.3: Optimize Blog Card Grid Layout
**Issue**: Grid gap may be tight; card consistency needs verification
**Change**: Ensure proper grid gap and responsive behavior
**File**: `docs/assets/css/site.css` or `docs/assets/css/responsive.css`
**Dependencies**: Task 4.1 (images), Task 4.2 (metadata)
**Implementation**:
```css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin: var(--spacing-xl) 0;
}

/* Tablet */
@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

**Completion Criteria**:
- [ ] Grid gap is 28px on desktop
- [ ] 3 columns on desktop (>1024px)
- [ ] 2 columns on tablet (640px-1024px)
- [ ] 1 column on mobile (<640px)
- [ ] Cards align properly at all breakpoints

---

### Task 4.4: Standardize Image and Content Spacing
**Issue**: Inconsistent spacing between images, diagrams, and surrounding text
**Change**: Create uniform spacing rules for all embedded content
**File**: `docs/assets/css/article.css`
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:
```css
/* Article images and figures */
article img,
.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: var(--spacing-lg) 0; /* 24px top and bottom */
}

article figure,
.post-content figure {
  margin: var(--spacing-lg) 0;
}

/* Image captions */
article figcaption,
.post-content figcaption {
  font-size: 13px;
  color: #888;
  font-style: italic;
  text-align: center;
  margin-top: var(--spacing-sm);
  line-height: 1.5;
}

/* Add subtle shadow to images */
article img:not(.no-shadow),
.post-content img:not(.no-shadow) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Diagrams and illustrations with white backgrounds */
article img[src*="diagram"],
article img[src*="illustration"] {
  background-color: #fff;
  padding: 16px;
}

/* Spacing between content blocks */
article > * + *,
.post-content > * + * {
  margin-top: 0; /* Reset */
}

article > p + p,
.post-content > p + p {
  margin-top: var(--spacing-md);
}

article > h2 + *,
article > h3 + *,
.post-content > h2 + *,
.post-content > h3 + * {
  margin-top: var(--spacing-md);
}
```

**Completion Criteria**:
- [ ] All images have 24px top and bottom margin
- [ ] Captions are 13px, gray, italic
- [ ] Images have subtle shadow
- [ ] White-background diagrams have padding
- [ ] Spacing is consistent across multiple posts
- [ ] No layout breaks with images of varying sizes

---

## PRIORITY 5: ACCESSIBILITY IMPROVEMENTS

### Task 5.1: Improve Color Contrast for WCAG AA Compliance
**Issue**: Some elements (inline code, pagination) have contrast below 4.5:1
**Change**: Adjust colors to meet WCAG AA standards (4.5:1 minimum)
**File**: `docs/assets/css/typography.css` and related files
**Dependencies**: Task 1.3 (inline code), Task 3.1 (pagination)
**Implementation**:

Test current contrast and adjust:
```css
/* Already addressed in previous tasks, verify: */

/* Inline code - ensure 4.5:1 contrast */
code {
  color: #5fb584; /* Test: should be ~5:1 on #1a1a1a */
}

/* Pagination - already improved in Task 3.1 */
.pagination a {
  color: #999; /* Test: should be ~4.5:1+ */
}

/* Body text - should already be good */
body {
  color: #b0b0b0; /* Test: should be 7:1+ */
}

/* Table of Contents links */
.toc a {
  color: #4dd0e1; /* Test: should be ~5:1 */
}

/* Category badges */
.blog-card-category {
  color: #ff6b35; /* Test on background: should be ~6:1 */
}
```

**Testing**:
Use WebAIM Contrast Checker or browser tools:
- https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Inspect > Color picker shows contrast ratio

**Completion Criteria**:
- [ ] All text meets WCAG AA minimum (4.5:1 for normal text, 3:1 for large)
- [ ] Test with contrast checker tool
- [ ] Document contrast ratios in CSS comments
- [ ] No text relies solely on color for meaning

---

### Task 5.2: Add Focus Indicators for Keyboard Navigation
**Issue**: Focus outlines not visible; keyboard navigation difficult
**Change**: Add clear, high-contrast focus indicators to all interactive elements
**File**: `docs/assets/css/site.css`
**Dependencies**: Task 3.1 (pagination focus already added)
**Implementation**:
```css
/* Global focus styles */
*:focus {
  outline: 2px solid #ff9800;
  outline-offset: 2px;
}

/* Remove default outline and use custom */
*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #ff9800;
  outline-offset: 2px;
}

/* Specific interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #ff9800;
  outline-offset: 2px;
}

/* Card links */
.blog-card a:focus-visible {
  outline: 2px solid #ff9800;
  outline-offset: 4px;
  border-radius: 4px;
}

/* Table of Contents links */
.toc a:focus-visible {
  outline: 2px solid #ff9800;
  outline-offset: 2px;
  background-color: rgba(255, 152, 0, 0.1);
}

/* Code copy buttons */
.copy-button:focus-visible {
  outline: 2px solid #ff9800;
  outline-offset: 2px;
}
```

**Completion Criteria**:
- [ ] All links show orange outline on focus
- [ ] Tab key navigation clearly visible
- [ ] Focus indicators don't break layout
- [ ] Test with keyboard only (no mouse)
- [ ] Skip link functional (if exists)
- [ ] Focus order logical

---

### Task 5.3: Add Skip Link for Keyboard Navigation
**Issue**: Keyboard users must tab through navigation to reach main content
**Change**: Add skip-to-content link at top of page
**File**: Create/update base template and `docs/assets/css/site.css`
**Dependencies**: Task 5.2 (focus indicators)
**Implementation**:

**HTML** (add to base template at top of `<body>`):
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**CSS** (`docs/assets/css/site.css`):
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #ff9800;
  color: #1a1a1a;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  z-index: 9999;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid #fff;
  outline-offset: 2px;
}
```

**HTML** (add id to main content area):
```html
<main id="main-content">
  <!-- existing content -->
</main>
```

**Completion Criteria**:
- [ ] Skip link hidden by default
- [ ] Skip link visible on keyboard focus (Tab key)
- [ ] Clicking skip link jumps to main content
- [ ] Focus moves to main content area
- [ ] Test with screen reader (optional but recommended)

---

### Task 5.4: Add ARIA Labels to Pagination and Navigation
**Issue**: Navigation lacks proper ARIA labels for screen readers
**Change**: Add descriptive labels to improve accessibility
**File**: Update MkDocs templates (pagination, TOC, navigation)
**Dependencies**: Task 3.1 (pagination)
**Implementation**:

**Pagination** (already included in Task 3.1):
```html
<nav class="pagination" role="navigation" aria-label="Pagination">
  <a href="?page=1" aria-label="Go to page 1">1</a>
  <span class="current" aria-current="page" aria-label="Current page, page 2">2</span>
  <a href="?page=3" aria-label="Go to page 3">3</a>
</nav>
```

**Table of Contents**:
```html
<nav class="toc" role="navigation" aria-label="Table of contents">
  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#section-1">Section 1</a></li>
    <!-- ... -->
  </ul>
</nav>
```

**Main Navigation**:
```html
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-label="Home page">Home</a></li>
    <!-- ... -->
  </ul>
</nav>
```

**Breadcrumbs** (if exists):
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>
```

**Completion Criteria**:
- [ ] All navigation has aria-label
- [ ] Current page/section uses aria-current
- [ ] Links have descriptive aria-label where needed
- [ ] role="navigation" on nav elements
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)

---

## PRIORITY 6: RESPONSIVE DESIGN IMPROVEMENTS

### Task 6.1: Optimize Typography for Mobile Devices
**Issue**: Font sizes may be too small on mobile; touch targets undersized
**Change**: Adjust font sizes and spacing for mobile viewports
**File**: `docs/assets/css/responsive.css`
**Dependencies**: Task 1.2 (base typography), Task 1.1 (spacing)
**Implementation**:
```css
/* Mobile: 320px - 640px */
@media (max-width: 640px) {
  body {
    font-size: 16px; /* Maintain readability on small screens */
    line-height: 1.7;
  }

  h1 {
    font-size: 2em; /* Reduce from 2.5-3em */
    line-height: 1.3;
  }

  h2 {
    font-size: 1.5em; /* Reduce from 1.75em */
    margin-top: var(--spacing-lg);
  }

  h3 {
    font-size: 1.2em;
    margin-top: var(--spacing-md);
  }

  /* Code blocks */
  pre {
    padding: 16px; /* Reduce from 28px */
    font-size: 13px; /* Reduce from 14px */
    border-radius: 4px;
    overflow-x: auto;
  }

  /* Ensure minimum touch target size */
  a, button {
    min-height: 44px;
    min-width: 44px;
  }

  /* Blog cards */
  .blog-card-title {
    font-size: 16px;
  }

  .blog-card-meta {
    font-size: 12px;
  }
}

/* Tablet: 641px - 1024px */
@media (min-width: 641px) and (max-width: 1024px) {
  body {
    font-size: 17px;
  }

  h1 {
    font-size: 2.2em;
  }

  h2 {
    font-size: 1.6em;
  }

  pre {
    padding: 24px;
  }
}
```

**Completion Criteria**:
- [ ] Text readable on 320px viewport
- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scroll except code blocks
- [ ] Test on actual mobile device or emulator
- [ ] Heading sizes scale appropriately

---

### Task 6.2: Stack Sidebar Content Below Main Content on Mobile
**Issue**: Left sidebar and right TOC may create cramped layout on mobile
**Change**: Stack sidebars below content on small screens
**File**: `docs/assets/css/responsive.css`
**Dependencies**: None
**Implementation**:
```css
/* Desktop: multi-column layout */
@media (min-width: 1025px) {
  .post-layout {
    display: grid;
    grid-template-columns: 200px 1fr 250px;
    gap: var(--spacing-xl);
  }

  .post-sidebar-left {
    order: 1;
  }

  .post-content {
    order: 2;
  }

  .post-sidebar-right {
    order: 3;
    position: sticky;
    top: 20px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
  }
}

/* Tablet and Mobile: stack layout */
@media (max-width: 1024px) {
  .post-layout {
    display: flex;
    flex-direction: column;
  }

  .post-content {
    order: 1;
    width: 100%;
  }

  .post-sidebar-right {
    order: 2;
    position: static;
    width: 100%;
    margin-top: var(--spacing-lg);
    border-top: 1px solid #333;
    padding-top: var(--spacing-md);
  }

  .post-sidebar-left {
    order: 3;
    width: 100%;
    margin-top: var(--spacing-md);
  }
}
```

**Completion Criteria**:
- [ ] Main content appears first on mobile
- [ ] TOC appears below content on mobile/tablet
- [ ] Metadata sidebar at bottom on mobile
- [ ] No horizontal overflow
- [ ] Test on multiple screen sizes

---

### Task 6.3: Ensure Code Block Horizontal Scrolling on Mobile
**Issue**: Long code lines may wrap or break layout on mobile
**Change**: Ensure proper overflow handling
**File**: `docs/assets/css/responsive.css` or `docs/assets/css/article.css`
**Dependencies**: Task 2.1 (code blocks), Task 6.1 (mobile typography)
**Implementation**:
```css
/* Base code block scrolling */
pre {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  max-width: 100%;
}

pre code {
  white-space: pre; /* Prevent wrapping */
  word-wrap: normal;
  word-break: normal;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  pre {
    margin-left: calc(-1 * var(--spacing-md)); /* Extend to edges */
    margin-right: calc(-1 * var(--spacing-md));
    border-radius: 0;
    padding: var(--spacing-md);
  }
}

/* Scrollbar styling for code blocks */
pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

**Completion Criteria**:
- [ ] Long code lines scroll horizontally
- [ ] No line wrapping in code blocks
- [ ] Scrollbar visible and usable
- [ ] Touch scrolling works on mobile
- [ ] Test with sample code containing 100+ character lines

---

## TESTING AND VALIDATION

### Task 7.1: Cross-Browser Testing
**Issue**: Need to verify changes work across browsers
**Change**: Test all improvements in major browsers
**Dependencies**: All previous tasks should be complete
**Testing Checklist**:
- [ ] **Chrome/Chromium** (latest)
  - [ ] Typography rendering correct
  - [ ] Spacing consistent
  - [ ] Code blocks styled properly
  - [ ] Pagination functional
  - [ ] Focus indicators visible

- [ ] **Firefox** (latest)
  - [ ] All above tests
  - [ ] CSS variables working
  - [ ] Grid layout correct

- [ ] **Safari** (latest)
  - [ ] All above tests
  - [ ] aspect-ratio support or fallback
  - [ ] Sticky positioning works

- [ ] **Edge** (latest)
  - [ ] All above tests

- [ ] **Mobile Safari** (iOS)
  - [ ] Touch targets adequate
  - [ ] Font sizes readable
  - [ ] Scroll behavior smooth

- [ ] **Chrome Mobile** (Android)
  - [ ] All mobile tests

**Completion Criteria**:
- [ ] No layout breaks in any browser
- [ ] Visual consistency across browsers
- [ ] Fallbacks working where needed
- [ ] Document any browser-specific issues

---

### Task 7.2: Accessibility Testing with Tools
**Issue**: Need to validate WCAG compliance
**Change**: Run automated and manual accessibility tests
**Dependencies**: All Priority 5 tasks complete
**Testing Tools**:
1. **WAVE (Web Accessibility Evaluation Tool)**
   - https://wave.webaim.org/
   - [ ] No contrast errors
   - [ ] No missing alt text
   - [ ] Proper heading structure

2. **axe DevTools** (browser extension)
   - [ ] Run automated scan
   - [ ] Fix all critical issues
   - [ ] Review moderate issues

3. **Lighthouse** (Chrome DevTools)
   - [ ] Accessibility score 90+
   - [ ] No critical issues

4. **Keyboard Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Skip link works
   - [ ] Focus always visible
   - [ ] No keyboard traps

5. **Screen Reader** (manual test)
   - [ ] NVDA (Windows) or VoiceOver (Mac)
   - [ ] Navigation makes sense
   - [ ] All content accessible
   - [ ] Links descriptive

**Completion Criteria**:
- [ ] WAVE shows no errors (warnings acceptable)
- [ ] axe DevTools passes all critical checks
- [ ] Lighthouse accessibility score 95+
- [ ] Successful keyboard navigation
- [ ] Screen reader test completed

---

### Task 7.3: Performance Testing
**Issue**: Additional CSS/JS may impact page load
**Change**: Verify performance remains acceptable
**Dependencies**: All tasks complete
**Testing**:

1. **Lighthouse Performance Audit**
   - [ ] Run in incognito mode
   - [ ] Performance score 85+
   - [ ] First Contentful Paint < 1.8s
   - [ ] Time to Interactive < 3.8s

2. **CSS Size Check**
   ```bash
   # Check total CSS size
   ls -lh docs/assets/css/*.css
   ```
   - [ ] Total CSS < 100KB (uncompressed)
   - [ ] No duplicate rules

3. **JavaScript Impact**
   - [ ] TOC script < 2KB
   - [ ] No console errors
   - [ ] No layout shifts

4. **Image Optimization**
   - [ ] Featured images compressed
   - [ ] Appropriate format (WebP where possible)
   - [ ] Lazy loading enabled (if not already)

**Completion Criteria**:
- [ ] Lighthouse performance score acceptable
- [ ] No significant regression from baseline
- [ ] Page load time reasonable on 3G
- [ ] No cumulative layout shift issues

---

## DOCUMENTATION

### Task 8.1: Document CSS Custom Properties and Design System
**Issue**: Future maintainers need to understand the spacing system
**Change**: Create documentation in CSS comments or separate file
**File**: `docs/assets/css/README.md` (new file)
**Dependencies**: Task 1.1 (spacing system)
**Implementation**:

Create `docs/assets/css/README.md`:
```markdown
# CSS Architecture Documentation

## Design System

### Spacing Scale
Custom properties defined in `site.css`:
- `--spacing-xs: 0.25rem` (4px) - Minimal spacing, inner padding
- `--spacing-sm: 0.5rem` (8px) - Small gaps, list items
- `--spacing-md: 1rem` (16px) - Default spacing, paragraph margins
- `--spacing-lg: 1.5rem` (24px) - Section spacing, image margins
- `--spacing-xl: 2rem` (32px) - Large section breaks, heading top margin
- `--spacing-2xl: 3rem` (48px) - Major section divisions

### Color Palette
- Background: `#1a1a1a`
- Body text: `#b0b0b0` (7:1 contrast ratio)
- Headings: `#e0e0e0`
- Accent (orange): `#ff9800`
- Inline code (green): `#5fb584`
- Links (cyan): `#4dd0e1`
- Category badge: `#ff6b35`

### Typography
- Body: 17px / line-height 1.75
- H1: 2.5-3em, italic, bold
- H2: 1.75em, bold, orange left border
- H3: 1.25em, bold
- Code: 14px monospace

### File Organization
- `site.css` - Global styles, spacing system, layout
- `typography.css` - Text, headings, paragraphs
- `article.css` - Blog post content, code blocks, blockquotes
- `list.css` - List styling, nested lists
- `responsive.css` - Media queries, mobile adjustments
- `override.css` - Theme overrides, custom tweaks

## Usage Guidelines

### Spacing
Always use spacing variables instead of hardcoded values:
```css
/* Good */
margin-bottom: var(--spacing-lg);

/* Avoid */
margin-bottom: 24px;
```

### Responsive Design
Mobile-first approach:
- Base styles for mobile
- Tablet: 641px - 1024px
- Desktop: 1025px+

### Accessibility
- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Touch targets: 44x44px minimum
- Focus indicators: 2px solid #ff9800
```

**Completion Criteria**:
- [ ] README.md created with design system documentation
- [ ] Color palette documented
- [ ] Spacing scale explained
- [ ] File organization clear
- [ ] Usage guidelines included

---

### Task 8.2: Create Change Log
**Issue**: Track what was changed and why
**Change**: Document all implemented changes
**File**: `CHANGELOG.md` (new file in project root)
**Dependencies**: All tasks complete
**Implementation**:

Create `CHANGELOG.md`:
```markdown
# Changelog - Typography and Readability Improvements

## 2026-01-18 - Major Typography Update

Based on comprehensive usability audit of blog.shaishav.kr.

### Added
- CSS custom properties for standardized spacing scale
- Syntax highlighting for code blocks (Pygments)
- Active section indicator in Table of Contents
- Skip-to-content link for keyboard navigation
- ARIA labels for navigation and pagination
- Focus indicators for keyboard accessibility

### Changed
- Increased body text line-height from 1.5 to 1.75
- Enhanced inline code with background, border, padding
- Standardized heading spacing (H2: 2em top, 1em bottom)
- Improved list item spacing (0.5em between items)
- Blog card metadata layout reorganized
- Pagination contrast improved (WCAG AA compliant)
- Code block styling with border and shadow
- Blockquote prominence increased
- Featured images standardized to 16:9 aspect ratio

### Fixed
- Inconsistent spacing between content elements
- Low contrast on pagination and inline code
- Missing visual hierarchy in nested lists
- Unclear code block boundaries
- Mobile typography and touch target sizes
- Keyboard navigation focus visibility

### Improved
- Overall readability for long-form content
- Accessibility (WCAG AA compliance)
- Visual hierarchy and consistency
- Mobile responsive behavior
- Cross-browser compatibility

## Testing Completed
- ✅ Cross-browser testing (Chrome, Firefox, Safari, Edge)
- ✅ Accessibility audit (WAVE, axe DevTools, Lighthouse)
- ✅ Keyboard navigation testing
- ✅ Mobile device testing
- ✅ Performance validation (Lighthouse 85+)

## Files Modified
- `docs/assets/css/site.css`
- `docs/assets/css/typography.css`
- `docs/assets/css/article.css`
- `docs/assets/css/list.css`
- `docs/assets/css/responsive.css`
- `docs/assets/js/toc.js` (new)
- `mkdocs.yml`

## Resources
- Audit Report: `typography-audit-2026-01.pdf`
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- CSS Documentation: `docs/assets/css/README.md`
```

**Completion Criteria**:
- [ ] CHANGELOG.md created
- [ ] All major changes documented
- [ ] Files modified listed
- [ ] Testing results included

---

## SUMMARY

**Total Tasks**: 32 organized into 8 priority groups

**Implementation Order**:
1. **Priority 1** (Tasks 1.1-1.6): Critical readability - spacing system, line-height, inline code, headings, lists
2. **Priority 2** (Tasks 2.1-2.4): Visual hierarchy - code blocks, blockquotes, syntax highlighting
3. **Priority 3** (Tasks 3.1-3.2): Navigation - pagination, Table of Contents
4. **Priority 4** (Tasks 4.1-4.4): Blog cards and images
5. **Priority 5** (Tasks 5.1-5.4): Accessibility - contrast, focus, skip link, ARIA
6. **Priority 6** (Tasks 6.1-6.3): Responsive design - mobile optimization
7. **Testing** (Tasks 7.1-7.3): Validation and quality assurance
8. **Documentation** (Tasks 8.1-8.2): Record changes and guidelines

**Estimated Effort**:
- Priority 1-2: 6-8 hours (core improvements)
- Priority 3-4: 4-6 hours (navigation and cards)
- Priority 5-6: 4-6 hours (accessibility and responsive)
- Testing: 3-4 hours
- Documentation: 1-2 hours
- **Total**: 18-26 hours

**Key Files to Modify**:
- `docs/assets/css/site.css` - Spacing system, pagination, grid
- `docs/assets/css/typography.css` - Body text, headings, inline code
- `docs/assets/css/article.css` - Code blocks, blockquotes, images
- `docs/assets/css/list.css` - List styling
- `docs/assets/css/responsive.css` - Mobile/tablet adjustments
- `docs/assets/js/toc.js` - Table of Contents scroll spy (new file)
- `mkdocs.yml` - Syntax highlighting configuration

**Quick Wins** (implement first for immediate impact):
1. Task 1.2 - Increase line-height to 1.75
2. Task 1.3 - Enhance inline code styling
3. Task 1.4 - Standardize heading spacing
4. Task 2.1 - Improve code block borders/shadows
5. Task 3.1 - Fix pagination contrast

---

## Notes for MkDocs Developers

### MkDocs-Specific Considerations

1. **Theme Detection**: Identify current theme in `mkdocs.yml`
   ```bash
   grep "theme:" mkdocs.yml
   ```

2. **Custom CSS Loading**: Ensure CSS files loaded in correct order
   ```yaml
   extra_css:
     - assets/css/site.css        # Load first (variables)
     - assets/css/typography.css   # Then typography
     - assets/css/article.css      # Then specific components
     - assets/css/responsive.css   # Last (overrides)
   ```

3. **Template Overrides**: Some HTML changes require template overrides
   - Location: `overrides/` directory (create if needed)
   - Override `main.html`, `base.html`, or specific components

4. **Syntax Highlighting**: Requires pymdownx extensions
   ```bash
   pip install pymdown-extensions
   ```

5. **Testing Locally**:
   ```bash
   mkdocs serve
   # Open http://127.0.0.1:8000
   ```

6. **Build and Deploy**:
   ```bash
   mkdocs build
   # Verify docs/site/ output
   ```

### Deployment Checklist
- [ ] All tasks completed
- [ ] Local testing passed
- [ ] Cross-browser testing done
- [ ] Accessibility verified
- [ ] Build successful (`mkdocs build`)
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Documentation updated
- [ ] Commit with descriptive message
- [ ] Deploy to production

---

**Last Updated**: 2026-01-18
**Based On**: Typography and Readability Audit Report (January 2026)
**Status**: Ready for implementation
