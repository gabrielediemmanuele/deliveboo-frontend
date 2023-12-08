<script>
// import MyComponent from "./components/MyComponent.vue";
import NavBar from "../ui-elements/NavBar.vue";

export default {
  data() {
    return {};
  },

  components: { NavBar },
};
</script>

<template>
  <NavBar :isHomePage="true" />
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
      @media (max-width: 576px) {
        width: 50%;
      }

      @media (min-width: 577px) and (max-width: 768px) {
        width: 35%;
      }

      @media (min-width: 768px) and (max-width: 991px) {
        width: 35%;
      }

      @media (min-width: 992px) and (max-width: 1199px) {
        width: 35%;
      }

      @media (min-width: 1200px) and (max-width: 1400px) {
        width: 35%;
      }
      @media (min-width: 1401px) {
        width: 35%;
      }
    }
  }
  .message-cont {
    color: rgb(234, 94, 61);
    /* color: rgb(48, 169, 129); */
    font-weight: bolder;
    margin-bottom: 20px;
    @media (max-width: 567px) {
      font-size: 14px;
    }

    @media (max-width: 767) {
      font-size: 16px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 30px;
    }

    @media (min-width: 991px) and (max-width: 1200px) {
      font-size: 30px;
    }

    @media (min-width: 1200px) and (max-width: 1400px) {
      font-size: 30px;
    }
    @media (min-width: 1401px) {
      font-size: 35px;
    }
  }
}

.footer-container {
  margin: 0px;
}
</style>
