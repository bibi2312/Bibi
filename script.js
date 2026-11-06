// SimpleWeb Interactive Script

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle (Light / Dark)
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme based on stored value or system preference
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });

  // 2. Mobile Navigation Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
      }
    });
  });

  // 3. Highlight Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // 4. Contact Form Handling (Client-side demo)
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formFeedback.textContent = "Please fill out all fields.";
      formFeedback.className = "form-feedback error";
      return;
    }

    // Simulate sending message
    formFeedback.textContent = "Sending...";
    formFeedback.className = "form-feedback";

    setTimeout(() => {
      formFeedback.textContent = `Thank you, ${name}! Your message has been sent.`;
      formFeedback.className = "form-feedback success";
      contactForm.reset();

      // Clear success feedback after 5 seconds
      setTimeout(() => {
        formFeedback.textContent = "";
      }, 5000);
    }, 600);
  });
});
