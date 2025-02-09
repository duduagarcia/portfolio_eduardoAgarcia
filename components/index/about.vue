<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {

})
</script>

<template>
    <div class="container is--medium wrapper">
        <div class="col1">
            <div class="image_container">
                <div class="image_wrapper">
                    <img src="~/assets/img/profile_pic_full.webp" alt="">
                </div>
            </div>
        </div>
        <div class="col2">
            <div class="text_wrapper">
                <h2>Not just an usual developer</h2>
                <br>
                <br>
                <p>I’m rarely satisfied with my own work, but that ends up being what sets me apart. I always belived that success isn’t measured by "does it work?" but rather "is it a joy to use?</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.wrapper{
    min-height: 100vh;
    display: flex;
    gap: 200px;
}

.col1{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.col1 .image_container{

}

.col1 .image_container .image_wrapper{
    max-width: 700px;
    width: 100%;
    height: 100%;
    min-height: 500px;
    background: tan;
}

.col1 .image_container .image_wrapper img{
    width: 100%;
    filter: grayscale(100%);

    /* display: none; */
}

.col2{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.col2 .text_wrapper h2{
    margin-top: 0;
    margin-bottom: 0;
    font-size: 2.5em;
    font-weight: 500;
    line-height: 1.1;
    max-width: 500px;
}

.col2 .text_wrapper p{
    max-width: 500px;
    color: var(--brand_dark_gray);
}

@media screen and (max-width: 1200px){
    .wrapper{
        gap: 100px;
    }
}

@media screen and (max-width: 767px) {
    .wrapper{
        flex-direction: column-reverse;
        gap: 40px;
        min-height: max-content;
        padding-bottom: 100px;
        padding-top: 100px;
    }
}

@media screen and (min-width: 590px) and (max-width: 767px){
    .col2{
    }
    
    .col2 .text_wrapper h2{
        max-width: 100%;
    }

    .col2 .text_wrapper p{
        max-width: 100%;
    }
}
</style>