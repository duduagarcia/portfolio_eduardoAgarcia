<script setup>
const { $gsap } = useNuxtApp();

function initMagneticEffect() {
  const magnets = document.querySelectorAll('[data-magnetic-strength]');
  if (window.innerWidth <= 991) return;

  // Mouse move
  function moveMagnet(event) {
    const magnet = event.currentTarget;
    const bounding = magnet.getBoundingClientRect();
    const strength = parseFloat(magnet.getAttribute('data-magnetic-strength')) || 25; // When no amount defined
    const innerTarget = magnet.querySelector('[data-magnetic-inner-target]');
    const innerStrength = parseFloat(magnet.getAttribute('data-magnetic-strength-inner')) || strength;

    const offsetX = ((event.clientX - bounding.left) / magnet.offsetWidth - 0.5) * (strength / 16);
    const offsetY = ((event.clientY - bounding.top) / magnet.offsetHeight - 0.5) * (strength / 16);

    // Outer animation
    $gsap.to(magnet, {
      x: offsetX + "em",
      y: offsetY + "em",
      rotate: "0.001deg",
      ease: "power4.out",
      duration: 1.6,
    });

    // Inner animation (only if innerTarget exists)
    if (innerTarget) {
      const innerOffsetX = ((event.clientX - bounding.left) / magnet.offsetWidth - 0.5) * (innerStrength / 16);
      const innerOffsetY = ((event.clientY - bounding.top) / magnet.offsetHeight - 0.5) * (innerStrength / 16);

      $gsap.to(innerTarget, {
        x: innerOffsetX + "em",
        y: innerOffsetY + "em",
        rotate: "0.001deg",
        ease: "power4.out",
        duration: 2,
      });
    }
  }

  // Mouse leave
  function resetMagnet(event) {
    const magnet = event.currentTarget;
    const innerTarget = magnet.querySelector('[data-magnetic-inner-target]');

    // Reset outer magnet
    $gsap.to(magnet, {
      x: "0em",
      y: "0em",
      ease: "elastic.out(1, 0.3)",
      duration: 1.6,
      clearProps: "all"
    });

    // Reset inner magnet (only if innerTarget exists)
    if (innerTarget) {
      $gsap.to(innerTarget, {
        x: "0em",
        y: "0em",
        ease: "elastic.out(1, 0.3)",
        duration: 2,
        clearProps: "all"
      });
    }
  }

  // Attach event listeners
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', moveMagnet);
    magnet.addEventListener('mouseleave', resetMagnet);
  });
}

onMounted(() => {
    initMagneticEffect();
})

</script>

<template>
    <div class="btn-magnetic">
        <a href="#" class="btn-magnetic__click" data-magnetic-strength="90" data-magnetic-strength-inner="25">
            <div class="btn-magnetic__fill"></div>
            <div data-magnetic-inner-target="" class="btn-magnetic__content">
                <div class="btn-magnetic__text">
                    <p class="btn-magnetic__text-p">About me</p>
                    <p class="btn-magnetic__text-p is--duplicate">About me</p>
                </div>
            </div>
        </a>
    </div>
</template>

<style scoped>
.btn-magnetic {
  font-size: 1em;
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 100%;
}

.btn-magnetic__click {
  cursor: pointer;
  border-radius: 4em;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  border-radius: 100%;

}

.btn-magnetic__fill {
background-color: var(--brand_black_hover);

  width: 100%;
  height: 100%;
  position: absolute;
}

.btn-magnetic__content {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: .75em 2em;
  display: flex;
  position: relative;
  /* background-color: green; */
}

.btn-magnetic__text {
  position: relative;
  overflow: hidden;
}

.btn-magnetic__text-p {
  text-align: center;
    color: var(--brand_white);
    font-size: 1.2rem;
  margin-bottom: 0;
  position: relative;
}

.btn-magnetic__text-p.is--duplicate {
  position: absolute;
  top: 100%;
}

/* Hover */
.btn-magnetic__click .btn-magnetic__text-p {
  transition: all 0.6s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translateY(0%) rotate(0.001deg);
}
.btn-magnetic__click:hover .btn-magnetic__text-p {
  transform: translateY(-100%) rotate(0.001deg);
}
</style>