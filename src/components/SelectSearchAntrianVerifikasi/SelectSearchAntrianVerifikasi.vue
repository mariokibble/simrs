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
      selected: 'nama',
      items: [
        { value: null, text: 'Pilih pencarian berdasarkan :' },
        { value: 'nama', text: 'Nama' },
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
