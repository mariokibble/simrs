<template>
  <b-card
    no-body
    bg-variant="secondary"
    text-variant="white"
    style="height: 8rem; max-height: 8rem;"
  >
    <b-card-body class="text-center justify-content-center">
      <b-card-title
        v-if="title"
        class="title mb-1"
      >
        {{ title }}
      </b-card-title>
      <b-card-text
        v-if="value"
        class="font-weight-bold mb-0"
        style="font-size: 18px"
      >
        {{ value }}
      </b-card-text>
      <slot />
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard, BCardTitle, BCardBody, BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardBody,
    BCardText,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [Number, String],
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@variables';
    .title {
        color: $primary;
    }
</style>
