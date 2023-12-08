<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {};
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <div class="image-cont mt-4 d-flex flex-column align-items-center">
      <img src="../../../public/img/Risorsa 7.png" alt="" />
    </div>
    <div
      class="message-cont mt-4 d-flex flex-column align-items-center text-center"
    >
      Grazie per il tuo acquisto! <br />
      Non ti resta che attendere la consegna!
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  background-image: url(../../../public/img/pattern.png);
  background-position: right;
  background-repeat: repeat;
  background-size: cover;
  background-color: black;

  .image-cont {
    img {
      width: 35%;
    }
  }
  .message-cont {
    font-size: 30px;
    color: rgb(234, 94, 61);
    /* color: rgb(48, 169, 129); */
    font-weight: bolder;
    margin-bottom: 20px;
  }
}

.footer-container {
  margin: 0px;
}
</style>
