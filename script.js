function pageReveal() {
  const tl = gsap.timeline();
  tl.from("header", { y: -30, opacity: 0, duration: 0.6, ease: "power3.out" })
    .from("main", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
    .from("footer", { opacity: 0, duration: 0.5 }, "-=0.4");
}
barba.hooks.afterEnter(() => pageReveal());


barba.init({
  
  transitions: [{
    name: 'cinematic-preload',
    async leave(data) {
      const overlay = document.createElement('div');
      overlay.classList.add('transition-overlay');
      document.body.appendChild(overlay);


      await gsap.to(data.current.container, {
        opacity: 0.3,
        scale: 0.98,
        duration: 0.5,
        ease: "power3.inOut"
      });


      await gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });


      data.current.container.remove();
    },

    async enter(data) {
      const overlay = document.querySelector('.transition-overlay');


      gsap.set(data.next.container, {
        opacity: 0,
        filter: "blur(10px)",
        scale: 1.03
      });

      await new Promise(resolve => setTimeout(resolve, 200));

      await gsap.to(data.next.container, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });

      await gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut"
      });

      overlay.remove();
    }
  }]
});

barba.hooks.after((data) => {
  const spline = document.querySelector('.spline');
  if (!spline) return;

  if (data.next.namespace === 'home') {
    gsap.to(spline, { opacity: 1, duration: 0.6, ease: "power2.out" });
  } else {
    gsap.to(spline, { opacity: 0, duration: 0.6, ease: "power2.in" });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const spline = document.querySelector(".spline");

  gsap.set(spline, { opacity: 0, scale: 1.02, filter: "blur(10px)" });

  gsap.to(spline, {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: 4,
    ease: "power3.out"
  });
});

function animateHomeText() {
  const title = document.querySelector(".banner-content h1");
  const subtitle = document.querySelector(".banner-content p");

  if (title && subtitle) {
    gsap.set([title, subtitle], { opacity: 0, y: 30 });

    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6,
    });

    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 1,
    });
  }
}

window.addEventListener("load", () => {
  const container = document.querySelector("[data-barba-namespace='home']");
  if (container) animateHomeText();
});

barba.hooks.afterEnter((data) => {
  if (data.next.namespace === "home") {
    animateHomeText();
  }
});










