<template>
  <div>
    <b-row v-if="pemeriksaan.ttv">
      <b-col lg="6">
        <b-row>
          <b-col lg="12">
            <CardKeluhanAndDiagnosis
              title="Keluhan Utama"
              :value="pemeriksaan.ttv.keluhan_utama"
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
    <div
      v-else
      class="text-center mb-1"
    >
      Data TTV tidak di temukan, silahkan lakukan pemeriksaan TTV terlebih dahulu!
    </div>
  </div>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue'
import { mapState } from 'vuex'
import CardKeluhanAndDiagnosis from './CardKeluhanAndDiagnosis.vue'
import CardTtv from './CardTtv.vue'

export default {
  components: {
    CardKeluhanAndDiagnosis,
    BRow,
    BCol,
    CardTtv,
  },
  computed: {
    ...mapState('rekamMedis', ['pemeriksaan']),
  },
}
</script>
