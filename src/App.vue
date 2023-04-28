<template>
  <navigation-component />
  <div class="container"><router-view :key="$route.path" /></div>
</template>
<script>
import NavigationComponent from "@/components/NavigationComponent.vue";
export default {
  name: "App",
  components: {
    NavigationComponent,
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/main.css";
</style>
