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
      selected: null,
      items: [
        { value: null, text: 'Pilih status' },
        { value: 3, text: 'Belum diperiksa' },
        { value: 4, text: 'Sedang diperiksa' },
        { value: 5, text: 'Sudah diperiksa' },
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
