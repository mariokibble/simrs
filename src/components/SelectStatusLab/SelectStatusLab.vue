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
        { value: 0, text: 'Belum diproses' },
        { value: 1, text: 'Sedang diproses' },
        { value: 3, text: 'Selesai' },
        { value: 9, text: 'Batal' },
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
