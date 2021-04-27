<template>
  <b-card
    no-body
    bg-variant="secondary"
    text-variant="white"
    style="height: 100%;"
  >
    <b-card-body>
      <b-card-title
        class="title mb-1"
      >
        Tanda-tanda Vital
      </b-card-title>
      <b-card-sub-title
        class="mb-1"
        style="font-size: 15px"
      >
        Terakhir update: {{ formattedPemeriksaanUpdatedAt }}
      </b-card-sub-title>
      <b-card-text
        class="font-weight-bold mb-0"
      >
        <!-- Todo: cari referensi dulu, untuk menampilkan ttv pada pasien -->
        <div class="wrapper-card-ttv">
          <CardTtvItem
            key="Kesadaran"
            title="Kesadaran"
            :value="pemeriksaan.ttv.kesadaran || '0'"
          />
          <CardTtvItem
            key="Tekanan Darah"
            title="Tekanan Darah"
            :value="`${pemeriksaan.ttv.tekanan_darah} mmhg`"
          />
          <CardTtvItem
            key="Laju Nadi"
            title="Laju Nadi"
            :value="`${pemeriksaan.ttv.nadi} x/menit`"
          />
          <CardTtvItem
            key="Laju Napas"
            title="Laju Napas"
            :value="`${pemeriksaan.ttv.pernapasan} x/menit`"
          />
          <CardTtvItem
            key="Suhu Tubuh"
            title="Suhu Tubuh"
            :value="`${pemeriksaan.ttv.suhu}  °C`"
          />
          <CardTtvItem
            key="EWS"
            title="EWS"
            :value="'3'"
          />
        </div>
      </b-card-text>
      <slot />
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard, BCardTitle, BCardBody, BCardText, BCardSubTitle,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import getDate from '@/utils/getDate'

import CardTtvItem from './CardTtvItem.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardBody,
    BCardText,
    CardTtvItem,
    BCardSubTitle,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('rekamMedis', ['pemeriksaan']),
    formattedPemeriksaanUpdatedAt() {
      return getDate(this.pemeriksaan.ttv.updated_at)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@variables';
    .title {
        color: $primary;
    }
    .wrapper-card-ttv {
      display: flex;
      align-items: end;
      flex-wrap: wrap;
    }
</style>
