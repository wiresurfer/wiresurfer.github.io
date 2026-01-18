/**
 * Table of Contents Scroll Spy - Task 3.2
 * Highlights the current section in the ToC as user scrolls
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
  } else {
    initScrollSpy();
  }

  function initScrollSpy() {
    // Find all ToC links - support multiple ToC implementations
    const tocLinks = document.querySelectorAll(
      '.md-nav--secondary .md-nav__link[href^="#"], ' +
      '.toc a[href^="#"], ' +
      'nav.toc a[href^="#"]'
    );

    if (tocLinks.length === 0) {
      return; // No ToC on this page
    }

    // Build a map of sections
    const sections = [];
    tocLinks.forEach(link => {
      const id = link.getAttribute('href').substring(1);
      const section = document.getElementById(id);
      if (section) {
        sections.push({
          id: id,
          element: section,
          link: link
        });
      }
    });

    if (sections.length === 0) {
      return; // No valid sections found
    }

    // Update active link based on scroll position
    function updateActiveLink() {
      const scrollPos = window.scrollY + 100; // Offset for better UX
      let currentSection = null;

      // Find the current section
      sections.forEach(section => {
        if (section.element.offsetTop <= scrollPos) {
          currentSection = section;
        }
      });

      // Remove all active classes
      tocLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('data-active');
      });

      // Add active class to current section
      if (currentSection) {
        currentSection.link.classList.add('active');
        currentSection.link.setAttribute('data-active', 'true');

        // Smooth scroll ToC into view if needed
        const tocContainer = currentSection.link.closest('.md-sidebar--secondary, .toc, nav.toc');
        if (tocContainer) {
          const linkRect = currentSection.link.getBoundingClientRect();
          const containerRect = tocContainer.getBoundingClientRect();

          // Check if link is out of view
          if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
            currentSection.link.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }
        }
      }
    }

    // Throttle scroll events for performance
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Listen to scroll events
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to set active link on page load
    updateActiveLink();

    // Re-check on navigation (for SPAs like Material for MkDocs)
    document.addEventListener('DOMContentLoaded', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    // Listen for instant navigation events (Material for MkDocs)
    document.addEventListener('instant.rendered', updateActiveLink);
  }
})();
