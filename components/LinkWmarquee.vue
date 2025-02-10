<script setup>
const { $gsap } = useNuxtApp();

const props = defineProps({
  user: {
    type: String,
    required: true,
  },
  app: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

function initMarquee() {
  const marquee = document.querySelector(`#${props.app}`);

  const marqueeContent = marquee.querySelector(
    "[data-marquee-collection-target]"
  );
  const marqueeScroll = marquee.querySelector("[data-marquee-scroll-target]");
  if (!marqueeContent || !marqueeScroll) return;

  const {
    marqueeSpeed: speed,
    marqueeDirection: direction,
    marqueeDuplicate: duplicate,
    marqueeScrollSpeed: scrollSpeed,
  } = marquee.dataset;

  const marqueeSpeedAttr = parseFloat(speed);
  const marqueeDirectionAttr = direction === "right" ? 1 : -1;
  const duplicateAmount = parseInt(duplicate || 0);
  const scrollSpeedAttr = parseFloat(scrollSpeed);
  const speedMultiplier =
    window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;

  let marqueeSpeed =
    marqueeSpeedAttr *
    (marqueeContent.offsetWidth / window.innerWidth) *
    speedMultiplier;

  marqueeScroll.style.marginLeft = `${scrollSpeedAttr * -1}%`;
  marqueeScroll.style.width = `${scrollSpeedAttr * 2 + 100}%`;

  if (duplicateAmount > 0) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < duplicateAmount; i++) {
      fragment.appendChild(marqueeContent.cloneNode(true));
    }
    marqueeScroll.appendChild(fragment);
  }

  const marqueeItems = marquee.querySelectorAll(
    "[data-marquee-collection-target]"
  );
  const animation = $gsap
    .to(marqueeItems, {
      xPercent: -100,
      repeat: -1,
      duration: marqueeSpeed,
      ease: "linear",
    })
    .totalProgress(0.5);

  $gsap.set(marqueeItems, {
    xPercent: marqueeDirectionAttr === 1 ? 100 : -100,
  });
  animation.timeScale(marqueeDirectionAttr);
  animation.play();

  marquee.setAttribute("data-marquee-status", "normal");
}

onMounted(() => {
  initMarquee();
});
</script>

<template>
  <a :href="props.link" rel="noopener noreferrer" target="_blank">
    <div class="container is--full link-wrapper">
      <h2 class="link-wrapper-p title container is--medium">{{ props.app }}</h2>
      <h2 class="link-wrapper-p is--duplicate">
        <div
          data-marquee-duplicate="10"
          data-marquee-scroll-direction-target=""
          data-marquee-direction="left"
          data-marquee-status="normal"
          data-marquee-speed="15"
          data-marquee-scroll-speed="10"
          class="marquee-advanced"
          :id="props.app"
        >
          <div data-marquee-scroll-target="" class="marquee-advanced__scroll">
            <div
              data-marquee-collection-target=""
              class="marquee-advanced__collection"
            >
              <div class="marquee-advanced__item">
                <h2 class="marquee__advanced__p">
                  <span class="user">@{{ props.user }}</span>
                  <span class="dot">*</span>
                  <span class="app">{{ props.app }}</span>
                  <span class="dot">*</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </h2>
    </div>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
}

.link-wrapper {
  position: relative;
  overflow: hidden;
  color: var(--brand_dark_gray);
  height: max-content;
}

.link-wrapper-p {
  margin-bottom: 0;
  position: relative;
  padding: 2.5rem 0;

  font-size: 1.75em;
  font-weight: 500;
  line-height: 1.15;
}

.link-wrapper-p.is--duplicate {
  width: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 100%;
  background: var(--brand_black_hover);
}

.dot {
  color: var(--brand_green);
  font-weight: 800;
  position: relative;
  top: 10px;
  margin: 0 20px;
}

.user {
  color: var(--brand_white);
}

.app {
  color: var(--brand_dark_gray);
}

/* Hover */
.link-wrapper .link-wrapper-p {
  transition: all 0.5s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translateY(0%) rotate(0.001deg);
}

.link-wrapper:hover .link-wrapper-p {
  transform: translateY(-100%) rotate(0.001deg);
}

.marquee-advanced {
  width: 100vw;
  position: relative;
  overflow: hidden;
  max-height: 130px;
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
  font-size: 20px;
  display: flex;
  width: max-content;
}

.marquee__advanced__p {
  white-space: nowrap;
  margin-bottom: 0;
  font-size: 1.75em;
  font-weight: 500;
  line-height: 1.15;
}

@media screen and (max-width: 767px) {
  .link-wrapper-p,
  .marquee__advanced__p {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.75em;
    font-weight: 500;
    line-height: 1.15;
  }
}
</style>
