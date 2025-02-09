<script setup lang="ts">
useSeoMeta({
  title: "Eduardo A. Garcia • Software Engineer",
  ogTitle: "Eduardo A. Garcia • Software Engineer",
  description:
    "A seasoned software engineer from Brazil who collaborates with people to make brands stand out in the digital era.",
  ogDescription:
    "A seasoned software engineer from Brazil who collaborates with people to make brands stand out in the digital era.",
  //   ogImage: 'https://example.com/image.png',
});

onMounted(() => {
  useSmoothScroll();
  // useConsoleName()
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
