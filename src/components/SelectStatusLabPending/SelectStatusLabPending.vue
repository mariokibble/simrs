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
      selected: '2',
      items: [
        { value: '2', text: 'Pending' },
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
