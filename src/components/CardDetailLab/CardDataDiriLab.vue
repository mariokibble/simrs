<template>
  <b-card>
    <b-row>
      <b-col lg="6">
        <b-row>
          <b-col
            lg="4"
            align-self="center"
          >
            <b-avatar
              size="140px"
              :src="fotoProfile"
            />
          </b-col>
          <b-col
            lg="8"
            align-self="center"
          >
            <h3>{{ nama }}</h3>
            <p> <FormatDate :date="tanggalLahir" /></p>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        lg="6"
        align-self="center"
      >
        <b-row>
          <b-col
            lg="5"
            align-self="center"
          >
            <div>
              <p class="mb-0 mt-0">
                Jaminan
              </p>
              <p class="mb-0 mt-0">
                NRM
              </p>
              <p class="mb-0 mt-0">
                Asal / Ruangan
              </p>
              <p class="mb-0 mt-0">
                Dokter Pengirim
              </p>
              <p class="mb-0 mt-0">
                Diagnosa Kerja
              </p>
            </div>
          </b-col>
          <b-col
            lg="7"
            align-self="center"
          >
            <div>
              <p class="mb-0 mt-0">
                : {{ asuransi }}
              </p>
              <p class="mb-0 mt-0">
                : {{ nrm }}
              </p>
              <p class="mb-0 mt-0">
                : Poli {{ poliklinikTujuan }}
              </p>
              <p class="mb-0 mt-0">
                :  {{ dokter }}
              </p>
              <p class="mb-0 mt-0">
                : belum mengetahui
              </p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import {
  BCard,
  BRow,
  BCol,
  BAvatar,
} from 'bootstrap-vue'
import FormatDate from '@/components/FormatDate/FormatDate.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
    FormatDate,
  },
  props: {
    nama: {
      type: String,
      default: '',
    },
    fotoProfile: {
      type: String,
      default: '',
    },
    tanggalLahir: {
      type: String,
      default: '',
    },
    asuransi: {
      type: String,
      default: '',
    },
    nrm: {
      type: String,
      default: '',
    },
    poliklinikTujuan: {
      type: String,
      default: '',
    },
    dokter: {
      type: String,
      default: '',
    },
    diagnosaKerja: {
      type: String,
      default: '',
    },
  },
}
</script>
