<template>
  <b-card>
    <b-row>
      <b-col lg="4">
        <div v-if="typeAsuransi === 'BPJS'">
          <p class="font-weight-bold title-custom">
            Nomor BPJS
          </p>
          <!-- <p class="font-weight-bold title-custom">
            Nomor Surat Rujukan BPJS
          </p> -->
          <p class="font-weight-bold title-custom">
            Foto Surat Rujukan BPJS
          </p>

        </div>
        <div v-else>
          <p class="font-weight-bold title-custom">
            Foto Kartu Asuransi:
          </p>
        </div>
      </b-col>
      <b-col lg="8">
        <div v-if="typeAsuransi === 'BPJS'">
          <p class="font-weight-bold title-custom">
            : {{ nomorBpjs }}
          </p>
          <!-- <p class="font-weight-bold title-custom">
            : {{ nomorSuratRujukanBpjs }}
          </p> -->
        </div>
      </b-col>
      <b-col>
        <b-img
          center
          thumbnail
          :src="uri"
          alt="KTP"
          height="220px"
          width="440px"
          class="mt-1 ml-2"
          @click="$emit('showModalImage', uri)"
        />
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import {
  BCard, BImg, BRow, BCol,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BImg,
    BRow,
    BCol,
  },
  props: {
    typeAsuransi: {
      type: String,
      default: 'BPJS',
    },
    nomorBpjs: {
      type: String,
      default: '-',
    },
    nomorSuratRujukanBpjs: {
      type: String,
      default: '-',
    },
    uri: {
      type: String,
      default: 'https://image.cermati.com/c_fill,fl_progressive,g_north_east,h_800,q_80,w_1200/txlkkfjf8jjez6azyedf.jpg',
    },
  },
}
</script>

<style scoped>
    .title-custom {
        font-size: 1.5rem;
    }
</style>
