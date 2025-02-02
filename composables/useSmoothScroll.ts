import Lenis from "lenis";

export const useSmoothScroll = () => {
    const lenis = new Lenis({
        autoRaf: true,
    });

    lenis.on('scroll', (e) => {
        console.log(e);
    });
}