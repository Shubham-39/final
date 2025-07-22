// Navigation Scroll Effect
window.addEventListener("scroll", function () {
  const nav = document.getElementById("mainNav");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Highlight active section
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll("nav a").forEach((navLink) => {
        navLink.classList.remove("active");
        if (navLink.getAttribute("href") === `#${sectionId}`) {
          navLink.classList.add("active");
        }
      });
    }
  });
});

// Hamburger Menu Toggle
document.getElementById("hamburger").addEventListener("click", function () {
  const navMenu = document.getElementById("navMenu");
  const mobileContactInfo = document.getElementById("mobileContactInfo");

  if (window.innerWidth <= 768) {
    navMenu.classList.toggle("show");
  } else {
    mobileContactInfo.classList.toggle("active");
  }

  // Animate hamburger to X
  this.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      document.getElementById("navMenu").classList.remove("show");
      document.getElementById("hamburger").classList.remove("active");
    }
  });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Initialize
window.onload = function () {
  // Set home as active if at top of page
  if (window.scrollY < 100) {
    document.querySelector('nav a[href="#home"]')?.classList.add("active");
  }
};

// Booking Form WhatsApp Integration
document
  .getElementById("bookingForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const date = document.getElementById("date")?.value;
    const message = document.getElementById("message")?.value.trim();

    const text = `Hello, I'm ${name}. I would like to book a travel package for ${date}. Message: ${message}. You can reach me at ${phone}`;
    const encodedText = encodeURIComponent(text);

    const whatsappNumber = "918805504373";
    const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(url, "_blank");
  });

// Google Sheets Integration
const sheetURL =
  "https://script.google.com/macros/s/AKfycbyMH5PwPuOgF7I2A7BaMwKVm607tciXi2DGYyR21NtoAQV1UpNHC1cPQw8IIIQaoMCQ/exec";

// Feedback Form Handling
document
  .getElementById("feedbackForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      type: "feedback",
      name: this.querySelector("[placeholder='Your Name']").value,
      email: this.querySelector("[placeholder='Your Email']").value,
      contact: this.querySelector("[placeholder='Your Contact']").value,
      message: this.querySelector("textarea").value,
      rating: this.querySelector("select").value,
    };

    saveFeedbackLocally(data);
    sendToGoogleSheet(data);
    this.reset();
  });

// Contact Form Handling
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const statusElement = document.getElementById("contactStatus");

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          statusElement.innerHTML =
            "<p style='color:green;'>Message sent successfully!</p>";
          form.reset();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        statusElement.innerHTML =
          "<p style='color:red;'>Failed to send message. Please try again.</p>";
        console.error("Error:", error);
      });
  });

// Google Sheets Submission
function sendToGoogleSheet(data) {
  if (!sheetURL) return;

  fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      alert("Submitted successfully!");
    })
    .catch((err) => {
      console.error(err);
    });
}

// Local Feedback Storage
function saveFeedbackLocally(data) {
  let list = JSON.parse(localStorage.getItem("feedbackList") || "[]");
  list.push(data);
  localStorage.setItem("feedbackList", JSON.stringify(list));
  displayFeedback();
}

// Display Feedback
function displayFeedback() {
  let list = JSON.parse(localStorage.getItem("feedbackList") || "[]");
  const container = document.getElementById("feedbackList");

  if (container) {
    container.innerHTML = list
      .map(
        (f) => `
      <div class="feedback-item">
        <p><strong>${f.name}</strong> <span class="rating">(${"★".repeat(
          f.rating
        )}${"☆".repeat(5 - f.rating)})</span></p>
        <p class="feedback-message">${f.message}</p>
        <!-- Removed contact number display -->
      </div>
    `
      )
      .join("");
  }
}

// Navigation Smooth Scrolling and Active State
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelectorAll("nav a").forEach((navLink) => {
      navLink.classList.remove("active");
    });

    this.classList.add("active");

    const targetId = this.getAttribute("href");
    if (targetId !== "#") {
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Highlight Active Section on Scroll
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY + 100;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll("nav a").forEach((navLink) => {
        navLink.classList.remove("active");
        if (navLink.getAttribute("href") === `#${sectionId}`) {
          navLink.classList.add("active");
        }
      });
    }
  });
});

// Initialize on Load
window.onload = function () {
  displayFeedback();

  // Set home as active if at top of page
  if (window.scrollY < 100) {
    document.querySelector('nav a[href="#home"]')?.classList.add("active");
  }
};

// Loading Animation

window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  const content = document.getElementById("main-content");
  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 900); // Delay for 15000 = 1.5s for smooth UX
});

// Optional: Show loader on link clicks
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Ignore anchor links for in-page navigation
    if (href.startsWith("#")) return;

    const loader = document.getElementById("loader-wrapper");
    const content = document.getElementById("main-content");

    e.preventDefault();
    loader.style.display = "flex";
    content.style.display = "none";
    setTimeout(() => {
      window.location.href = href;
    }, 900);
  });
});
