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
      <b-card-sub-title class="mb-1">
        Terakhir update: {{ new Date() }}
      </b-card-sub-title>
      <b-card-text
        class="font-weight-bold mb-0"
      >
        <!-- Todo: cari referensi dulu, untuk menampilkan ttv pada pasien -->
        <div class="wrapper-card-ttv">
          <CardTtvItem
            key="Kesadaran"
            title="Kesadaran"
            :value="'CM'"
          />
          <CardTtvItem
            key="Tekanan Darah"
            title="Tekanan Darah"
            :value="'120/80 mmhg'"
          />
          <CardTtvItem
            key="Laju Nadi"
            title="Laju Nadi"
            :value="'x/menit'"
          />
          <CardTtvItem
            key="Laju Napas"
            title="Laju Napas"
            :value="'x/menit'"
          />
          <CardTtvItem
            key="Suhu Tubuh"
            title="Suhu Tubuh"
            :value="'36.5 °C'"
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
