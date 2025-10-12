

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

          const submitbtns = container.getElementsByClassName("submit");
          Array.from(submitbtns).forEach((submitbtn) => {
            submitbtn.addEventListener("click", function (e) {
              e.preventDefault();
                const inputs = container.querySelectorAll(".userinput");
                const name = inputs[0].value;
                const email = inputs[1].value;
                const password = inputs[2].value;
                const confirmpassword = inputs[3].value;
             
                
                if (password === confirmpassword) {
                     const users = JSON.parse(
                       localStorage.getItem("users") || "[]"
                     );
                     const newUser = { name, email, password, confirmpassword };
                    users.push(newUser)
                    localStorage.setItem("users", JSON.stringify(users))
                }
                else {
                    // passwords doesn't match
                }
                removeComponent();
            
            });
          });
          const loginbtns = container.getElementsByClassName("login");
          Array.from(loginbtns).forEach((loginbtn) => {
            loginbtn.addEventListener("click", function (e) {
              e.preventDefault();
                const inputs = container.querySelectorAll(".userinput");
                 const email = inputs[0].value;
                 const password = inputs[1].value;
                
              const users = JSON.parse(localStorage.getItem("users") || "[]");
              
              const foundUser= users.find(user => user.email === email && user.password === password)
              if (foundUser) {
                currentUser = foundUser.name;
                console.log("login success");
                const login = document.getElementById("login");
                const signup=document.getElementById("signup")
                if (login) {
                  const link = document.createElement("a");
                  link.href = "#";
                  const span = document.createElement("span");
                  span.id = "username";
                  link.appendChild(span);
                  login.replaceWith(link)
                  span.textContent = currentUser.toUpperCase()
                }
                if (signup) {
                  signup.remove();
                }
              }
                else {
                     console.log("login failed")
                }
               
               
                removeComponent();
            
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


