<script>
import NavBar from "./components/ui-elements/NavBar.vue";
import FooterBar from "./components/ui-elements/FooterBar.vue";

export default {
  data() {
    return {
      //
    };
  },

  components: {
    NavBar,
    FooterBar,
  },
};
</script>

<template>
  <router-view></router-view>
  <FooterBar></FooterBar>
</template>

<style lang="scss">
body {
  padding-top: 87px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
