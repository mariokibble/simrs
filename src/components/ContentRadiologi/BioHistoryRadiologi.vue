<template>
  <table>
    <tbody>
      <tr>
        <td class="pr-1">
          Tanggal Pemeriksaan:
        </td>
        <td> <FormatDate :date="orderRadiologi.waktu_pemeriksaan" /> </td>
      </tr>
      <tr>
        <td class="pr-1">
          Waktu Pemeriksaan:
        </td>
        <td>{{ getHours(orderRadiologi.waktu_pemeriksaan) }}</td>
      </tr>
      <tr>
        <td class="pr-1">
          Nama:
        </td>
        <td>{{ orderRadiologi.user.nama }}</td>
      </tr>
      <tr>
        <td class="pr-1">
          Tanggal Lahir:
        </td>
        <td> <FormatDate :date="orderRadiologi.user.tanggal_lahir" /></td>
      </tr>
      <tr>
        <td class="pr-1">
          NRM:
        </td>
        <td> {{ orderRadiologi.nrm }} </td>
      </tr>
      <tr>
        <td class="pr-1">
          Dokter Pengirim:
        </td>
        <td> {{ orderRadiologi.dokter_pengirim.user.nama }} </td>
      </tr>
      <tr>
        <td class="pr-1">
          Dokter Radiologi:
        </td>
        <td>{{ orderRadiologi.dokter_radiologi.user.nama }}</td>
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
    orderRadiologi: {
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
