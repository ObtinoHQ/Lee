// MAIN PRODUCT SECTION ACCORDION'S
$(document).ready(function () {
  $(".product_faq_item.active .product_faq_item_answer").show();
  $(document).on("click", ".product_faq_item_question", function () {
    let parent = $(this).closest(".product_faq_item");
    let answer = parent.find(".product_faq_item_answer");

    if (parent.hasClass("active")) {
      parent.removeClass("active");
      answer.slideUp();
    } else {
      $(".product_faq_item").removeClass("active").find(".product_faq_item_answer").slideUp();
      parent.addClass("active");
      answer.slideDown();
    }
  });
});




// IMAGE WITH FAQ'S JS
$(document).ready(function () {
  // By default first answer open karo
  let firstItem = $(".lx-image-with-faq-item").first();
  firstItem.addClass("active");
  firstItem.find(".lx-image-with-faq-answer").show(); // ya .slideDown(0)
});
$(document).on("click", ".lx-image-with-faq-question", function () {
  let parent = $(this).closest(".lx-image-with-faq-item");
  let answer = parent.find(".lx-image-with-faq-answer");

  if (parent.hasClass("active")) {
    parent.removeClass("active");
    answer.slideUp();
  } else {
    $(".lx-image-with-faq-item").removeClass("active").find(".lx-image-with-faq-answer").slideUp();
    parent.addClass("active");
    answer.slideDown();
  }
});

$(document).ready(function() {
  $("details.mega-menu").each(function() {
    const $detail = $(this);
    const $summary = $detail.find("summary.header__menu-item");
    const $content = $detail.find(".mega-menu__content");

    // Hover in
    $summary.add($content).on("mouseenter", function() {
      $detail.attr("open", true);
      $detail.closest(".template-index sticky-header")
        .removeClass("header-wrapper--transparent")
        .addClass("open-mega");
    });

    // Hover out
    $summary.add($content).on("mouseleave", function(e) {
      if (!$(e.relatedTarget).closest($detail).length) {
        $detail.removeAttr("open");
        $detail.closest(".template-index sticky-header")
          .removeClass("open-mega")
          .addClass("header-wrapper--transparent");
      }
    });
  });
});




$(document).ready(function() {
    $('.menu_wrapper----col span').click(function() {
      $(this).parents('.custom_wrapper_item').toggleClass('active');
      $(this).parents('.custom_wrapper_item').find('.custom_wrapper_item_ul').slideToggle();
    });
});

// METAOBJECT MULTI VIDEO'S PLAY JS
document.addEventListener("DOMContentLoaded", function () {
  const videoItems = document.querySelectorAll(".product-meta-video-item");
  videoItems.forEach((item) => {
    const video = item.querySelector("video");
    const thumbnail = item.querySelector("img");
    const btn = item.querySelector(".video-item_btn");

    if (video && btn) {
      video.muted = true;
      video.loop = true;
      video.controls = true; 

      btn.addEventListener("click", function () {
        videoItems.forEach((otherItem) => {
          const otherVideo = otherItem.querySelector("video");
          const otherThumbnail = otherItem.querySelector("img");
          const otherBtn = otherItem.querySelector(".video-item_btn");

          if (otherItem !== item && otherVideo) {
            otherItem.classList.remove("playing");
            otherVideo.pause();
            otherThumbnail.style.display = "block";
            otherBtn.innerHTML = `
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.26795C10.3333 5.03775 10.3333 6.96225 9 7.73205L3 11.1962C1.66666 11.966 -5.6841e-07 11.0037 -5.01112e-07 9.4641L-1.9827e-07 2.5359C-1.30972e-07 0.996296 1.66667 0.0340469 3 0.803847L9 4.26795Z" fill="black" fill-opacity="0.71"/>
              </svg>
            `;
          }
        });

        if (!item.classList.contains("playing")) {
          item.classList.add("playing");
          thumbnail.style.display = "none";
          video.play();

          btn.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="1" width="3" height="10" fill="black" fill-opacity="0.71"/>
              <rect x="7" y="1" width="3" height="10" fill="black" fill-opacity="0.71"/>
            </svg>
          `;
        } else {
          item.classList.remove("playing");
          thumbnail.style.display = "block";
          video.pause();

          btn.innerHTML = `
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4.26795C10.3333 5.03775 10.3333 6.96225 9 7.73205L3 11.1962C1.66666 11.966 -5.6841e-07 11.0037 -5.01112e-07 9.4641L-1.9827e-07 2.5359C-1.30972e-07 0.996296 1.66667 0.0340469 3 0.803847L9 4.26795Z" fill="black" fill-opacity="0.71"/>
            </svg>
          `;
        }
      });
    }
  });
});



// PRODUCT WELLNESS SECTION CALCULATER JS
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll(".lx-range").forEach(function(range){
    range.addEventListener("input", function(){
      let valSpan = document.getElementById("value-" + this.id.split("range-")[1]);
      if(valSpan){
        valSpan.textContent = this.value;
      }
    });
  });
});
document.querySelectorAll("input[type=range]").forEach(function(range){
  function updateRange() {
    let percent = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--percent", percent + "%");
  }
  range.addEventListener("input", updateRange);
  updateRange();
});




// MAIN PRODUCT STICKY BAR JS
document.addEventListener("DOMContentLoaded", function() {
  const stickyBar = document.getElementById("sticky-bar");
  const target = document.querySelector(".product-form"); 
  const header = document.querySelector("header");

  if (stickyBar && target) {
    let headerHeight = header ? header.offsetHeight : 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyBar.classList.remove("show");
        } else {
          stickyBar.classList.add("show");
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: `-${headerHeight}px 0px 0px 0px` 
    });

    observer.observe(target);
  }
});




$(".collection__title_btn").click(function() {
  $(".collection__title_btn").removeClass('active');
  $(this).addClass('active');
  var btn__id = $(this).attr('collection_id');

  $('.featured__collection_item').removeClass('active');
  $(this).parents('.collection').find('.featured__collection_item[collection_id="' + btn__id + '"]').addClass('active');
});



class VariantSwatches extends HTMLElement {
  constructor() {
    super();
    this.variantImages = this.closest(".card-wrapper").querySelectorAll(".variant-image");
  }

  connectedCallback() {
    // Get all radio inputs inside this component
    const inputs = this.querySelectorAll('.swatch-input__input');

    inputs.forEach(input => {
      input.addEventListener('change', (event) => {
        this.onVariantChange(event);
      });
    });
  }

  onVariantChange(event) {
    const input = event.target;
    const variantId = input.dataset.variantId;
    const optionValueId = input.dataset.optionValueId;
    const value = input.value;

    // Remove 'active' from all
    this.variantImages.forEach((img) => {
      img.classList.remove("active");
    });

    // Try to activate matching images
    let hasMatch = false;
    this.variantImages.forEach((img) => {
      if (img.dataset.variantId === variantId) {
        img.classList.add("active");
        hasMatch = true;
      }
    });

    // If no match found, activate the first element
    if (!hasMatch && this.variantImages.length > 0) {
      this.variantImages[0].classList.add("active");
    }
  }
}

customElements.define("variant-swatches", VariantSwatches);
