

const slides = document.querySelectorAll(".slide-img")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display=(i===index)?"block":'none'
    })
}

prev.addEventListener("click", () => {
    console.log("Clicked")
    currentIndex = (currentIndex-1+slides.length) % slides.length;
   showSlide(currentIndex)
})

next.addEventListener("click", () => {
     console.log("Clicked");
    currentIndex = (currentIndex +1) % slides.length;
    showSlide(currentIndex)
});

showSlide(currentIndex)