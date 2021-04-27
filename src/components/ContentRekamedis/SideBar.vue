<template>
  <b-card
    no-body
    bg-variant="secondary"
    text-variant="white"
  >
    <b-card-body class="text-center justify-content-center">
      <b-card-title
        class="title mb-1"
      >
        Table of Contents
      </b-card-title>
      <div>
        <slot />
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard, BCardTitle, BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardBody,
  },
}
</script>

<style lang="scss" scoped>
@import '~@variables';
    .title {
        color: $primary;
    }
</style>
