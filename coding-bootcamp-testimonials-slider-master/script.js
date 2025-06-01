const sliderComponents = document.querySelectorAll(".slider--component");
const sliderContainer = document.querySelector(".slider-container");
let currentSlide = 0;
let totalSlides = sliderComponents.length;

const init = function () {
  sliderComponents.forEach((slider, index) => {
    slider.style.transform = `translateX(${index * 100}%)`;
  });
};

init();

const moveToSlide = function (currentSlide) {
  sliderComponents.forEach((slider, index) => {
    slider.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
};

const prevSlide = function () {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1;
  }
  moveToSlide(currentSlide);
};

const nextSlide = function () {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  moveToSlide(currentSlide);
};

sliderContainer.addEventListener("click", function (e) {
  if (e.target.closest(".move-left")) {
    prevSlide();
  } else if (e.target.closest(".move-right")) {
    nextSlide();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }

  if (e.key === "ArrowRight") {
    nextSlide();
  }
});
