<script setup>
import { onMounted } from "vue";

function initDetectScrollingDirection() {
  let lastScrollTop = 0;
  const threshold = 10; // Minimal scroll distance to switch to up/down
  const thresholdTop = 50; // Minimal scroll distance from top of window to start

  window.addEventListener("scroll", () => {
    const nowScrollTop = window.scrollY;
    if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
      // Update Scroll Direction
      const direction = nowScrollTop > lastScrollTop ? "down" : "up";
      document
        .querySelectorAll("[data-scrolling-direction]")
        .forEach((el) =>
          el.setAttribute("data-scrolling-direction", direction)
        );

      // Update Scroll Started
      const started = nowScrollTop > thresholdTop;
      document
        .querySelectorAll("[data-scrolling-started]")
        .forEach((el) =>
          el.setAttribute("data-scrolling-started", started ? "true" : "false")
        );

      lastScrollTop = nowScrollTop;
    }
  });
}

onMounted(() => {
  // initDetectScrollingDirection();
});
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#">Eduardo A.<br />Garcia</a>
      </div>
      <div class="actions">
        <button>teste</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  transition: transform 1s ease, padding 1s ease;
}

nav {
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--size-container) * 0.85);
  height: var(--header-height);
  /* background: var(--brand_light_gray); */
  position: fixed;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  /* align-items: end; */
  padding-top: 40px;

  pointer-events: none;
}

.logo {
  pointer-events: all;
}

.actions {
  background-color: green;
  pointer-events: all;
}

/* Move nav out of window when scrolling down */
[data-scrolling-started="true"][data-scrolling-direction="down"] header {
  transform: translateY(-100%);
}

@media screen and (max-width: 991px) {
  header {
    padding-left: var(--container-padding);
    padding-right: var(--container-padding);
    max-width: 100%;
  }
}
</style>
