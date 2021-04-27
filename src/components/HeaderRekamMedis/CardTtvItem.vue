<template>
  <div
    class="card-ttv-item mr-1"
  >
    <p class="card-text mb-25 text-secondary">
      {{ title }}
    </p>
    <h6
      class="mb-0"
      style="font-size: 18px"
    >
      {{ value }}
    </h6>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
    .card-ttv-item {
      padding: 0.5rem;
      margin-bottom: 0.7rem;
      text-align: center;
      background-color: #f8f8f8;
      border-radius: 0.357rem;
      min-width: 6.4rem;
    }
</style>
