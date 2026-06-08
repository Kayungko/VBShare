const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");
const slideTitle = document.querySelector("#slideTitle");
const slideCount = document.querySelector("#slideCount");
const dots = document.querySelector("#dots");

let current = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `跳转到第 ${index + 1} 页`);
  dot.addEventListener("click", () => showSlide(index));
  dots.appendChild(dot);
});

const dotButtons = Array.from(document.querySelectorAll(".dot"));

function pad(value) {
  return String(value).padStart(2, "0");
}

function showSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === current);
  });

  dotButtons.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === current);
  });

  slideTitle.textContent = slides[current].dataset.title || "slide";
  slideCount.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
  prevButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;

  const id = slides[current].id;
  if (location.hash !== `#${id}`) {
    history.replaceState(null, "", `#${id}`);
  }
}

function next() {
  showSlide(current + 1);
}

function prev() {
  showSlide(current - 1);
}

prevButton.addEventListener("click", prev);
nextButton.addEventListener("click", next);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    next();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    prev();
  }
});

const initial = slides.findIndex((slide) => `#${slide.id}` === location.hash);
showSlide(initial >= 0 ? initial : 0);
