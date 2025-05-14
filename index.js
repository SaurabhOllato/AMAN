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

// animation for p video editor

gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-section]"),
  smooth: true,
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

// about section
gsap.from("#about-title", {
  scrollTrigger: {
    trigger: "#about-title",
    scroller: "[data-scroll-section]", // important when using LocomotiveScroll
    start: "top 90%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
});

gsap.from("#about-text", {
  scrollTrigger: {
    trigger: "#about-text",
    scroller: "[data-scroll-section]", // add this line
    start: "top 90%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  delay: 0.2,
  ease: "power4.out",
});

//  service app



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

 document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".swiper-slide");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    blocks.forEach(block => {
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
          slidesPerView: 3,
        },
      },
    });
  });

// follow
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create timeline for sequenced animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "section[data-scroll-section]",
        start: "top 70%",
        end: "bottom center",
        scrub: 0.5,
        markers: false // Set to true for debugging, false for production
      }
    });
    
    // Animation sequence
    tl.from("h2", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from("p", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(".contact-link", {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.3");
    
    // Optional hover animations
    document.querySelectorAll('.contact-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  });

//   cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: 'power2.out'
  });
});

// Scale on hover
document.querySelectorAll('.hover-target').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 2, backgroundColor: "#ff4081", duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
  });
});

// smoth scrool
