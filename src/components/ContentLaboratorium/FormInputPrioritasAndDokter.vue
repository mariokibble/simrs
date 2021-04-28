<template>
  <div>
    <b-form-group
      v-slot="{ ariaDescribedby }"
      label="Proritas: "
      label-cols-lg="2"
    >
      <b-form-radio-group
        v-model="isPrioritas"
        :options="priotitasOptions"
        :aria-describedby="ariaDescribedby"
        name="isPrioritas"
        class="mt-25 pt-25"
      />
    </b-form-group>
    <b-form-group
      label="Dokter Patalogi Klinik: "
      label-cols-lg="2"
    >
      <div v-if="fetchingDokterLab === 'pending'">
        loading ...
      </div>
      <b-form-select
        v-else-if="fetchingDokterLab === 'resolved'"
        v-model="selectedDokter"
        :options="dokterOptions"
      />
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormRadioGroup, BFormSelect } from 'bootstrap-vue'
import fetchApi from '@/api'

export default {
  components: {
    BFormGroup,
    BFormRadioGroup,
    BFormSelect,
  },
  data() {
    return {
      selectedDokter: null,
      dokterOptions: [
        { value: null, text: 'Pilih Dokter Patalogi Klinik' },
        { value: 184, text: 'dr Lab 1 RSUD KOTA BOGOR' },
      ],
      isPrioritas: '0',
      priotitasOptions: [
        { text: 'Cito', value: '1' },
        { text: 'Non Cito', value: '0' },
      ],
      fetchingDokterLab: 'idle',
    }
  },
  watch: {
    isPrioritas(val) {
      this.$emit('isPrioritas', val)
    },
    selectedDokter(val) {
      this.$emit('selectedDokter', val)
    },
  },
  async created() {
    this.$emit('isPrioritas', this.isPrioritas)
    await this.fetchDokterLab()
  },
  methods: {
    async fetchDokterLab() {
      try {
        this.fetchingDokterLab = 'pending'
        const { data } = await fetchApi.laboratorium.gerAllDokterLab()
        this.dokterOptions = [
          { value: null, text: 'Pilih Dokter Patalogi Klinik' },
          ...data.map(dokter => ({ value: dokter.id, text: dokter.user.nama })),
        ]
        this.fetchingDokterLab = 'resolved'
      } catch (error) {
        console.log(error)
        this.fetchingDokterLab = 'rejected'
      }
    },
  },
}
</script>
