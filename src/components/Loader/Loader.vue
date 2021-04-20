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
import { BSpinner } from 'bootstrap-vue'

export default {
  name: 'Loader',
  comments: {
    BSpinner,
  },
}
</script>
