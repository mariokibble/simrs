<template>
  <b-card>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :group-options="{
        enabled: true
      }"
    />
  </b-card>
</template>
<script>
import { BCard } from 'bootstrap-vue'

export default {
  components: {
    BCard,
  },
}
</script>
