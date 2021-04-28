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
    <ValidationProvider
      #default="{ errors }"
      name="Dokter Petugas Radiologi"
      rules="required"
    >
      <b-form-group
        label="Dokter Petugas Radiologi: "
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
        <small class="text-danger">{{ errors[0] }}</small>
      </b-form-group>
    </ValidationProvider>
  </div>
</template>

<script>
import { BFormGroup, BFormRadioGroup, BFormSelect } from 'bootstrap-vue'
import fetchApi from '@/api'
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    BFormGroup,
    BFormRadioGroup,
    BFormSelect,
    ValidationProvider,
  },
  data() {
    return {
      selectedDokter: null,
      dokterOptions: [
        { value: null, text: 'Pilih Dokter petugas Radiologi' },
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
        const { data } = await fetchApi.radiologi.gerAllDokterRadiologi()
        this.dokterOptions = [
          { value: null, text: 'Pilih Dokter petugas Radiologi' },
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
