<template>
  <div>
    <b-row>
      <b-col lg="6">
        <b-row>
          <b-col lg="12">
            <CardKeluhanAndDiagnosis
              title="Keluhan Utama"
              :value="'Muntah Berdarah Sejak 2 hari yang lalu'"
            />
          </b-col>
          <b-col lg="12">
            <CardKeluhanAndDiagnosis
              title="Diagnosis Primer dan Sekunder"
              :value="'Esophageal Varices with Bleeding (I85.01)'"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col
        lg="6"
        style="max-height: 18rem;"
      >
        <CardTtv />
      </b-col>

    </b-row>
  </div>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue'
import CardKeluhanAndDiagnosis from './CardKeluhanAndDiagnosis.vue'
import CardTtv from './CardTtv.vue'

export default {
  components: {
    CardKeluhanAndDiagnosis,
    BRow,
    BCol,
    CardTtv,
  },
}
</script>
