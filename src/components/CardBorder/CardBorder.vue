<template>
  <b-card
    no-body
    border-variant="secondary"
    bg-variant="transparent"
    class="shadow-none"
  >
    <b-card-body
      class="p-25 m-0"
    >
      <slot />
    </b-card-body>
  </b-card>
</template>
<script>
import { BCard, BCardBody } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
  },
}
</script>
