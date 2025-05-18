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
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
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
  }, 500); // small delay ensures Locomotive finishes
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


  document.addEventListener('DOMContentLoaded', function() {
    // Simple intersection observer implementation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const direction = element.getAttribute('data-animate');
          
          // Reset and animate
          element.style.transition = 'none';
          element.style.opacity = '0';
          element.style.transform = direction === 'left' ? 'translateX(-50px)' : 'translateX(50px)';
          
          // Force reflow
          void element.offsetWidth;
          
          // Animate in
          element.style.transition = 'all 0.8s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
          
          // Unobserve after animation
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.3 });
  
    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('visible', `delay-${index % 6}`); // 6 cards max
        
        // Unobserve after animation
        setTimeout(() => observer.unobserve(card), 1000);
      }
    });
  }, { threshold: 0.2 });

  // Observe all cards
  document.querySelectorAll('.app-card').forEach(card => {
    observer.observe(card);
  });
});

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  // enable anchor support
  getDirection: true,
});




<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Smooth Scroll Portfolio</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
    />
    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>

    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />
    <!-- Add in <head> -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
    />

    <!-- tsParticles via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>
  </head>

  <body class="smooth-scroll">
    <!-- Common background that will move with parallax -->
    <div class="common-bg" id="commonBg"></div>

    <!-- Navbar -->
    <header class="fixed w-full z-50 bg-white/10 text-white">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 backdrop-blur-xl bg-white/10 :px-8 flex items-center justify-between h-16"
      >
        <!-- Logo -->
        <div class="text-2xl font-bold caveat-Font">
          <img
            src="assets/Screenshot_2025-05-16_152727-removebg-preview.png"
            alt="Logo"
            class="h-20"
          />
        </div>

        <!-- Menu Items -->
        <div
          id="navMenu"
          class="md:flex space-x-4 md:space-x-6 text-lg font-medium transition duration-300 items-center"
        >
          <!-- Social Icons -->
          <a
            href="https://www.instagram.com/itsxoaman?igsh=MWJpeWp4bGk4OXRhdg=="
            target="_blank"
            class="text-pink-500 hover:text-pink-400 transition duration-300"
          >
            <i
              class="fab fa-instagram text-2xl drop-shadow-[0_0_6px_rgba(225,48,108,0.7)]"
            ></i>
          </a>

          <a
            href="itsxoaman@gmail.com"
            target="_blank"
            class="text-red-600 hover:text-red-500 transition duration-300"
          >
            <i
              class="fas fa-envelope text-2xl drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]"
            ></i>
          </a>

          <a
            href=" https://www.linkedin.com/in/aman-gaud-807a9934a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            class="text-blue-600 hover:text-blue-500 transition duration-300"
          >
            <i
              class="fab fa-linkedin text-2xl drop-shadow-[0_0_6px_rgba(10,102,194,0.7)]"
            ></i>
          </a>
        </div>
      </nav>
    </header>

    <!-- Required wrapper for Locomotive -->

    <div id="main" data-scroll-container class="content-wrapper">
      <!-- Hero Section -->
      <section
        class="h-screen flex items-center justify-center text-white relative"
        data-scroll-section
        id="home"
      >
        <div class="bg-overlay"></div>
        <div
          class="relative z-10 text-center px-6"
          data-scroll
          data-scroll-speed="2"
        >
          <h1
            class="text-5xl md:text-7xl font-bold mb-4 text-white px-5 py-5"
            id="heading"
          >
            Hi, I'm <span id="name"></span>
          </h1>

          <p class="text-xl md:text-2xl font-semibold video-text caveat-font">
            VIDEO EDITOR
          </p>
          <a
            href="#showreel"
            class="relative inline-block px-6 py-3 mt-10 border-2 border-white rounded-full text-white hover:text-black hover:bg-white transition duration-300 overflow-hidden"
          >
            <span class="relative z-10">Watch My Showreel</span>
            <span class="sparkle"></span>
          </a>
        </div>
        <a
          href=""
          class="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white text-3xl z-10"
        >
          <i class="fas fa-chevron-down"></i>
        </a>
      </section>

      <!-- About Section -->

      <section
        id="about"
        class="min-h-screen flex items-center justify-center px-6 py-10"
        data-scroll-section
      >
        <div class="bg-overlay"></div>
        <div
          class="max-w-5xl w-full glass-morphism p-10 rounded-xl shadow-lg relative overflow-hidden"
        >
          <!-- Optional noise layer -->
          <div
            class="absolute inset-0 bg-noise opacity-5 pointer-events-none border border-gray-300 rounded-xl"
          ></div>

          <div class="relative z-10 space-y-10">
            <!-- Title -->
            <h2
              class="text-4xl md:text-5xl text-white relative inline-block group caveat-Font"
              id="about-title"
            >
              About Me
              <span
                class="absolute left-0 -bottom-1 w-0 h-1 bg-pink-500 transition-all duration-500 group-hover:w-full"
              ></span>
            </h2>

            <!-- Section 1: Accounting -->
            <div class="space-y-3" data-scroll data-scroll-speed="1">
              <h3 class="text-xl font-semibold text-pink-400">
                👨‍💼 Junior Accountant
              </h3>
              <p
                class="text-white text-base md:text-lg leading-relaxed font-sans text-justify"
                style="font-family: 'Poppins', sans-serif"
              >
                I’m Aman Gaud, currently working at A.C. Jhaveri & Associates.
                My role involves assisting with bookkeeping, tax filing, and
                financial reporting. I’m known for being detail-oriented,
                organized, and dependable when it comes to managing financial
                data and ensuring compliance.
              </p>
            </div>

            <!-- Section 2: Video Editing -->
            <div class="space-y-3" data-scroll data-scroll-speed="1">
              <h3 class="text-xl font-semibold text-pink-400">
                🎬 Passionate Video Editor
              </h3>
              <p
                class="text-white text-base md:text-lg leading-relaxed font-sans text-justify"
              >
                In addition to my accounting career, I enjoy video editing and
                storytelling. I’ve worked on Instagram Reels, YouTube Shorts,
                and full-length videos using both mobile and desktop tools.
              </p>
              <ul
                class="list-disc list-inside text-sm text-gray-300 text-justify"
              >
                <li>
                  <strong>Mobile Apps:</strong> CapCut, VN Video Editor, InShot,
                  Alight Motion
                </li>
                <li>
                  <strong>Desktop Tools:</strong> Adobe Premiere Pro, DaVinci
                  Resolve, Filmora
                </li>
              </ul>
            </div>

            <!-- Section 3: Personal Insight -->
            <div class="space-y-3" data-scroll data-scroll-speed="1">
              <h3 class="text-xl font-semibold text-pink-400">
                🔁 A Balanced Mindset
              </h3>
              <p
                class="text-white text-base md:text-lg leading-relaxed font-sans text-justify"
              >
                My unique blend of analytical and creative skills keeps me
                engaged and growing in both fields. Whether I’m reconciling
                financials or refining a video timeline, I’m always learning and
                improving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!--  -->

      <section
        id="apps"
        class="relative h-3/4 lg:96 overflow-hidden text-white px-6 py-10 lg:py-10"
        data-scroll-section
      >
        <div
          class="max-w-4xl mx-auto w-full bg-black rounded-2xl glass-morphism rounded-xl shadow-lg overflow-hidden relative"
        >
          <!-- Title Section -->
          <div class="text-center py-0 lg:py-10">
            <h2
              class="text-white text-xl md:text-4xl font-semibold flex items-center justify-center gap-3"
            >
              <span
                class="text-6xl md:text-7xl text-green-400 leading-none"
                data-scroll
                data-scroll-speed="-0.5"
                data-scroll-direction="horizontal"
                >“</span
              >
              <span class="whitespace-nowrap">What I Can Do for You</span>
              <span
                class="text-6xl md:text-7xl text-green-400 leading-none"
                data-scroll
                data-scroll-speed="0.5"
                data-scroll-direction="horizontal"
                >”</span
              >
            </h2>
          </div>

          <!-- Fixed Services Text Row -->
          <div
            class="text-center border-b border-gray-700 px-4"
            data-scroll
            data-scroll-speed="1"
          >
            <div
              class="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-sm sm:text-base font-semibold tracking-wide"
            >
              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                Cash Cow Editing
              </div>
              <div class="dot sm:inline">•</div>

              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                Reels Editing
              </div>
              <div class="dot sm:inline">•</div>

              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                Logo Animation
              </div>
              <div class="dot sm:inline">•</div>

              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                Podcast Edit
              </div>
              <div class="dot sm:inline">•</div>

              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                Content Repurposing
              </div>
              <div class="dot sm:inline">•</div>

              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                YT Shorts Edit
              </div>
              <div class="dot sm:inline">•</div>

              <div
                class="service transition transform hover:scale-105 hover:text-pink-400 duration-300"
              >
                Animated Text
              </div>
            </div>
          </div>

          <!-- Infinite App Logo Scroller -->
          <div class="overflow-hidden bg-black py-6 sm:py-8">
            <div class="relative w-full" data-scroll data-scroll-speed="1">
              <div class="flex gap-6 sm:gap-10 px-4 sm:px-10 animate-scroll">
                <!-- Logo Items -->

                <img
                  src="assets/dv.jpg"
                  alt="After Effects"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />
                <img
                  src="assets/picsart.jpg"
                  alt="Premiere Pro"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <img
                  src="assets/ae.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />
                <img
                  src="assets/canva.jpg"
                  alt="Canva"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full relative shine-effect"
                />

                <img
                  src="assets/filmora.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <img
                  src="assets/ps.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />

                <img
                  src="assets/dv.jpg"
                  alt="After Effects"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />
                <img
                  src="assets/picsart.jpg"
                  alt="Premiere Pro"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <img
                  src="assets/ae.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />
                <img
                  src="assets/canva.jpg"
                  alt="Canva"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full relative shine-effect"
                />

                <img
                  src="assets/filmora.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <img
                  src="assets/ps.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />

                <img
                  src="assets/dv.jpg"
                  alt="After Effects"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />
                <img
                  src="assets/picsart.jpg"
                  alt="Premiere Pro"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <img
                  src="assets/ae.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />
                <img
                  src="assets/canva.jpg"
                  alt="Canva"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full relative shine-effect"
                />

                <img
                  src="assets/filmora.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <img
                  src="assets/ps.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition"
                />

                <img
                  src="assets/filmora.jpg"
                  alt="Final Cut"
                  class="h-8 sm:h-10 opacity-80 hover:opacity-100 transition rounded-full"
                />
                <!-- Repeat as needed -->
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Swiper Coverflow Section -->
      <section class="py-20 overflow-hidden h-screen" data-scroll-section>
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
            class="swiper swiper-coverflow"
            data-scroll
            data-scroll-speed="2"
          >
            <div class="swiper-wrapper">
              <!-- Slide 1 - Replace with your actual videos -->
              <div class="swiper-slide group max-w-md">
                <a
                  href="https://youtube.com/shorts/xGVW3cVvMrA?si=BAskwR_QhAHUQNTs"
                  target="_blank"
                  class="custom-hover group block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl relative"
                >
                  <img
                    src="https://img.youtube.com/vi/xGVW3cVvMrA/hqdefault.jpg"
                    alt="Never Gonna Give You Up"
                    class="w-full h-80 object-cover"
                  />

                  <div
                    class="customize absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-10"
                  >
                    <span
                      class="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M19.615 3.184C20.403 3.4 21.1 4.1 21.318 4.89 21.66 6.144 21.66 12 21.66 12s0 5.856-.342 7.11c-.218.79-.915 1.49-1.703 1.706-1.2.323-6.615.323-6.615.323s-5.415 0-6.615-.323c-.788-.216-1.485-.916-1.703-1.706C2.34 17.856 2.34 12 2.34 12s0-5.856.342-7.11C2.9 4.1 3.597 3.4 4.385 3.184 5.585 2.861 12 2.861 12 2.861s6.415 0 7.615.323zM10 15.5l6-3.5-6-3.5v7z"
                        />
                      </svg>
                      View on Youtube
                    </span>
                  </div>

                  <div
                    class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                  >
                    <h5 class="text-xl font-bold text-white">
                      Creative Reel Edit
                    </h5>
                    <p class="text-blue-200 text-sm mt-1">Music Video</p>
                  </div>
                </a>
              </div>

              <!-- Slide 2 -->
              <div class="swiper-slide group max-w-md">
                <div
                  class="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img
                      src="./assets/Moonlight.webp"
                      alt="Video placeholder"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <div>
                      <h3 class="text-lg font-bold text-white">
                        Ad Commercial
                      </h3>
                      <p class="text-blue-300 text-sm">
                        Product • Sound Design
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide group max-w-md">
                <div
                  class="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img
                      src="./assets/Moonlight.webp"
                      alt="Video placeholder"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <div>
                      <h3 class="text-lg font-bold text-white">
                        Ad Commercial
                      </h3>
                      <p class="text-blue-300 text-sm">
                        Product • Sound Design
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Slide 3 -->
              <div class="swiper-slide group max-w-md">
                <div
                  class="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img
                      src="./assets/Moonlight.webp"
                      alt="Video placeholder"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <div>
                      <h3 class="text-lg font-bold text-white">
                        Cinematic Edit
                      </h3>
                      <p class="text-blue-300 text-sm">
                        Color Graded • Transitions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add more slides as needed -->
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

      <!-- contact -->
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
            class="text-4xl md:text-6xl font-bold text-white transform translate-y-10"
          >
            Contact Me
          </h2>
          <p class="text-sm text-white mb-12 transform translate-y-10 lg:py-5">
            Let's connect on social platforms!
          </p>

          <div
            class="flex flex-wrap justify-center gap-8 transform translate-y-10"
          >
            <!-- Instagram -->
            <a
              href="https://www.instagram.com/itsxoaman?igsh=MWJpeWp4bGk4OXRhdg=="
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
              href="https://wa.me/7666449601 "
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
              href=" https://www.linkedin.com/in/aman-gaud-807a9934a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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
              href="itsxoaman@gamil.com"
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
      </section>
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js"></script>
    <script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
    <!-- Add before closing </body> -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>



 <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="hover-overlay-dark">
                      <span class="hover-overlay-text">
                        <i class="fab fa-instagram mr-2 text-lg"></i>
                        View Reel
                      </span>
                    </div>
                  </div>

                  <!-- Title section -->
                  <div
                    class="hover-title absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                  >
                    <h5 class="caveat-font font-bold text-xl text-white">
                      Mausam
                    </h5>
                    <p class="text-sm text-gray-200 mt-1">Catchy reels edits</p>
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
                  class="hover-overlay-container block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300"
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
              <!-- slide 4 -->
              <div
                class="swiper-slide w-[100px] h-[300px] lg:w-[400px] lg:h-[430px] mx-auto"
              >
                <a
                  href="https://www.instagram.com/reel/DGdcCXPo0fZ/?igsh=MXZ2b2FjOTJxY2Rpcg=="
                  target="_blank"
                  class="block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300"
                >
                  <img
                    src="assets/event.png"
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
              <!-- slide 5 -->
              <div
                class="swiper-slide w-[100px] h-[300px] lg:w-[400px] lg:h-[430px] mx-auto"
              >
                <a
                  href="https://youtu.be/DyyOVRhAlpM?si=9r6QJJwOXf8pkKQZ"
                  target="_blank"
                  class="block w-full h-full rounded-2xl shadow-xl overflow-hidden group relative transition-all duration-300"
                >
                  <img
                    src="assets/cafe1947.jpg"
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