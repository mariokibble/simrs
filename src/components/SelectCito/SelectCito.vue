<template>
  <b-form-select
    v-model="selected"
    :options="items"
  />
</template>
<script>
import { BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    BFormSelect,
  },
  data() {
    return {
      selected: '0',
      items: [
        { value: '0', text: 'Pilih prioritas' },
        { value: '0,1', text: 'Non Cito' },
        { value: '1', text: 'Cito' },
      ],
    }
  },
  watch: {
    selected(val) {
      this.$emit('selected', val)
    },
  },
  created() {
    this.$emit('selected', this.selected)
  },
}
</script>
