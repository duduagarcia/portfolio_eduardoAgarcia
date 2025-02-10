<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
});

function initDirectionalButtonHover() {
  // Button hover animation
  document.querySelectorAll("[data-btn-hover]").forEach((button) => {
    button.addEventListener("mouseenter", handleHover);
    button.addEventListener("mouseleave", handleHover);
  });

  function handleHover(event) {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    // Get the button's dimensions and center
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const buttonCenterX = buttonRect.left + buttonWidth / 2;
    const buttonCenterY = buttonRect.top + buttonHeight / 2;

    // Calculate mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Offset from the top-left corner in percentage
    const offsetXFromLeft = ((mouseX - buttonRect.left) / buttonWidth) * 100;
    const offsetYFromTop = ((mouseY - buttonRect.top) / buttonHeight) * 100;

    // Offset from the center in percentage
    let offsetXFromCenter = ((mouseX - buttonCenterX) / (buttonWidth / 2)) * 50;

    // Convert to absolute values
    offsetXFromCenter = Math.abs(offsetXFromCenter);

    // Update position and size of .btn__circle
    const circle = button.querySelector(".btn__circle");
    if (circle) {
      circle.style.left = `${offsetXFromLeft.toFixed(1)}%`;
      circle.style.top = `${offsetYFromTop.toFixed(1)}%`;
      circle.style.width = `${115 + offsetXFromCenter.toFixed(1) * 2}%`;
    }
  }
}

onMounted(() => {
  initDirectionalButtonHover();
});
</script>

<template>
  <div class="btn-wrap">
    <a
      :href="props.link"
      data-theme="dark"
      data-btn-hover=""
      class="btn w-inline-block"
    >
      <div class="btn__bg"></div>
      <div class="btn__circle-wrap">
        <div class="btn__circle">
          <div class="before__100"></div>
        </div>
      </div>
      <div class="btn__text">
        <p class="btn-text-p"><slot /></p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.btn {
  cursor: pointer;
  border-radius: 1em;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: center;
  height: 3em;
  padding-left: 1.25em;
  padding-right: 1.25em;
  text-decoration: none;
  display: flex;
  position: relative;
}

.btn__text {
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
  transition: color 0.7s cubic-bezier(0.625, 0.05, 0, 1);
}

.btn-text-p {
  color: currentColor;
  white-space: nowrap;
  margin-bottom: 0;
  padding-bottom: 0.05em;
  font-size: 1em;
  font-weight: 500;
  line-height: 1.2;
}

.btn__bg {
  /* background-color: #08181b; */
  border: 1px solid var(--brand_light_gray);

  border-radius: 1.5em;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.btn__circle-wrap {
  border-radius: 1.5em;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.btn__circle {
  pointer-events: none;
  background-color: #d1fd88;
  border-radius: 50%;
  width: 100%;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: transform 0.7s cubic-bezier(0.625, 0.05, 0, 1),
    background-color 0.4s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translate(-50%, -50%) scale(0) rotate(0.001deg);
  background-color: #d1fd88;
}

.before__100 {
  padding-top: 100%;
  display: block;
}

.btn .btn__text {
  transition: color 0.7s cubic-bezier(0.625, 0.05, 0, 1);
}

.btn:hover .btn__circle {
  transform: translate(-50%, -50%) scale(1) rotate(0.001deg);
}

/* Dark */
.btn[data-theme="dark"] .btn__circle {
  background-color: var(--brand_black_hover);
}

.btn[data-theme="dark"]:hover .btn__text {
  color: var(--brand_white);
}

.btn[data-theme="dark"] .btn__text {
  color: var(--brand_black);
}
</style>
