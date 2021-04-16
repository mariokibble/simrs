<template>
  <b-form-select
    v-model="selected"
    :options="items"
  />
</template>
<script>
import { BFormSelect } from 'bootstrap-vue'
import { getDateWithoutHours } from '@/utils/getDate'

export default {
  components: {
    BFormSelect,
  },
  data() {
    return {
      selected: getDateWithoutHours(),
      items: [
        { value: null, text: 'Pilih tanggal appointment' },
        { value: getDateWithoutHours(), text: 'Hari ini' },
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
