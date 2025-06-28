// init Swiper:
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
});
