<script setup>
import { onMounted } from 'vue';
const { $gsap, $ScrollTrigger } = useNuxtApp();

function initMarqueeScrollDirection() {
  document.querySelectorAll('[data-marquee-scroll-direction-targett]').forEach((marquee) => {
    // Query marquee elements
    const marqueeContent = marquee.querySelector('[data-marquee-collection-targett]');
    const marqueeScroll = marquee.querySelector('[data-marquee-scroll-targett]');
    if (!marqueeContent || !marqueeScroll) return;

    // Get data attributes
    const { marqueeSpeedd: speed, marqueeDirectionn: direction, marqueeDuplicatee: duplicate, marqueeScrollSpeedd: scrollSpeed } = marquee.dataset;

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
    const marqueeItems = marquee.querySelectorAll('[data-marquee-collection-targett]');
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
    marquee.setAttribute('data-marquee-statuss', 'normal');

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
        marquee.setAttribute('data-marquee-statuss', isInverted ? 'normal' : 'inverted');
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
    <div data-marquee-duplicatee="2" data-marquee-scroll-direction-targett="" data-marquee-directionn="left" data-marquee-statuss="normal" data-marquee-speedd="15" data-marquee-scroll-speedd="10" class="marquee-advanced">
      <div data-marquee-scroll-targett="" class="marquee-advanced__scroll">
        <div data-marquee-collection-targett="" class="marquee-advanced__collection">
          <div class="marquee-advanced__item">
            <p class="marquee__advanced__p">
              <slot/> 
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 125 95" fill="none" class="marquee__advanced__arrow-svg">
                <path d="M73.6748 89.7824L116.207 47.2501L73.6748 4.71783" stroke="currentColor" stroke-width="12.1521" stroke-miterlimit="10"></path>
                <path d="M116.207 47.25L0.762451 47.25" stroke="currentColor" stroke-width="12.1521" stroke-miterlimit="10"></path>
            </svg>
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
  font-size: 1em;
}

.marquee__advanced__arrow-svg {
  color: var(--brand_green);
  width: 1em;
  margin-right: .25em;
  margin-left: .25em;
  position: relative;
}
</style>