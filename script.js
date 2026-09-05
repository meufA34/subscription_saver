/**
 * Subscription Saver — script.js
 * 
 * SCOPE RESTRICTION:
 * This file strictly contains DOM logic to toggle the responsive Hamburger Menu.
 * Dynamic row addition and cost calculations are intentionally omitted at this stage
 * and ready for future modular extension.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});

/**
 * Initializes the mobile hamburger menu toggle behavior and accessibility attributes.
 */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!hamburgerBtn || !mobileNav) return;

  /**
   * Toggles the menu between open and closed states.
   * @param {boolean} [forceState] Optional boolean to force open (true) or closed (false)
   */
  const toggleMenu = (forceState) => {
    const isCurrentlyOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

    hamburgerBtn.setAttribute('aria-expanded', String(shouldOpen));
    hamburgerBtn.classList.toggle('is-active', shouldOpen);
    mobileNav.classList.toggle('is-open', shouldOpen);
  };

  // Toggle on hamburger button click
  hamburgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking on any navigation link inside the drawer
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInside = mobileNav.contains(event.target) || hamburgerBtn.contains(event.target);
    const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';

    if (!isClickInside && isOpen) {
      toggleMenu(false);
    }
  });

  // Close menu on pressing the Escape key for accessibility
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      hamburgerBtn.focus();
    }
  });
}
