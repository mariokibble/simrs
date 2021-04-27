<template>
  <table>
    <tbody>
      <tr>
        <td class="pr-1">
          Tanggal Pemeriksaan:
        </td>
        <td> <FormatDate :date="orderLab.waktu_pemeriksaan" /> </td>
      </tr>
      <tr>
        <td class="pr-1">
          Waktu Pemeriksaan:
        </td>
        <td>{{ getHours(orderLab.waktu_pemeriksaan) }}</td>
      </tr>
      <tr>
        <td class="pr-1">
          Nama:
        </td>
        <td>{{ orderLab.user.nama }}</td>
      </tr>
      <tr>
        <td class="pr-1">
          Tanggal Lahir:
        </td>
        <td> <FormatDate :date="orderLab.user.tanggal_lahir" /></td>
      </tr>
      <tr>
        <td class="pr-1">
          NRM:
        </td>
        <td> {{ orderLab.nrm }} </td>
      </tr>
      <tr>
        <td class="pr-1">
          Dokter Pengirim:
        </td>
        <td> {{ orderLab.dokter_pengirim.user.nama }} </td>
      </tr>
      <tr>
        <td class="pr-1">
          Dokter Patalogi Klinik:
        </td>
        <td>{{ orderLab.dokter_laboratorium.user.nama }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import FormatDate from '@/components/FormatDate/FormatDate.vue'
import { getHours } from '@/utils/getDate'

export default {
  components: {
    FormatDate,
  },
  props: {
    orderLab: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      getHours,
    }
  },
}
</script>
