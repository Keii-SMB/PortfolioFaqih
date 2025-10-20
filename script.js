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
  const spline = document.querySelector('.spline-wrapper');
  if (!spline) return;

  if (data.next.namespace === 'home') {
    gsap.to(spline, { opacity: 1, duration: 0.5, pointerEvents: "auto" });
  } else {
    gsap.to(spline, { opacity: 0, duration: 0.5, pointerEvents: "none" });
  }
});
