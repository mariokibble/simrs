<template>
  <b-card-text>
    <p>Nama: {{ namaPasien }} </p>
    <p>Tanggal Lahir: <FormatDate :date="tanggalLahir" /> </p>
    <br>
    <p>Jaminan: {{ jaminan }} </p>
    <br>
    <p>Tanggal Appointment: <FormatDate :date="tanggalAppointment" /></p>
    <p>Poliklinik Tujuan: {{ poliklinik }} </p>
    <p>Dokter: {{ dokter }} </p>
    <br>
    <p>Status: {{ status }} </p>
    <br>
    <p> <b> Catatan: </b></p>
    <ul>
      <li
        v-for="note in catatan"
        :key="note"
      >
        {{ note }}
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
  },
}
</script>
