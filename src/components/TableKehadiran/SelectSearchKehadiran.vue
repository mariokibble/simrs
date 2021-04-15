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
        { value: null, text: 'Pilih pencarian berdasarkan :' },
        { value: 'nama', text: 'Nama' },
        { value: 'kode_antrian', text: 'Kode antrian' },
      ],
    }
  },
  watch: {
    selected(val) {
      this.$emit('selected', val)
    },
  },
}
</script>
