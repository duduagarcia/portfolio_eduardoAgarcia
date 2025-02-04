<script setup>
import { onMounted } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

function initMarqueeScrollDirection() {
  document.querySelectorAll('[data-marquee-scroll-direction-target]').forEach((marquee) => {
    // Query marquee elements
    const marqueeContent = marquee.querySelector('[data-marquee-collection-target]');
    const marqueeScroll = marquee.querySelector('[data-marquee-scroll-target]');
    if (!marqueeContent || !marqueeScroll) return;

    // Get data attributes
    const { marqueeSpeed: speed, marqueeDirection: direction, marqueeDuplicate: duplicate, marqueeScrollSpeed: scrollSpeed } = marquee.dataset;

    // Convert data attributes to usable types
    const marqueeSpeedAttr = parseFloat(speed);
    const marqueeDirectionAttr = direction === 'right' ? 1 : -1; // 1 for right, -1 for left
    const duplicateAmount = parseInt(duplicate || 0);
    const scrollSpeedAttr = parseFloat(scrollSpeed);
    const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;

    let marqueeSpeed = marqueeSpeedAttr * (marqueeContent.offsetWidth / window.innerWidth) * speedMultiplier;

    // Precompute styles for the scroll container
    marqueeScroll.style.marginLeft = `${scrollSpeedAttr * -1}%`;
    marqueeScroll.style.width = `${(scrollSpeedAttr * 2) + 100}%`;

    // Duplicate marquee content
    if (duplicateAmount > 0) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < duplicateAmount; i++) {
        fragment.appendChild(marqueeContent.cloneNode(true));
      }
      marqueeScroll.appendChild(fragment);
    }

    // GSAP animation for marquee content
    const marqueeItems = marquee.querySelectorAll('[data-marquee-collection-target]');
    const animation = $gsap.to(marqueeItems, {
      xPercent: -100, // Move completely out of view
      repeat: -1,
      duration: marqueeSpeed,
      ease: 'linear'
    }).totalProgress(0.5);

    // Initialize marquee in the correct direction
    $gsap.set(marqueeItems, { xPercent: marqueeDirectionAttr === 1 ? 100 : -100 });
    animation.timeScale(marqueeDirectionAttr); // Set correct direction
    animation.play(); // Start animation immediately

    // Set initial marquee status
    marquee.setAttribute('data-marquee-status', 'normal');

    // ScrollTrigger logic for direction inversion
    $ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const isInverted = self.direction === 1; // Scrolling down
        const currentDirection = isInverted ? -marqueeDirectionAttr : marqueeDirectionAttr;

        // Update animation direction and marquee status
        animation.timeScale(currentDirection);
        marquee.setAttribute('data-marquee-status', isInverted ? 'normal' : 'inverted');
      }
    });

    // Extra speed effect on scroll
    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: marquee,
        start: '0% 100%',
        end: '100% 0%',
        scrub: 0
      }
    });

    const scrollStart = marqueeDirectionAttr === -1 ? scrollSpeedAttr : -scrollSpeedAttr;
    const scrollEnd = -scrollStart;

    tl.fromTo(marqueeScroll, { x: `${scrollStart}vw` }, { x: `${scrollEnd}vw`, ease: 'none' });
  });
}

onMounted(() => {
  initMarqueeScrollDirection();
});
</script>

<template>
  <section class="section-resource">
    <!-- Based on font size -->
    <div data-marquee-duplicate="2" data-marquee-scroll-direction-target="" data-marquee-direction="left" data-marquee-status="normal" data-marquee-speed="15" data-marquee-scroll-speed="10" class="marquee-advanced">
      <div data-marquee-scroll-target="" class="marquee-advanced__scroll">
        <div data-marquee-collection-target="" class="marquee-advanced__collection">
          <div class="marquee-advanced__item">
            <p class="marquee__advanced__p"><slot/></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-resource {
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: hidden;
  padding: 100px;
}

.marquee-advanced {
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.marquee-advanced__scroll {
  will-change: transform;
  width: 100%;
  display: flex;
  position: relative;
}

.marquee-advanced__collection {
  will-change: transform;
  display: flex;
  position: relative;
}

.marquee-advanced__item {
  justify-content: flex-start;
  align-items: center;
  font-size: max(4em, 8vw);
  display: flex;
}

.marquee__advanced__p {
  white-space: nowrap;
  margin-bottom: 0;
  margin-right: 1em;
  font-size: 1em;
}

.marquee__advanced__arrow-svg {
  color: #ff4c24;
  width: 1em;
  margin-right: .25em;
  position: relative;
}

.marquee-advanced__item-width {
  background-color: #131313;
  border-radius: 1vw;
  justify-content: center;
  align-items: center;
  width: 18vw;
  height: 18vw;
  margin: 1vw;
  display: flex;
}

/* Optional: Rotating arrow left/right based on Scroll Direction */
.marquee__advanced__arrow-svg,
[data-marquee-direction="right"][data-marquee-status="inverted"] .marquee__advanced__arrow-svg {
  transition: 0.5s cubic-bezier(0.625, 0.05, 0, 1);
  transform: rotate(-180deg);
}

[data-marquee-status="inverted"] .marquee__advanced__arrow-svg,
[data-marquee-direction="right"][data-marquee-status="normal"] .marquee__advanced__arrow-svg {
  transform: rotate(-359.999deg);
}
</style>