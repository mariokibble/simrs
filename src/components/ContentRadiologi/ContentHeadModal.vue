<template>
  <table>
    <tbody>
      <tr>
        <td class="pr-1">
          Nomor Order:
        </td>
        <td> 00001 </td>
      </tr>
      <tr>
        <td class="pr-1">
          Tanggal Order:
        </td>
        <td> <FormatDate :date="String(new Date())" /> </td>
      </tr>
      <tr>
        <td class="pr-1">
          Lokasi Pasien:
        </td>
        <td>{{ pemeriksaan.user.alamat_ktp }}</td>
      </tr>
      <tr>
        <td class="pr-1">
          Nama Dokter:
        </td>
        <td> {{ pemeriksaan.dokter.user.nama }} </td>
      </tr>
      <tr>
        <td class="pr-1">
          Diagnosis / Klinis:
        </td>
        <td> Diabetes </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import FormatDate from '@/components/FormatDate/FormatDate.vue'
import { mapState } from 'vuex'

export default {
  components: {
    FormatDate,
  },
  data() {
    return {
      isPrioritas: '0',
      priotitasOptions: [
        { text: 'Cito', value: '1' },
        { text: 'Non Cito', value: '0' },
      ],
    }
  },
  computed: {
    ...mapState('rekamMedis', ['pemeriksaan']),
  },
  watch: {
    isPrioritas(val) {
      this.$emit('setEntry', val)
    },
  },
  created() {
    this.$emit('setEntry', this.isPrioritas)
  },
}
</script>
