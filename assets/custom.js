document.querySelectorAll('.lx-pro-faq-question').forEach(el => {
  el.addEventListener('click', () => {
    const parent = el.parentElement;
    const answer = parent.querySelector('.lx-pro-faq-answer');
    
    // 1. Toggle the class for arrow rotation/styling
    parent.classList.toggle('active');
    
    // 2. Animate the height
    if (parent.classList.contains('active')) {
      // EXPAND: Set max-height to the actual height of the content
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      // COLLAPSE: Remove inline style so CSS (max-height: 0) takes over
      answer.style.maxHeight = null;
    }
  });
});

function refreshedCartDrawer(){
  fetch('/?sections=cart-drawer,cart-icon-bubble')
  .then(res => res.json())
  .then(data => {
    const parsedHTML = new DOMParser().parseFromString(data['cart-drawer'], 'text/html');
    const drawerInner = parsedHTML.querySelector('.drawer__inner');
    const isEmpty = drawerInner?.classList.contains('is-empty');
    console.log('isEmpty: ',isEmpty);
    const parsedState = {
      sections: {
        'cart-drawer': data['cart-drawer'],
        'cart-icon-bubble': data['cart-icon-bubble']
      },
      id: null
    };
    const cartDrawer = document.querySelector('cart-drawer');
    if(!isEmpty){
      cartDrawer.classList.remove('is-empty');
    }
  });
}


// class LocalizationForm extends HTMLElement {
//   constructor() {
//     super();
//     this.form = this.querySelector('form');
//     this.countryInput = this.querySelector('input[name="country_code"]');
//     this.languageInput = this.querySelector('input[name="language_code"]');
//   }

//   connectedCallback() {
//     this.handleSelection();
//     this.closeDropdown();
//   }

//   handleSelection() {
//     const links = this.querySelectorAll('.ma-option');

//     links.forEach(link => {
//       link.addEventListener('click', e => {
//         e.preventDefault(); 
//         const countryCode = link.getAttribute('data-country-code');
//         const languageCode = link.getAttribute('data-language-code');

//         if (this.form && countryCode && languageCode) {
//           this.countryInput.value = countryCode;
//           this.languageInput.value = languageCode;
//           this.form.submit();
//         }
//       });
//     });
//   }

//   closeDropdown() {
//     const opener = this.querySelector('.MA-lang-opener');
//     if (!opener) return;
    
//     document.addEventListener('click', e => {
//       if (!this.contains(e.target)) {
//         opener.checked = false;
//       }
//     });
//   }
// }

// if (!customElements.get('localization-form')) {
//   customElements.define("localization-form", LocalizationForm);
// }

// class ProductVariant extends HTMLElement {
//   constructor() {
//     super();
//     this.handleClick = this.handleClick.bind(this);
//   }

//   connectedCallback() {
//     this.link = this.querySelector('a');
//     this.targetSelector = this.getAttribute('target-selector') || 'product-info';

//     if (this.link) {
//       this.link.addEventListener('click', this.handleClick);
//     }
//   }

//   disconnectedCallback() {
//     if (this.link) {
//       this.link.removeEventListener('click', this.handleClick);
//     }
//   }

//   handleClick(e) {
//     e.preventDefault();
//     const url = this.link.getAttribute('href');
//     const mainContainer = document.querySelector(this.targetSelector);

//     if (mainContainer) mainContainer.style.opacity = '0.5';

//     fetch(url)
//       .then(response => {
//         if (!response.ok) throw new Error('Network error');
//         return response.text();
//       })
//       .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const newContent = doc.querySelector(this.targetSelector);

//         if (newContent && mainContainer) {
//           // 1. Replace the Content (Destroys the old variants)
//           mainContainer.outerHTML = newContent.outerHTML;
          
//           // 2. Update Browser URL
//           window.history.pushState({ path: url }, '', url);
          
//           // 3. RE-SELECT the container (because mainContainer reference is now stale/dead)
//           const refreshedContainer = document.querySelector(this.targetSelector);
//           if (refreshedContainer) refreshedContainer.style.opacity = '1';

//           // 4. FIND THE NEW ACTIVE ELEMENT
//           // We cannot use 'this' because it was removed from the DOM.
//           // We search the document for the link that matches the URL we just loaded.
//           this.setNewActiveVariant(url);

//         } else {
//           console.error('Could not find target container in response');
//           window.location.href = url; 
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         window.location.href = url; 
//       });
//   }

//   setNewActiveVariant(url) {
//     const allVariants = document.querySelectorAll('product-variant');
//     allVariants.forEach(el => el.classList.remove('is-active'));
//     const newActiveLink = document.querySelector(`product-variant a[href="${url}"]`);

//     if (newActiveLink) {
//       // Find the parent <product-variant> of that link
//       const newVariantTag = newActiveLink.closest('product-variant');
//       if (newVariantTag) {
//         newVariantTag.classList.add('is-active');
//       }
//     }
//   }
// }

// if (!customElements.get('product-variant')) {
//   customElements.define('product-variant', ProductVariant);
// }


class CardProduct extends HTMLElement {
  constructor() {
    super();
    this.handleSwatchClick = this.handleSwatchClick.bind(this);
  }

  connectedCallback() {
    const swatches = this.querySelectorAll('.swatch-item');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', this.handleSwatchClick);
    });
  }

  handleSwatchClick(event) {
    const clickedSwatch = event.currentTarget;
    const handle = clickedSwatch.getAttribute('data-handle');
    if (!handle) return;
    this.querySelectorAll('.swatch-item').forEach(swatch => {
      swatch.classList.remove('swatch-item--active');
    });
    clickedSwatch.classList.add('swatch-item--active');
    this.updateTargets(handle);
  }

  updateTargets(activeHandle) {
    const targets = this.querySelectorAll('[data-handle]:not(.swatch-item)');

    targets.forEach(target => {
      if (target.getAttribute('data-handle') === activeHandle) {
        target.style.display = 'block'; 
      } else {
        target.style.display = 'none';
      }
    });
  }
}
customElements.define('card-product', CardProduct);




document.addEventListener("DOMContentLoaded", function() {
    // Select all details elements within the header menu
    const allDetails = document.querySelectorAll('details[id^="Details-HeaderMenu-"]');

    allDetails.forEach((details) => {
      const summary = details.querySelector('summary');

      // Open on hover
      details.addEventListener('mouseenter', () => {
        details.setAttribute('open', 'true');
        summary.setAttribute('aria-expanded', 'true');
      });

      // Close on mouse leave
      details.addEventListener('mouseleave', () => {
        details.removeAttribute('open');
        summary.setAttribute('aria-expanded', 'false');
      });
    });
  });



// Swiper template
class MaSlider extends HTMLElement {
  constructor() {
    super();
    this.observer = null;
    this.swiper = null;
  }

  connectedCallback() {
    this.init();
    this.observeChanges();
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
    if (this.swiper) this.swiper.destroy();
  }

  observeChanges() {
    this.observer = new MutationObserver((mutations) => {
      const swiperEl = this.querySelector('.js-swiper-template');
      if (swiperEl && !swiperEl.classList.contains('swiper-initialized')) {
        this.init();
      }
    });
    this.observer.observe(this, { childList: true, subtree: true });
  }

  init() {
    const swiperEl = this.querySelector('.js-swiper-template');
    if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

    if (typeof Swiper === 'undefined') {
        console.warn('Swiper JS not loaded');
        return;
    }

    const config = this.getConfig(swiperEl);
    if (!config) return;

    const params = {
      slidesPerView: config.mobileSlides,
      spaceBetween: config.mobileSpacing,
      loop: false,
      breakpoints: {
        768: {
          slidesPerView: config.tabletSlides,
          spaceBetween: config.desktopSpacing,
        },
        1024: {
          slidesPerView: config.desktopSlides,
          spaceBetween: config.desktopSpacing,
        }
      },
      navigation: {
        nextEl: this.querySelector('.swiper-custom-next'),
        prevEl: this.querySelector('.swiper-custom-prev')
      },
      on: {
        init: (swiper) => this.updateProgress(swiper),
        slideChange: (swiper) => this.updateProgress(swiper),
        progress: (swiper) => this.updateProgress(swiper)
      }
    };

    // --- NEW: Add Pagination Config ---
    const paginationEl = this.querySelector('.swiper-custom-pagination');
    if (paginationEl) {
        params.pagination = {
            el: paginationEl,
            clickable: true,
            type: 'bullets', // Change to 'fraction' if you want numbers
        };
    }

    // Scrollbar Config
    const scrollbarEl = this.querySelector('.swiper-custom-scrollbar');
    if (scrollbarEl) {
      params.scrollbar = {
        el: scrollbarEl,
        draggable: true,
        hide: false
      };
    }

    if (config.autoplay) {
      params.autoplay = {
        delay: config.autoplayInterval,
        disableOnInteraction: false
      };
    }

    this.swiper = new Swiper(swiperEl, params);
  }

  getConfig(el) {
    try {
      return JSON.parse(el.dataset.swiperConfig || '{}');
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  updateProgress(swiper) {
    const progressFill = this.querySelector('.swiper-progress-fill');
    if (!progressFill) return;
    
    const percentage = Math.max(0, Math.min(100, swiper.progress * 100));
    progressFill.style.width = `${percentage}%`;
  }
}

customElements.define('ma-slider', MaSlider);
// End Swiper template

 (function() {
    // --- Helper Functions ---

    function loadSliderImages(card) {
      if (!card || card.classList.contains('images-loaded')) return;
      
      const lazyImages = card.querySelectorAll('img.swiper-lazy-load[data-src]');
      lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.remove('swiper-lazy-load');
      });
      card.classList.add('images-loaded');
    }

    function slideToVariant(swatch) {
      const mediaId = swatch.getAttribute('data-media-id');
      const imageUrl = swatch.getAttribute('data-image');
      const cardWrapper = swatch.closest('.product-card-wrapper');
      
      if (!cardWrapper) return;

      // A. Ensure images are loaded
      const loadTrigger = cardWrapper.querySelector('.hover-load-trigger');
      loadSliderImages(loadTrigger);

      // B. Try to find the image in the slider (by ID)
      const sliderImages = cardWrapper.querySelectorAll('.WI_slider_item img[data-media-id]');
      let targetIndex = -1;

      if (mediaId) {
        sliderImages.forEach((img, index) => {
          if (img.getAttribute('data-media-id') === mediaId) {
            targetIndex = index + 1; // 1-based index
          }
        });
      }

      // C. Logic: Check Slider OR Fallback Swap
      if (targetIndex > 0) {
        // 1. Found in slider -> Check the radio button
        const radioInput = cardWrapper.querySelector(`.slide-input-${targetIndex}`);
        if (radioInput) radioInput.checked = true;
      } else if (imageUrl) {
        // 2. Not found (Hidden due to limit) -> Swap first image src and reset slider
        const firstImg = cardWrapper.querySelector('.WI_slider_item img.img-main');
        const firstRadio = cardWrapper.querySelector(`.slide-input-1`);
        
        if (firstImg && firstRadio) {
          firstImg.src = imageUrl;
          firstImg.srcset = imageUrl;
          firstRadio.checked = true;
        }
      }
    }

    // --- EVENT DELEGATION (Fixes Related Products) ---
    // We attach listeners to the Body, so they catch events from elements added later.

    // 1. Delegate Hover (Lazy Loading)
    document.body.addEventListener('mouseover', function(e) {
      const card = e.target.closest('.hover-load-trigger');
      if (card) {
        loadSliderImages(card);
      }
    }, { passive: true });

    document.body.addEventListener('touchstart', function(e) {
      const card = e.target.closest('.hover-load-trigger');
      if (card) {
        loadSliderImages(card);
      }
    }, { passive: true });

    // 2. Delegate Click (Swatch Switching)
    document.body.addEventListener('click', function(e) {
      const swatch = e.target.closest('.js-color-swatch');
      
      // If a swatch was clicked
      if (swatch) {
        e.preventDefault();
        
        // Toggle Active Class
        const siblings = swatch.parentElement.querySelectorAll('.js-color-swatch');
        siblings.forEach(el => el.classList.remove('active-swatch'));
        swatch.classList.add('active-swatch');
        
        // Run Logic
        slideToVariant(swatch);
      }
    });

  })();

  if (!customElements.get('custom-slider')) {
    
    class CustomSlider extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.initSlider();
      }

      initSlider() {
        const swiperEl = this.querySelector('swiper-container');
        if (!swiperEl || !swiperEl.dataset.swiperConfig) return;
        if (swiperEl.part && swiperEl.part.contains('initialized')) return;
        
        let config;
        try {
          config = JSON.parse(swiperEl.dataset.swiperConfig);
        } catch (e) {
          console.error('Invalid Swiper Config JSON', e);
          return;
        }

        const nextBtn = this.querySelector('.swiper-custom-next');
        const prevBtn = this.querySelector('.swiper-custom-prev');
        const paginationEl = this.querySelector('.swiper-custom-pagination');
        const scrollbarEl = this.querySelector('.swiper-custom-scrollbar');
        const progressFill = this.querySelector('.swiper-progress-fill');
        
        const params = {
          slidesPerView: config.mobileSlides,
          spaceBetween: config.mobileSpacing,
          loop: false,
          breakpoints: {
            768: {
              slidesPerView: config.tabletSlides,
              spaceBetween: config.desktopSpacing,
            },
            1024: {
              slidesPerView: config.desktopSlides,
              spaceBetween: config.desktopSpacing,
            }
          }
        };

        if (nextBtn && prevBtn) {
          params.navigation = {
            nextEl: nextBtn,
            prevEl: prevBtn
          };
        }

        if (paginationEl) {
          params.pagination = {
            el: paginationEl,
            clickable: true
          };
        }

        if (scrollbarEl) {
          params.scrollbar = {
            el: scrollbarEl,
            draggable: true,
            hide: false
          };
        }

        if (config.autoplay) {
          params.autoplay = {
            delay: config.autoplayInterval,
            disableOnInteraction: false
          };
        }

        Object.assign(swiperEl, params);

        swiperEl.initialize();
        if (progressFill) {
          swiperEl.addEventListener('swiperprogress', (e) => {
            const [swiper, progress] = e.detail;
            const percentage = Math.max(0, Math.min(100, progress * 100));
            progressFill.style.width = `${percentage}%`;
          });
          
          swiperEl.addEventListener('swiperslidechange', (e) => {
            const [swiper] = e.detail;
            const percentage = Math.max(0, Math.min(100, swiper.progress * 100));
            progressFill.style.width = `${percentage}%`;
          });
        }
      }
    }

    customElements.define('custom-slider', CustomSlider);
}

document.addEventListener('DOMContentLoaded', () => {
  const notifyButton = document.querySelector('#notify-me');
  const wrapper = document.querySelector('#notify-me-wrapper');

  if (notifyButton && wrapper) {
    notifyButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Initial state for the fade-in effect
      wrapper.style.display = 'block';
      wrapper.style.opacity = 0;
      wrapper.style.transition = 'opacity 0.6s ease';
      
      // Trigger the transition in the next animation frame
      requestAnimationFrame(() => {
        wrapper.style.opacity = 1;
      });
    });
  }
});