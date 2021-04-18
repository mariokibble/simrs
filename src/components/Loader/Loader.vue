<template>
  <div>
    <b-spinner
      style="width: 3rem; height: 3rem;"
      class="mr-1"
      label="Large Spinner"
    />
  </div>
</template>

<script>
import { BSpinner } from "bootstrap-vue";
export default {
  comments: {
    BSpinner,
  },
  name: "loader",
  props: ["visible"]
};
</script>
