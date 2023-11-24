<script>
import NavBar from "./components/ui-elements/NavBar.vue";

export default {
  data() {
    return {
      //
    };
  },

  components: {
    NavBar,
  },
};
</script>

<template>
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
