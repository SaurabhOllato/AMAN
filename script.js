// // Register ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);

// // Initialize Locomotive Scroll
// const scrollContainer = document.querySelector("[data-scroll-container]");
// const locoScroll = new LocomotiveScroll({
//   el: scrollContainer,
//   smooth: true,
//   lerp: 0.1,
// });

// // Tell ScrollTrigger to use LocomotiveScroll's scroller
// ScrollTrigger.scrollerProxy(scrollContainer, {
//   scrollTop(value) {
//     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//   },
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight
//     };
//   },
//   pinType: scrollContainer.style.transform ? "transform" : "fixed"
// });

// // Update ScrollTrigger when Locomotive Scroll updates
// locoScroll.on("scroll", ScrollTrigger.update);

// // Refresh ScrollTrigger and Locomotive
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// ScrollTrigger.refresh();

    document.addEventListener("DOMContentLoaded", () => {
        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
          el: document.querySelector("[data-scroll-container]"),
          smooth: true,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        });

        // Update ScrollTrigger when Locomotive Scroll updates
        locoScroll.on("scroll", ScrollTrigger.update);

        gsap.registerPlugin(ScrollTrigger);


        // Tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy("[data-scroll-container]", {
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
          pinType: document.querySelector("[data-scroll-container]").style
            .transform
            ? "transform"
            : "fixed",
        });

        // Create the background parallax effect
        gsap.to("#commonBg", {
          scrollTrigger: {
            scrub: 0.5,
            trigger: "body",
            scroller: "[data-scroll-container]",
            start: "top top",
            end: "bottom bottom",
          },
          y: 200,
          ease: "none",
        });

        // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        // After everything is set up, refresh ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

        // Section animations with GSAP
        gsap.utils.toArray("section").forEach((section, i) => {
          const heading = section.querySelector("h2, h1");
          if (heading) {
            gsap.from(heading, {
              scrollTrigger: {
                trigger: section,
                scroller: "[data-scroll-container]",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              y: 50,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            });
          }

          // Animate in content with a stagger
          const content = section.querySelectorAll(
            "p, img, button, a:not([href^='mailto'])"
          );
          if (content.length > 0) {
            gsap.from(content, {
              scrollTrigger: {
                trigger: section,
                scroller: "[data-scroll-container]",
                start: "top 80%",
                toggleActions: "play none none none",
              },
              y: 30,
              opacity: 0,
              stagger: 0.2,
              duration: 1,
              ease: "power3.out",
            });
          }
        });
      });

      // particles.js

       tsParticles.load("commonBg", {
    fullScreen: {
      enable: false
    },
    background: {
      color: "#000" // Change to your background color
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5
      },
      size: {
        value: 3
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out"
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        onClick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        repulse: {
          distance: 100
        },
        push: {
          quantity: 4
        }
      }
    }
  });

  // navbar.js
   const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
  
gsap.utils.toArray(".app-card").forEach((card, index) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      end: "bottom 60%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    x: 0,
    duration: 1,
    delay: index * 0.1,
    ease: "power2.out"
  });
});

// video
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-coverflow', {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          coverflowEffect: {
            rotate: 15,
            stretch: -30,
            depth: 150,
          }
        }
      }
    });
    
    // Play videos when visible
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
  });