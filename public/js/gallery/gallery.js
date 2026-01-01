const overlay = document.getElementById("overlay");
const slider = document.getElementById("slider");
const sliderItems = document.querySelector(".slider__items");
const slide = document.querySelector(".slider__item");

function openOverlay() {
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => slider.focus(), 300);
}
function closeOverlay() {
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function smartOpenOverlay(btn) {
  openOverlay();
  btn.setAttribute("aria-expanded", "true");
}
const openBtns = document.querySelectorAll('[aria-controls="overlay"]');
let openedBtn = null;
openBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    openedBtn = btn;
    if (openedBtn) {
      smartOpenOverlay(openedBtn);
      sliderItems.style.scrollBehavior = "";
      const pos = parseInt(openedBtn.dataset.position, 10);
      const targetSlide = sliderItems.children[pos - 1];
      const itemsRect = sliderItems.getBoundingClientRect();
      const slideRect = targetSlide.getBoundingClientRect();
      sliderItems.scrollLeft =
        slideRect.left - itemsRect.left + sliderItems.scrollLeft;
      sliderItems.style.scrollBehavior = "smooth";
    } else {
      openOverlay();
    }
  });
});

function smartCloseOverlay(btn) {
  closeOverlay();
  btn.setAttribute("aria-expanded", "false");
}
window.addEventListener("click", (e) => {
  const overlayStatus = overlay.getAttribute("aria-hidden") === "false";
  if (overlayStatus && e.target === overlay) {
    if (openedBtn) {
      smartCloseOverlay(openedBtn);
    } else {
      closeOverlay();
    }
  }
});

overlay.addEventListener("keydown", (e) => {
  // focus trap
  if (e.key === "Tab") {
    const focusableElements = slider.querySelectorAll(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift+Tab → если на первом элементе, прыгнуть на последний
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab → если на последнем элементе, прыгнуть на первый
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  if (e.key === "Escape") {
    if (openedBtn) {
      smartCloseOverlay(openedBtn);
    } else {
      closeOverlay();
    }
  }
});

function sliderMove(positive = true) {
  const slideWidth = slide.offsetWidth;
  if (positive) {
    if (
      sliderItems.scrollLeft + slideWidth >=
      sliderItems.scrollWidth - sliderItems.clientWidth
    ) {
      sliderItems.scrollLeft = 0; // возвращаемся в начало
    } else {
      sliderItems.scrollLeft += slideWidth;
    }
  } else {
    if (sliderItems.scrollLeft - slideWidth < 0) {
      sliderItems.scrollLeft = sliderItems.scrollWidth; // прыгаем в конец
    } else {
      sliderItems.scrollLeft -= slideWidth;
    }
  }
}
