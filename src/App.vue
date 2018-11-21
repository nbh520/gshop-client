<!--  -->
<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>

</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import { reqAddress } from "./api";
import { mapActions } from "vuex";
export default {
  async mounted() {
    return new Promise((resolve, reject) => {
      this.$store.dispatch("getCurrentAddress").then(() => {
        this.$store.dispatch("getAddress");
        this.getUserInfo();
      });
    });
  },
  components: {
    FooterGuide
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>