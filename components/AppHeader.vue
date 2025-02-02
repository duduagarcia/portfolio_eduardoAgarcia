<script setup>
const { x,y } = useScroll()

console.log(y.value)

watch(y, (newY) => {
    console.log(`previous y ${y} - new y ${newY}`)
})
</script>

<template>
    <header>
        <div class="logo">
            <a href="#">Eduardo A.<br>Garcia</a>
        </div>
        <div class="actions">
            <button>teste</button>
        </div>
    </header>
</template>

<style scoped>
header{
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: calc(var(--size-container) * .85);
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

.logo{
    pointer-events: all;
}

.actions{
    background-color: green;
    pointer-events: all;
}


@media screen and (max-width: 991px) {
    header {
        padding-left: var(--container-padding);
        padding-right: var(--container-padding);
        max-width: 100%;
    }
}
</style>