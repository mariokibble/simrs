<template>
  <b-card>
    <b-row>
      <b-col lg="6" align-self="center">
        <b-row>
          <b-col lg="5" align-self="center">
            <div class="ml-2">
              <p class="mb-0 mt-0">
                Tanggal Pemeriksaan
              </p>
              <p class="mb-0 mt-0 ">
                Tanggal Hasil
              </p>
              <p class="mb-0 mt-0">
                Dokter
              </p>
              <p class="mb-0 mt-0">
                Petugas
              </p>
              <p class="mb-0 mt-0">
                Prioritas
              </p>
              <p class="mb-0 mt-0">
                Status
              </p>
            </div>
          </b-col>
          <b-col lg="7" align-self="center">
            <div>
              <p class="mb-0 mt-0">
                :
                <FormatDate :date="tanggalPemeriksaan" />
              </p>
              <p class="mb-0 mt-0">: <FormatDate :date="tanggalHasil" /></p>
              <p class="mb-0 mt-0">: {{ dokter }}</p>
              <p class="mb-0 mt-0">: {{ petugas }}</p>
              <p class="mb-0 mt-0">: {{ prioritasText(prioritas) }}
              <p class="mb-0 mt-0">: {{ statusText(status) }}</p>
              </p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import { BCard, BRow, BCol } from "bootstrap-vue";
import FormatDate from "@/components/FormatDate/FormatDate.vue";

export default {
  components: {
    BCard,
    BCol,
    BRow,
    FormatDate,
  },
  props: {
    tanggalPemeriksaan: {
      type: String,
      default: "",
    },
    tanggalHasil: {
      type: String,
      default: "",
    },
    dokter: {
      type: String,
      default: "",
    },
    petugas: {
      type: String,
      default: "",
    },
    prioritas: {
      type: [String, Number] ,
      default: "",
    },
    status: {
      type: [String, Number],
      default: "",
    },
  }, 
  computed: {
    prioritasText() {
      const text = {
        0: "Non Cito",
        1: "Cito",
      };

      return (prioritas) => text[prioritas];
    },

    statusText() {
      const text = {
        0: "Belum diproses",
        1: "Sedang diproses",
        2: "Pending",
        3: "Selesai",
        9: "Batal",
      };
      return (status) => text[status];
    },
  },
};
</script>
