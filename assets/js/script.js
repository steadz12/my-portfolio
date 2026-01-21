'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPageId = this.textContent.toLowerCase().trim();
    const targetSection = document.getElementById(targetPageId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    // Toggle active class on nav links
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}

// custom modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalTitle = document.querySelector("[data-modal-title]");
const modalImg = document.querySelector("[data-modal-img]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  // Fix: Enforce layout constraints to prevent image overflow
  if (modalContainer.classList.contains("active")) {
    const wrapper = document.querySelector(".modal-img-wrapper");
    const avatarBox = document.querySelector(".modal-avatar-box");

    if (wrapper) {
      wrapper.style.overflow = "hidden";
      wrapper.style.width = "350px";
      wrapper.style.minWidth = "350px";
      wrapper.style.flex = "0 0 350px";
    }

    if (avatarBox) {
      avatarBox.style.width = "100%";
      avatarBox.style.maxWidth = "100%";

      const img = avatarBox.querySelector("img");
      if (img) {
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";
      }
    }
  }
}

// add click event to all project items
const projectItems = document.querySelectorAll("[data-filter-item] > a");

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();

    const title = this.querySelector(".project-title").innerHTML;
    const category = this.querySelector(".project-category").innerHTML;
    const imgInfo = this.querySelector("img");
    const imgSrc = imgInfo.getAttribute("src");
    const imgAlt = imgInfo.getAttribute("alt");

    // Get the details list if it exists
    const details = this.querySelector(".project-details");
    let detailsHtml = "";
    if (details) {
      detailsHtml = details.outerHTML;
    } else {
      detailsHtml = "<p>No project details available.</p>";
    }

    modalTitle.innerHTML = title;
    // You can also add category if you want: modalTitle.innerHTML = `${title} <span>${category}</span>`;
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;


    modalText.innerHTML = detailsHtml;

    // Gallery Logic
    // 1. Remove any *extra* images added previously (keep the main one)
    const extraImages = document.querySelectorAll(".modal-img-wrapper > figure:not(.modal-avatar-box)");
    // Wait, the main one IS .modal-avatar-box. 
    // Better strategy: Keep the FIRST .modal-avatar-box (which is the main one), remove others.
    // But if I add .modal-avatar-box class to new ones, I need to distinguish them.
    // Actually, the main one is hardcoded.
    // Let's identify the hardcoded one by its data-modal-img attribute on the img inside?
    // Or just remove all figures that are NOT the first child?

    const wrapper = document.querySelector(".modal-img-wrapper");
    // Remove all children except the first one
    while (wrapper.children.length > 1) {
      wrapper.removeChild(wrapper.lastChild);
    }

    // 2. Check for hidden gallery images in the clicked project
    const galleryImagesContainer = this.querySelector(".project-gallery-images");

    if (galleryImagesContainer) {
      const galleryImages = galleryImagesContainer.querySelectorAll("img");
      const modalImgWrapper = document.querySelector(".modal-img-wrapper");

      galleryImages.forEach(img => {
        // Create a new figure/img structure similar to the main one
        const newFigure = document.createElement("figure");
        newFigure.classList.add("modal-avatar-box"); // Re-use styling

        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "Project Gallery Image";

        const zoomIcon = document.createElement("div");
        zoomIcon.classList.add("zoom-icon");
        zoomIcon.innerHTML = '<ion-icon name="search-outline"></ion-icon>';

        newFigure.appendChild(newImg);
        newFigure.appendChild(zoomIcon);

        modalImgWrapper.appendChild(newFigure);
      });
    }

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Lightbox Variables
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxCloseBtn = document.querySelector("[data-lightbox-close-btn]");

// Lightbox Toggle Function
const lightboxToggleFunc = function () {
  lightbox.classList.toggle("active");
}

// Add click event to modal image wrapper (delegation)
const modalImgWrapper = document.querySelector(".modal-img-wrapper");

modalImgWrapper.addEventListener("click", function (e) {
  // Check if clicked element is an image or the avatar box (due to ::after overlay)
  const clickedBox = e.target.closest(".modal-avatar-box");

  if (clickedBox) {
    const img = clickedBox.querySelector("img");
    if (img) {
      lightboxImg.src = img.src;
      lightboxToggleFunc();
    }
  }
});

// Close Lightbox events
lightboxCloseBtn.addEventListener("click", lightboxToggleFunc);

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightboxToggleFunc();
  }
});

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);