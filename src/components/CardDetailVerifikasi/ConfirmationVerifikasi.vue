<template>
  <b-card-text>
    <p>Nama: <b>{{ namaPasien }} </b> </p>
    <p>Tanggal Lahir: <b><FormatDate :date="tanggalLahir" /></b>  </p>
    <br>
    <p>Jaminan: <b>{{ jaminan }} </b> </p>
    <br>
    <p>Tanggal Appointment: <b><FormatDate :date="tanggalAppointment" /></b> </p>
    <p>Poliklinik Tujuan: <b> {{ poliklinik }}</b> </p>
    <p>Dokter: <b>{{ dokter }}</b> </p>
    <br>
    <p>Status: <b>{{ status }}</b> </p>
    <br>
    <p>  Catatan:</p>
    <ul>
      <li
        v-for="note in catatan"
        :key="note"
      >
        {{ note }}
      </li>
      <li v-if="status !== 1 && catatanCustom">
        {{ catatanCustom }}
      </li>
      <li v-if="catatan.length">
        Untuk penjelasan selanjutnya silahkan menghubungi Customer Service
      </li>
    </ul>
  </b-card-text>
</template>
<script>
import { BCardText } from 'bootstrap-vue'
import FormatDate from '@/components/FormatDate/FormatDate.vue'

export default {
  components: {
    BCardText,
    FormatDate,
  },
  props: {
    namaPasien: {
      type: String,
      default: '',
    },
    tanggalLahir: {
      type: String,
      default: '',
    },
    jaminan: {
      type: String,
      default: '',
    },
    tanggalAppointment: {
      type: String,
      default: '',
    },
    poliklinik: {
      type: String,
      default: '',
    },
    dokter: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    catatan: {
      type: Array,
      default() {
        return []
      },
    },
    catatanCustom: {
      type: String,
      default: '',
    },
  },
}
</script>
