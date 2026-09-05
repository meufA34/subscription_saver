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



//////////////////////
// add button listener
//////////////////////
function initAddSubscription() {
  const addBtn = document.getElementById('add-subscription-btn');
  const subscriptionsList = document.getElementById('subscriptions-list');

  if (!addBtn || !subscriptionsList) return;

  // Add new subscription row on button click (only when the last row is full)
  addBtn.addEventListener('click', () => {
    // Check if the last existing row is filled before allowing a new one
    const existingRows = subscriptionsList.querySelectorAll('.subscription-item-row');
    if (existingRows.length > 0) {
      const lastRow = existingRows[existingRows.length - 1];
      const nameInput = lastRow.querySelector('.service-name-input');
      const costInput = lastRow.querySelector('.service-cost-input');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const costVal = costInput ? costInput.value.trim() : '';

      // If either service name or monthly cost is empty, do NOT add a new row
      if (!nameVal || !costVal) {
        if (!nameVal && nameInput) {
          nameInput.focus();
        } else if (!costVal && costInput) {
          costInput.focus();
        }
        return;
      }
    }

    const newRow = document.createElement('div');
    newRow.className = 'subscription-item-row';
    newRow.setAttribute('role', 'listitem');

    newRow.innerHTML = `
      <div class="form-group service-name-group">
        <label class="form-label">Service Name</label>
        <input 
          type="text" 
          name="serviceName[]" 
          class="form-input service-name-input" 
          placeholder="e.g. Netflix, Spotify, Gym"
        >
      </div>

      <div class="form-group service-cost-group">
        <label class="form-label">Monthly Cost</label>
        <div class="input-with-affix">
          <span class="input-prefix" aria-hidden="true">$</span>
          <input 
            type="number" 
            name="serviceCost[]" 
            class="form-input service-cost-input" 
            placeholder="0.00" 
            min="0" 
            step="0.01" 
            inputmode="decimal"
          >
        </div>
      </div>

      <button 
        type="button" 
        class="btn-icon-danger remove-sub-btn" 
        title="Remove subscription" 
        aria-label="Remove subscription"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    `;

    subscriptionsList.appendChild(newRow);

    // Auto-focus the newly added row's name input
    const firstInput = newRow.querySelector('.service-name-input');
    if (firstInput) firstInput.focus();
  });

  // Enable removing any subscription row when its trash icon is clicked
  subscriptionsList.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.remove-sub-btn');
    if (!removeBtn) return;

    const row = removeBtn.closest('.subscription-item-row');
    if (row) row.remove();
  });
}

// Ensure the listener initializes regardless of document loading state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAddSubscription);
} else {
  initAddSubscription();
}

