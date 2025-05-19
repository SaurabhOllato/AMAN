// ========== tsParticles ==========
tsParticles.load("commonBg", {
  fullScreen: {
    enable: false,
  },
  background: {
    color: "#000", // Change to your background color
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: 3,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
      push: {
        quantity: 4,
      },
    },
  },
});

// animation for aman

gsap.registerPlugin(ScrollTrigger);

const nameEl = document.getElementById("name");
const nameText = "Aman";
nameEl.textContent = "";

ScrollTrigger.create({
  trigger: "#heading",
  start: "top 80%",
  once: true,
  onEnter: () => {
    let i = 0;
    const interval = setInterval(() => {
      nameEl.textContent += nameText[i];

      // Flicker effect for each typed letter
      gsap.fromTo(
        nameEl,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        }
      );

      i++;
      if (i === nameText.length) clearInterval(interval);
    }, 200);
  },
});

// ========== GSAP & Locomotive Setup ==========
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });

  // EMAIL
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/xzzrwzpw", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          status.textContent = "Message sent successfully!";
          status.classList.remove("hidden", "text-red-400");
          status.classList.add("text-lime-300");
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        status.textContent = "Oops! Something went wrong.";
        status.classList.remove("hidden", "text-lime-300");
        status.classList.add("text-red-400");
      }
    });
  }

  // Add smooth scroll trigger for the .showreel button
  const showreelBtn = document.querySelector(".showreel");
  const target = document.querySelector("#work");

  if (showreelBtn && target) {
    showreelBtn.addEventListener("click", function (e) {
      e.preventDefault();
      scroll.scrollTo(target);
    });
  }

  // navbar
  const navLinks = document.querySelectorAll("[data-scroll-target]");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSelector = link.getAttribute("data-scroll-target");
      const target = document.querySelector(targetSelector);
      if (target) {
        scroll.scrollTo(target); // Locomotive Scroll
      }
    });
  });
  // Wait for Locomotive to finish its setup
  setTimeout(() => {
    // Initialize Swiper after Locomotive
    const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, 500);
});

// Split the text manually (if not using SplitText plugin)
const text = document.querySelector(".video-text");
const chars = text.textContent.replace(" ", "\u00A0").split("");
text.innerHTML = chars
  .map((char) => `<span class="char inline-block opacity-0">${char}</span>`)
  .join("");

// Animate each character
gsap.to(".video-text .char", {
  scrollTrigger: {
    trigger: ".video-text",
    scroller: "[data-scroll-section]",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  y: 0,
  opacity: 1,
  stagger: 0.05,
  duration: 0.6,
  ease: "power3.out",
  from: { y: 20 },
});

// navbar
// navbar.js
// const menuToggle = document.getElementById("menuToggle");
// const mobileMenu = document.getElementById("mobileMenu");
// menuToggle.addEventListener("click", () => {
//   mobileMenu.classList.toggle("hidden");
// });

//   cursor
const cursor = document.querySelector(".custom-cursor");

// Safety check if cursor element exists
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power2.out",
    });
  });
} else {
  console.error("Cursor element not found!");
}

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power2.out",
    });
  });
});
// service

gsap.registerPlugin(ScrollTrigger);

const serviceScroller = document.getElementById("servicer");

// Duplicate content for seamless scrolling
serviceScroller.innerHTML += serviceScroller.innerHTML;

// Get width of content
const scrollWidth = serviceScroller.scrollWidth / 2;

// Animate to left
gsap.to(serviceScroller, {
  x: `-${scrollWidth}px`,
  duration: 20, // speed
  ease: "linear",
  repeat: -1,
});

// video

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".swiper-slide");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  blocks.forEach((block) => {
    const video = block.querySelector(".video-player");
    const thumbnail = block.querySelector(".thumbnail");

    if (!video || !thumbnail) return;

    if (isMobile) {
      // Play video automatically on mobile for 4 seconds
      video.classList.add("opacity-100");
      thumbnail.classList.add("opacity-0");
      video.play();

      setTimeout(() => {
        video.pause();
        video.currentTime = 0;
        video.classList.remove("opacity-100");
        thumbnail.classList.remove("opacity-0");
      }, 4000); // You wrote 20000 (20s), which might be too long for preview
    } else {
      // Desktop hover behavior
      let hoverTimeout;

      block.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout);
        video.classList.add("opacity-100");
        thumbnail.classList.add("opacity-0");
        video.play();

        hoverTimeout = setTimeout(() => {
          video.pause();
          video.currentTime = 0;
          video.classList.remove("opacity-100");
          thumbnail.classList.remove("opacity-0");
        }, 10000); // 10s preview
      });

      block.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);
        video.pause();
        video.currentTime = 0;
        video.classList.remove("opacity-100");
        thumbnail.classList.remove("opacity-0");
      });
    }
  });

  // Initialize Swiper
  new Swiper(".simpleSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });
});
