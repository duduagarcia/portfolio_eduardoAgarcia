<template>
  <footer class="container is--medium">
    <h2>Keep in touch</h2>
    <div class="btn_wrapper">
      <div class="col1">
        <p>Start a conversation</p>
        <button-directional-hover link="www.youtube.com">
          eduardo.agarcia117@gmail.com
        </button-directional-hover>
      </div>
      <div class="col2">
        <p>Or send me a message</p>
        <button-directional-hover link="www.youtube.com">
          +55 51 99670 0348
        </button-directional-hover>
      </div>
    </div>
    <div class="copyright">
      <p>© 2025. Eduardo Amengual Garcia. All rights reserved</p>
      <p>BRAZIL <span>[10:29]</span></p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: max-content;
}

.btn_wrapper {
  margin-top: 8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10rem;
}

.btn_wrapper p {
  color: var(--brand_dark_gray);
  margin-bottom: 18px;
}

.copyright {
  margin-top: 100px;
  padding: 40px 0;
  color: var(--brand_dark_gray);
  text-transform: uppercase;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

@media screen and (max-width: 767px) {
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 2.5em;
    font-weight: 500;
    line-height: 1.1;

    text-align: center;
  }

  .btn_wrapper {
    gap: 50px;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .btn_wrapper p {
    text-align: center;
  }

  .copyright {
    flex-direction: column-reverse;
    gap: 50px;
  }

  .copyright p {
    text-align: center;
  }
}
</style>
