<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
    const textElements = $gsap.utils.toArray('.text');
    textElements.forEach(text => {
      $gsap.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'center 80%',
          end: 'center 50%',
          scrub: true,
        //   markers: true
        },
      });
    });
})
</script>

<template>
    <div class="container is--medium">
        <h2>
            <span class="text">I am a problem solver</span>
            <span class="text">driven by research,</span>
            <span class="text">passionate about studying</span>
            <span class="text">focused on creating</span>
            <span class="text">out-of-the-box solutions</span>
            <span class="text">that blend creativity and motion.</span>
        </h2>
    </div>
</template>

<style scoped>
div{
    height: max-content;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 200px 0;
}

h2{
    margin-top: 0;
    margin-bottom: 0;
    font-size: 3.5em;
    font-weight: 500;
    line-height: 1.5;
}

h2 span{
    display: block;
}

.text{
    color: rgb(182, 182, 182, 0.2);
    background: linear-gradient(to right, #020202, #000000) no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 0%;
    transition: background-size cubic-bezier(.1,.5,.5,1) 0.5s;
}
</style>