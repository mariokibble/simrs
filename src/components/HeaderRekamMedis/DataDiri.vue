<template>
  <div>
    <b-row>
      <b-col lg="3">
        <CardDataDiri
          title="Nama (Usia)"
          :value="'Tn. Syahrul (21)'"
        />
      </b-col>
      <b-col lg="3">
        <CardDataDiri
          title="Tanggal Lahir"
          :value="'31 Juli 1995'"
        />
      </b-col>
      <b-col lg="2">
        <CardDataDiri
          title="NRM"
          :value="'1306376326'"
        />
      </b-col>
      <b-col lg="4">
        <CardDataDiri
          title="DPJP"
          :value="'dr. Febri Bahari, Sp.M'"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue'
import CardDataDiri from './CardDataDiri.vue'

export default {
  components: {
    CardDataDiri,
    BRow,
    BCol,
  },
}
</script>
