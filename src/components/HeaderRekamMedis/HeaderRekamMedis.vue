<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        lg="12"
      >
        <DataDiri />
      </b-col>
      <b-col
        cols="12"
        lg="12"
      >
        <KeluhanAndDiagnosisAndTtv />
      </b-col>
    </b-row>
  </div>

</template>
<script>
import DataDiri from '@/components/HeaderRekamMedis/DataDiri.vue'
import KeluhanAndDiagnosisAndTtv from '@/components/HeaderRekamMedis/KeluhanAndDiagnosisAndTtv.vue'
import { BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    DataDiri,
    BRow,
    BCol,
    KeluhanAndDiagnosisAndTtv,
  },
}
</script>
