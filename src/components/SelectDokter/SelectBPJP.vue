<template>

  <b-form-select
    id="poli"
    v-model="selected"
    :options="items"
    :state="errors.length > 0 ? false:null"
    :disabled="isLoading"
  />

</template>
<script>
import fetchApi from '@/api/index'

import {
  BFormSelect,
} from 'bootstrap-vue'

export default {
  components: {
    BFormSelect,
  },
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: null,
      items: [
        { value: null, text: 'Pilih BPJP' },
      ],
      isLoading: false,
    }
  },
  watch: {
    selected(val) {
      this.$emit('selected', val)
    },
  },
  created() {
    this.isLoading = true
    fetchApi.pemeriksaan.getDokterByRsId(1)
      .then(({ data }) => {
        this.items = [
          { value: null, text: 'Pilih DPJP' },
          ...data.map(item => ({ value: item.id, text: item.user.nama })),
        ]
        this.isLoading = false
      })
      .catch(err => console.log(err))
  },
}
</script>
