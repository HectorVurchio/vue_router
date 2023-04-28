<template>
  <div>
    <h1>Invoices</h1>
  </div>
</template>
<script>
import { onBeforeRouteLeave } from "vue-router";
export default {
  name: "InvoicesView",
  setup() {
    // eslint-disable-next-line
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        "Are you sure you want to leave? Invoices are super awsome!"
      );
      if (!answer) return false;
    });
  },
};
</script>
