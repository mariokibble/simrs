<template>
  <div>
    <b-row>
      <b-col lg="3">
        <!-- TODO: click go to profile pasien -->
        <CardDataDiri
          title="Nama (Usia)"
          :value="`${pemeriksaan.user.nama} (${getAge(pemeriksaan.user.tanggal_lahir)})`"
          style="cursor: pointer"
        />
      </b-col>
      <b-col lg="3">
        <CardDataDiri
          title="Tanggal Lahir"
          :value="formatTanggalLahir(pemeriksaan.user.tanggal_lahir)"
        />
      </b-col>
      <b-col lg="2">
        <CardDataDiri
          title="NRM"
          :value="pemeriksaan.nrm"
        />
      </b-col>
      <b-col lg="4">
        <CardDataDiri
          title="DPJP"
          :value="pemeriksaan.dokter.user.nama"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue'
import { mapState } from 'vuex'
import { getDateWithoutHours } from '@/utils/getDate'
import CardDataDiri from './CardDataDiri.vue'

export default {
  components: {
    CardDataDiri,
    BRow,
    BCol,
  },
  computed: {
    ...mapState('rekamMedis', ['pemeriksaan']),
    getAge() {
      return tanggalLahir => {
        const year = new Date().getFullYear() - new Date(tanggalLahir).getFullYear()
        return year
      }
    },
    formatTanggalLahir() {
      return tanggalLahir => getDateWithoutHours(tanggalLahir)
    },
  },
}
</script>
