<template>
  <div class="w-75">
    <b-form-group>
      <b-form-select
        v-model="selectedDokter"
        :options="dokterOptions"
      />
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormSelect,
  },
  data() {
    return {
      selectedDokter: null,
      dokterOptions: [
        { value: null, text: 'Pilih Dokter' },
        { value: 184, text: 'dr Lab 1 RSUD KOTA BOGOR' },
        { value: 185, text: 'dr Lab 2 RSUD KOTA BOGOR' },
      ],
    }
  },
  watch: {
    selectedDokter(val) {
      this.$emit('selectedDokter', val)
    },
  },
}
</script>
