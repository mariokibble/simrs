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
      selected: 'nomor_rekam_medis',
      items: [
        { value: null, text: 'Pilih pencarian berdasarkan :' },
        { value: 'nama', text: 'Nama' },
        { value: 'kode_antrian', text: 'No antrian' },
        { value: 'nomor_rekam_medis', text: 'NRM' },
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
