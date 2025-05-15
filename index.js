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
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-section]"),
  smooth: true,
  smartphone: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },
});

// Sync ScrollTrigger with Locomotive
ScrollTrigger.scrollerProxy("[data-scroll-section]", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("[data-scroll-section]").style.transform
    ? "transform"
    : "fixed",
});

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

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
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//   cursor
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: "power2.out",
  });
});

// service

gsap.registerPlugin(ScrollTrigger);

const serviceScroller = document.getElementById("serviceScroller");

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
// video

 document.addEventListener("DOMContentLoaded", () => {
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
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    });
