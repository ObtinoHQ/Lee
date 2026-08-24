console.log('request-quote.js loaded successfully!');

// Use event delegation to catch clicks on any quote button, even if added dynamically
document.addEventListener('click', (e) => {
  const quoteOpenerBtn = e.target.closest('.request-quote-btn');
  
  if (quoteOpenerBtn) {
    console.log('Request a Quote button clicked!', quoteOpenerBtn);
    e.preventDefault();
    
    // Find the modal - it should be rendered at the bottom of the section
    const modal = document.getElementById('RequestQuoteModal') || document.querySelector('.quote-modal-overlay');
    if (!modal) {
      console.error('Request a Quote modal not found in the DOM.');
      return;
    }

    console.log('Modal found:', modal);

    // 1. Get Selected Variant Name
    let variantName = 'Default Title';
    const section = quoteOpenerBtn.closest('.shopify-section') || document;
    const variantSelect = section.querySelector('variant-selects select');
    const variantRadios = section.querySelectorAll('variant-radios input[type="radio"]:checked');
    const singleVariantInput = section.querySelector('[name="id"]');
    
    if (variantSelect) {
      variantName = variantSelect.options[variantSelect.selectedIndex].text;
    } else if (variantRadios.length > 0) {
      variantName = Array.from(variantRadios).map(radio => radio.value).join(' / ');
    } else if (singleVariantInput) {
      const titleEl = section.querySelector('.product__title h1');
      if (titleEl) variantName = titleEl.innerText;
    }
    
    // 2. Get Quantity
    const quantityInput = section.querySelector('quantity-input input, input[name="quantity"]');
    const quantity = quantityInput ? quantityInput.value : 1;
    
    // 3. Inject Values into Hidden Fields inside the modal
    const quoteVariantField = modal.querySelector('#QuoteProductVariant');
    const quoteQuantityField = modal.querySelector('#QuoteProductQuantity');
    
    if (quoteVariantField) quoteVariantField.value = variantName;
    if (quoteQuantityField) quoteQuantityField.value = quantity;
    
    // 4. Show Modal
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened successfully.');
  }

  // Event delegation for closing modal
  const closeBtn = e.target.closest('.quote-modal-close');
  const openModal = document.querySelector('.quote-modal-overlay.is-open');
  
  if (openModal) {
    // Close if close button clicked OR background overlay clicked
    if (closeBtn || e.target === openModal) {
      openModal.classList.remove('is-open');
      openModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      console.log('Modal closed.');
    }
  }
});

// Handle AJAX submission of the quote form
document.addEventListener('submit', async (e) => {
  // Ensure we are targeting the correct form securely without throwing errors
  const form = e.target;
  
  // Check if it's our quote form (by ID or by containing the specific submit button)
  const isQuoteForm = form && (form.id === 'RequestQuoteForm' || form.querySelector('.quote-form-submit'));
  
  if (isQuoteForm) {
    e.preventDefault();
    e.stopPropagation(); // Prevent other scripts from hijacking the submission
    
    const submitBtn = form.querySelector('button[type="submit"], .quote-form-submit');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
    
    if (submitBtn) {
      submitBtn.innerText = 'Submitting...';
      submitBtn.disabled = true;
    }

    try {
      // Fallback action if form.action is empty
      const actionUrl = form.action || '/contact';
      
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'text/html'
        }
      });
      
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      const successMessage = doc.querySelector('.form-success');
      const formErrors = doc.querySelector('.form-errors');
      
      if (successMessage || response.url.includes('contact_posted=true')) {
        // Replace form content with success message
        form.innerHTML = '<p class="form-success" style="text-align:center;background-color: #d4edda; color: #155724; padding: 20px; border-radius: 4px; margin-bottom: 0; font-size: 1.4rem; text-align: center;">Thanks for requesting a quote! <br> We\'ll get back to you soon.</p>';
        
        // Update URL to reflect the successful submission without reloading the page
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('contact_posted', 'true');
        window.history.replaceState({}, '', newUrl);
        
      } else if (formErrors) {
        // Show errors
        let errorContainer = form.querySelector('.form-errors');
        if (!errorContainer) {
           errorContainer = document.createElement('div');
           errorContainer.className = 'form-errors';
           errorContainer.style.cssText = 'color: red; margin-bottom: 20px;';
           form.prepend(errorContainer);
        }
        errorContainer.innerHTML = formErrors.innerHTML;
        if (submitBtn) {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
        }
      } else {
        // Fallback success
        form.innerHTML = '<p class="form-success" style="text-align: center; background-color: #d4edda; color: #155724; padding: 20px; border-radius: 4px; margin-bottom: 0; font-size: 1.4rem; text-align: center;">Thanks for requesting a quote! <br> We\'ll get back to you soon.</p>';
        
        // Update URL to reflect the successful submission without reloading the page
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('contact_posted', 'true');
        window.history.replaceState({}, '', newUrl);
      }
    } catch (error) {
      console.error('Error submitting quote form:', error);
      if (submitBtn) {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    }
  }
}, true); // Use capture phase to intercept before other scripts


