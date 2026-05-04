let arrSlide = document.querySelectorAll(".item-image");
let currentSlide = 0;
let autoSlideInterval = null;

function showSlide(index) {
    slideReset();
    arrSlide[index].style.display = "block";
    currentSlide = index;
}

function slideFirst() {
    showSlide(0);
}

function slidePre() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = arrSlide.length - 1;
    }
    showSlide(currentSlide);
}


function slideAuto() {
    if (autoSlideInterval) return; 

    autoSlideInterval = setInterval(() => {
        slideNext();
    }, 1000);
}


function slideStop() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
}


function slideNext() {
    currentSlide++;
    if (currentSlide >= arrSlide.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}


function slideLast() {
    showSlide(arrSlide.length - 1);
}


function slideReset() {
    arrSlide.forEach(slide => {
        slide.style.display = "none";
    });
}


function slideResetStart() {
    slideStop();
    showSlide(0);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlide(0);
});