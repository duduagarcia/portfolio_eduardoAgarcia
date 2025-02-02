<template>
    <main class="container is--medium">
        <div class="row1">
            <h1>A seasoned software engineer from Brazil who collaborates with people to make brands stand out in the digital era. </h1>
        </div>
        <div class="row2">
            <indexAbstractWaveAnimated/>
        </div>
            <div class="row3">
                <p>Scroll down to discover</p>
            </div>
    </main>
</template>

<style scoped>
main{
    /* background-color: antiquewhite; */
    height: 100vh;
    max-height: 100vh !important;

    display: flex;
    flex-direction: column;
}

h1{
    font-weight: 500;
    line-height: 1.15;
    max-width: 600px;

    font-size: 32px;
}

.row1{
    padding-top: 30px;
    margin-bottom: 30px;
    padding-left: 200px;
}

.row2{
    flex-grow: 3;
}

.row3{
    padding: calc(var(--gap) * .5) 0;
}

@media screen and (max-width: 991px) {
    .row1 {
        padding-left: 0;
        padding-top: calc(var(--header-height) + (var(--gap) * .4));
        /* background: grey; */
    }

    h1{
        font-size: 1.75em;
        /* max-width: none; */
    }
}
</style>