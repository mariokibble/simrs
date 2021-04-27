<template>
  <b-card
    no-body
  >
    <b-card-body>
      <slot />
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard, BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
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
