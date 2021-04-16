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
        { value: null, text: 'Pilih status kehadiran' },
        { value: 1, text: 'Belum hadir' },
        { value: 2, text: 'Sudah hadir' },
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
