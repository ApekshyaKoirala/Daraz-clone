

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




const logsigns = document.querySelectorAll("#login, #signup")

logsigns.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        // e.stopPropagation();
        const maincontent = document.getElementsByClassName("cover")[0]
        maincontent.classList.add("blur")
        if (e.currentTarget.id === "login") {
            show("login.html")
        }
        else {
            show("signup.html")
        }
    })
})

function show(componentFile) {
    const container = document.getElementById("modalContainer")
    container.innerHTML = "";
  fetch(componentFile)
    .then((res) => res.text())
      .then((data) => {
        console.log("done")
        container.innerHTML = data;
          container.style.display = "block"

          const btns = container.getElementsByClassName("submit");
          Array.from(btns).forEach((btn) => {
            btn.addEventListener("click", function (e) {
              e.preventDefault();
              const inputs = container.querySelectorAll(".userinput");
              const values = [];
                inputs.forEach((input) => values.push(input.value));
                removeComponent();
            //   console.log(values);
            });
          });

      });
    
}

function removeComponent() {
    const container = document.getElementById("modalContainer");
    container.style.display="none"
    container.innerHTML = "";
     const maincontent = document.getElementsByClassName("cover")[0];
     maincontent.classList.remove("blur");
}


