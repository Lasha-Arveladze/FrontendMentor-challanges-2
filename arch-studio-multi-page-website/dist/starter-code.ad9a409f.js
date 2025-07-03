// init Swiper:
document.addEventListener("DOMContentLoaded", ()=>{
    const swiper = new Swiper(".swiper", {
        direction: "horizontal",
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function(index, className) {
                return '<div class="' + className + '">' + (index + 1 < 10 ? "0" : "") + (index + 1) + "</div>";
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    });
});

//# sourceMappingURL=starter-code.ad9a409f.js.map
