// Getting all the variables
const burgerMenu = document.querySelector(".header-hamburger");
const navigationBox = document.querySelector(".header-navigation-box");
const closeBtn = document.querySelector(".close");
const overlay = document.querySelectorAll(".overlay");
// Open/Close Modal
const closeModal = ()=>{
    navigationBox.style.opacity = 0;
    navigationBox.style.transform = "translateX(0)";
    burgerMenu.style.display = "inline-block";
    closeBtn.style.display = "none";
    document.querySelectorAll(".overlay").forEach((slide)=>{
        slide.style.zIndex = 1;
    });
};
const openModal = ()=>{
    navigationBox.style.opacity = 1;
    navigationBox.style.transform = "translateX(-100%)";
    burgerMenu.style.display = "none";
    closeBtn.style.display = "inline-block";
    overlay.forEach((slide)=>{
        slide.style.zIndex = 3;
    });
};
console.log(window.innerWidth);
if (window.innerWidth < 768) {
    // Handling burger Functionality
    burgerMenu.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    overlay.forEach((slide)=>{
        slide.addEventListener("click", closeModal);
    });
    window.addEventListener("scroll", closeModal);
    console.log(imgSlider4.src);
}

//# sourceMappingURL=starter-code.8061aac4.js.map
