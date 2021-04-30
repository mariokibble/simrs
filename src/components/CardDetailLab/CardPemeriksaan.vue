<template>
  <b-card>
    <b-row>
      <b-col
        lg="6"
        align-self="center"
      >
        <b-row>
          <b-col
            lg="5"
            align-self="center"
          >
            <div class="ml-2">
              <p class="mb-0 mt-0">
                Tanggal Pemeriksaan
              </p>
              <p class="mb-0 mt-0 ">
                Tanggal Hasil
              </p>
              <p class="mb-0 mt-0">
                Petugas Lab
              </p>
              <p class="mb-0 mt-0">
                Prioritas
              </p>
              <p class="mb-0 mt-0">
                Status
              </p>
              <p class="mb-3 mt-2">
                Dokter Patologi Klinik
              </p>
            </div>
          </b-col>
          <b-col
            lg="7"
            align-self="center"
          >
            <div>
              <p class="mb-0 mt-0">
                :
                <FormatDate :date="tanggalPemeriksaan" />
              </p>
              <p class="mb-0 mt-0">
                : <FormatDate :date="tanggalHasil" />
              </p>
              <p class="mb-0 mt-0">
                :  {{ $store.state.userLoggedIn.user && $store.state.userLoggedIn.user.nama ? $store.state.userLoggedIn.user.nama : '' }}
              </p>
              <p class="mb-0 mt-0">
                : {{ prioritasText(prioritas) }}
              </p>
              <p class="mb-2 mt-0">
                : {{ statusText(status) }}
              </p>
              <p class="mb-2 mt-0">
                <FormDokter
                  @selectedDokter="setEntry('selectedDokter', ...arguments)"
                />
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
  BCard, BRow, BCol,
} from 'bootstrap-vue'
import FormatDate from '@/components/FormatDate/FormatDate.vue'

import FormDokter from '@/components/FormDokter/FormDokter.vue'

export default {
  components: {
    BCard,
    BCol,
    BRow,
    FormatDate,
    FormDokter,
  },
  props: {
    tanggalPemeriksaan: {
      type: String,
      default: '',
    },
    tanggalHasil: {
      type: String,
      default: '',
    },
    dokter: {
      type: String,
      default: '',
    },
    petugas: {
      type: String,
      default: '',
    },
    prioritas: {
      type: [String, Number],
      default: '',
    },
    status: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      selectedDokter: null,
      dokterOptions: [
        { value: null, text: 'Pilih Dokter Patalogi Klinik' },
        { value: 184, text: 'dr Lab 1 RSUD KOTA BOGOR' },
      ],
    }
  },
  computed: {
    prioritasText() {
      const text = {
        0: 'Non Cito',
        1: 'Cito',
      }

      return prioritas => text[prioritas]
    },

    statusText() {
      const text = {
        0: 'Belum diproses',
        1: 'Sedang diproses',
        2: 'Pending',
        3: 'Selesai',
        9: 'Batal',
      }
      return status => text[status]
    },
  },
  watch: {
    selectedDokter(val) {
      this.$emit('selectedDokter', val)
    },
  },
  methods: {
    setEntry(key, value) {
      this[key] = value
    },
  },
}
</script>
