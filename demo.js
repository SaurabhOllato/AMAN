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
  console.log('DOM loaded'); // Check if this appears in console
  console.log(document.querySelector('.simpleSwiper')); // Should log the Swiper container
  console.log(document.querySelectorAll('.swiper-slide').length); 
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
 <!-- app -->
      <section
        id="apps"
        class="relative h-fit overflow-hidden bg-black text-white"
        data-scroll-section
      >
        <div
          class="max-w-4xl mx-auto w-full glass-morphism rounded-xl shadow-lg overflow-hidden relative"
        >
          <div class="text-center py-10">
            <h2
              class="text-white text-3xl md:text-4xl font-semibold flex items-center justify-center gap-3"
            >
              <span class="text-6xl md:text-7xl text-green-400 leading-none"
                >“</span
              >
              <span class="whitespace-nowrap">What I Can Do for You</span>
              <span class="text-6xl md:text-7xl text-green-400 leading-none"
                >”</span
              >
            </h2>
          </div>
          <div
            id="serviceScroller"
            class="flex whitespace-nowrap gap-6 text-lg font-semibold tracking-wide"
          >
            <div class="service">Cash Cow Editing</div>
            <div class="dot">•</div>
            <div class="service">Reels Editing</div>
            <div class="dot">•</div>
            <div class="service">Logo Animation</div>
            <div class="dot">•</div>
            <div class="service">Podcast Edit</div>
            <div class="dot">•</div>
            <div class="service">Content Repurposing</div>
            <div class="dot">•</div>
            <div class="service">YT Shorts Edit</div>
            <div class="dot">•</div>
            <div class="service">Animated Text</div>
            <!-- You can duplicate the content for seamless loop effect -->
          </div>
          <div class="overflow-hidden bg-black py-8">
            <!-- <div class="flex" id="appScroller">
    
    <div class="app-box flex items-center justify-center gap-10 px-10">
      <img src="assets/alightmotion.jpg" alt="App 1" class="h-10" />
      <img src="assets/aftereffects.png" alt="App 2" class="h-10" />
      <img src="assets/aftereffects.png" alt="App 3" class="h-10" />
      <img src="assets/aftereffects.png" alt="App 4" class="h-10" />
    </div>

  
  </div> -->
          </div>
        </div>
      </section>

      <!-- video portfolio -->
      <section
        class="py-20 overflow-hidden h-fit"
        data-scroll-section
        id="work"
      >
        <div class="bg-overlay"></div>
        <div class="container mx-auto px-4">
          <h2
            class="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            data-scroll
            data-scroll-speed="1"
          >
            My <span class="text-blue-400">Video Portfolio</span>
          </h2>

          <!-- Swiper -->
          <div
            class="swiper simpleSwiper relative"
            data-scroll
            data-scroll-speed="2"
          >
            <div class="swiper-wrapper pb-12">
              <!-- Slide 1 - Replace with your actual videos -->
              <div
                class="swiper-slide w-[100px] h-[300px] lg:w-[400px] lg:h-[300px] mx-auto"
              >
                <a
                  href="https://www.instagram.com/reel/DBksc9ZILau/?igsh=aTk0aHFwaTVuYzUw"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View 'Never Gonna Give You Up' on Instagram"
                  class="block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <img
                    src="https://a10.gaanacdn.com/gn_img/albums/Dk9KN2KBx1/k9KN112bBx/size_m_1713800456.webp"
                    alt="Never Gonna Give You Up album cover"
                    loading="lazy"
                    width="400"
                    height="430"
                    class="thumbnail w-full h-full object-cover transition-all duration-500 group-hover:scale-105 rounded-2xl"
                  />

                  <!-- Darker hover overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span
                      class="text-white text-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                      View Reel
                    </span>
                  </div>

                  <!-- Title section -->
                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                  >
                    <h5 class="caveat-font font-bold text-xl text-white">
                      Never Gonna Give You Up
                    </h5>
                    <p class="text-sm text-gray-200 mt-1">Reels edit</p>
                  </div>
                </a>
              </div>

              <!-- Slide 2 -->
              <div
                class="swiper-slide w-[100px] h-[300px] lg:w-[400px] lg:h-[430px] mx-auto"
              >
                <a
                  href="https://www.instagram.com/reel/C-nfPlgNKlU/?igsh=MXFvMXRmNWV6djFmbA=="
                  target="_blank"
                  class="block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300"
                >
                  <img
                    src="assets/laila.jpg"
                    alt="Never Gonna Give You Up"
                    class="thumbnail w-full h-[115%] object-cover transition-opacity duration-300 rounded-2xl"
                  />
                  <!-- <video
                    muted
                    playsinline
                    class="video-player absolute top-0 left-0 w-full h-full object-cover rounded-2xl opacity-0 transition-opacity duration-300"
                    preload="metadata"
                  >
                    <source src="video/reel1.mp4" type="video/mp4" />
                  </video> -->
                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  >
                    <h5 class="caveat-Font font-semibold text-lg">
                      Reels edits
                    </h5>
                  </div>
                </a>
              </div>

              <!-- Slide 3 -->
              <div
                class="swiper-slide w-[100px] h-[300px] lg:w-[400px] lg:h-[430px] mx-auto"
              >
                <a
                  href="https://www.instagram.com/reel/C-PxNFYyubH/?igsh=bHR6cXU0YnZxcmJt"
                  target="_blank"
                  class="block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300"
                >
                  <img
                    src="assets/srk.jpg"
                    alt="Never Gonna Give You Up"
                    class="thumbnail w-full h-[115%] object-cover transition-opacity duration-300 rounded-2xl"
                  />
                  <!-- <video
                    muted
                    playsinline
                    class="video-player absolute top-0 left-0 w-full h-full object-cover rounded-2xl opacity-0 transition-opacity duration-300"
                    preload="metadata"
                  >
                    <source src="video/reel1.mp4" type="video/mp4" />
                  </video> -->
                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  >
                    <h5 class="caveat-Font font-semibold text-lg">
                      Reel edits
                    </h5>
                  </div>
                </a>
              </div>
              <div
                class="swiper-slide w-[100px] h-[300px] lg:w-[400px] lg:h-[430px] mx-auto"
              >
                <a
                  href="https://www.instagram.com/reel/DGdcCXPo0fZ/?igsh=MXZ2b2FjOTJxY2Rpcg=="
                  target="_blank"
                  class="block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300"
                >
                  <img
                    src="assets/event.jpg"
                    alt="Never Gonna Give You Up"
                    class="thumbnail w-full h-[115%] object-cover transition-opacity duration-300 rounded-2xl"
                  />

                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  >
                    <h5 class="caveat-Font font-semibold text-lg">
                      Reel edits
                    </h5>
                  </div>
                </a>
              </div>
            </div>

            <!-- Navigation -->
            <div
              class="swiper-button-prev text-blue-400 hover:text-white"
            ></div>
            <div
              class="swiper-button-next text-blue-400 hover:text-white"
            ></div>

            <!-- Pagination -->
            <div class="swiper-pagination mt-8"></div>
          </div>
        </div>
      </section>

      <section
        class="py-20 overflow-hidden h-fit items-center justify-center relative px-6 py-20"
        data-scroll-section
      >
        <div class="bg-overlay"></div>

        <div
          class="glass-morphism container mx-auto px-6 h-full flex flex-col justify-center items-center"
        >
          <div
            class="absolute inset-0 bg-noise opacity-5 pointer-events-none border-2 border-gray-200 rounded-xl"
          ></div>
          <h2
            class="text-4xl md:text-6xl font-bold text-white mb-6 transform translate-y-10"
          >
            Follow Me
          </h2>
          <p class="text-sm text-white mb-12 transform translate-y-10">
            Let's connect on social platforms!
          </p>

          <div
            class="flex flex-wrap justify-center gap-8 transform translate-y-10"
          >
            <!-- Instagram -->
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon group w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
              <span class="sr-only">Instagram</span>
            </a>

            <!-- WhatsApp -->
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon group w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                />
              </svg>
              <span class="sr-only">WhatsApp</span>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon group w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
              <span class="sr-only">LinkedIn</span>
            </a>

            <!-- Email -->
            <a
              href="mailto:youremail@example.com"
              class="social-icon group w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-red-500/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"
                />
              </svg>
              <span class="sr-only">Email</span>
            </a>
          </div>
        </div>

        <!-- Decorative elements -->
        <div
          class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        >
          <div
            class="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-600/20 blur-xl"
          ></div>
          <div
            class="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-600/20 blur-xl"
          ></div>
        </div>
      </section>



      