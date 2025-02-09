import Lenis from "lenis";

export const useSmoothScroll = () => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on("scroll", (e) => {
    // console.log(e);
    $ScrollTrigger.update();
  });

  $gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  $gsap.ticker.lagSmoothing(0);
};
