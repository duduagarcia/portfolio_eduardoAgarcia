<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
  $gsap.to(".work_card", {
    y: "-200vh",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".h2_wrapper",
      start: "center center",
      end: "+=400%",
      pin: ".container_animation",
      scrub: true,
      markers: true,
    },
  });
});
</script>

<template>
  <section class="container_animation is--medium">
    <div class="h2_wrapper">
      <h2>Work</h2>
      <div class="work_card c1">
        <!-- <NuxtImg
          src="/mockup1.jpg"
          width="300"
          height="500"
          quality="100"
          format="webp"
          fit="cover"
        /> -->
      </div>
      <div class="work_card c2"></div>
      <div class="work_card c3"></div>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: calc(1rem + 15vw);
  text-transform: uppercase;
  position: relative;
  z-index: 100;
  pointer-events: none;
}

.h2_wrapper {
  position: relative;
}

.work_card {
  position: absolute;
  width: 300px;
  max-width: 300px;
  height: 500px;
  top: 100vh;
  cursor: pointer;
}

.c1 {
  background-color: red;
  right: 0;
  z-index: 10;
}

.c2 {
  background-color: greenyellow;
  left: 50%;
  transform: translateX(-50%, -50%);
  z-index: 10;
}

.c3 {
  background-color: blue;
  z-index: 110;
}
</style>
