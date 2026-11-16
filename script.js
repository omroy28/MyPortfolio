// ---------- Dark / Light mode ----------
var themeBtn = document.getElementById("theme-btn");

// check if user already chose dark mode before
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerText = "Light Mode";
}

// when button is clicked
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.innerText = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});


// ---------- Contact form ----------
var form = document.getElementById("contact-form");
var formMsg = document.getElementById("form-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page from reloading

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // check if any box is empty
  if (name === "" || email === "" || message === "") {
    formMsg.innerText = "Please fill all the fields!";
    formMsg.style.color = "red";
    return;
  }

  // simple email check
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    formMsg.innerText = "Please enter a valid email!";
    formMsg.style.color = "red";
    return;
  }

  // there is no backend so we just show a message
  formMsg.innerText = "Thank you " + name + "! Your message was sent.";
  formMsg.style.color = "green";
  form.reset();
});


// ---------- Footer year ----------
document.getElementById("year").innerText = new Date().getFullYear();


// ---------- Greeting based on time ----------
var greeting = document.getElementById("greeting");
var hour = new Date().getHours();

if (hour < 12) {
  greeting.innerText = "Good Morning!";
} else if (hour < 17) {
  greeting.innerText = "Good Afternoon!";
} else {
  greeting.innerText = "Good Evening!";
}


// ---------- Typing effect ----------
var words = ["student", "web developer", "problem solver"];
var wordIndex = 0;   // which word we are on
var charIndex = 0;   // which letter we are on
var deleting = false;
var typingSpan = document.getElementById("typing");

function typeText() {
  var currentWord = words[wordIndex];

  if (deleting === false) {
    // add one letter
    charIndex++;
    typingSpan.innerText = currentWord.substring(0, charIndex);

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeText, 1200); // wait before deleting
      return;
    }
  } else {
    // remove one letter
    charIndex--;
    typingSpan.innerText = currentWord.substring(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      wordIndex++;
      if (wordIndex === words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typeText, 100);
}

typeText();


// ---------- Back to top button ----------
var topBtn = document.getElementById("top-btn");

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ---------- Scroll things (top button + navbar highlight) ----------
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function () {
  // show top button after scrolling 300px
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

  // find which section we are on
  var current = "home";
  for (var i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 100) {
      current = sections[i].id;
    }
  }

  // add active class to the matching link
  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
    if (navLinks[j].getAttribute("href") === "#" + current) {
      navLinks[j].classList.add("active");
    }
  }
});
