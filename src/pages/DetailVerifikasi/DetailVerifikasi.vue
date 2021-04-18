<template>
  <section class="invoice-add-wrapper">
    <b-row>
      <b-col cols="12">
        <b-form @submit.prevent>
          <b-card no-body class="invoice-preview-card">
            <!-- Header -->
            <b-card-body class="invoice-padding pb-0">
              <div
                class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0"
              >
                <!-- Header: Left Content -->
                <div class=" mt-md-2 mt-2 mr-5 ml-5">
                  <b-avatar ref="previewEl" size="120px" rounded />
                </div>
                <!-- Header: Right Content -->
                <div class="mt-md-2 mt-2 mr-5 ml-5">
                  <div
                    class="d-flex align-items-center justify-content-md-end mb-1"
                  >
                    <h4 class="invoice-title">
                      DATA DIRI PASIEN
                    </h4>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="title">
                      Jaminan:
                      <span class="font-weight-bold">{{ asuransi }} </span>
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span v-if="this.tanggal_periksa" class="title">
                      Tanggal Appointment:
                      <br />
                      <FormatDate
                        class="font-weight-bold"
                        :date="this.tanggal_periksa"
                      />
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="title">
                      Poli Tujuan:
                      <span class="font-weight-bold">{{ poli }}</span>
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="title">
                      Dokter: <span class="font-weight-bold">{{ dokter }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </b-card-body>
            <!-- Spacer -->
            <hr class="invoice-spacing" />
            <b-card-body class="invoice-padding pt-0 ml-5 mr-5">
              <b-row>
                <b-col
                  v-for="(data, index) in solidColor"
                  :key="index"
                  md="12"
                  xl="12"
                >
                  <b-card
                    v-if="data.bg === 'primary'"
                    :border-variant="data.bg"
                    :title="data.title"
                    bg-variant="transparent"
                    class="shadow-none"
                  >
                    Nomor KTP :
                    <span v-if="!nomor_ktp" class="font-weight-bold mb-5">
                      {{ "User belum memasukan nomor ktp" }}
                    </span>
                    <span v-else-if="nomor_ktp" class="font-weight-bold mb-5">
                      {{ nomor_ktp }}
                    </span>
                    <b-img
                      center
                      :src="ktp"
                      alt="KTP"
                      height="220px"
                      width="220px"
                      class="mt-2"
                    />
                  </b-card>
                  <b-card
                    v-else-if="data.bg === 'secondary'"
                    :border-variant="data.bg"
                    :title="data.title"
                    bg-variant="transparent"
                    class="shadow-none"
                  >
                    Nomor BPJS:
                    <span v-if="!nomor_bpjs" class="font-weight-bold">
                      {{ "User belum memasukan nomor BPJS" }}
                    </span>
                    <span v-else-if="nomor_bpjs" class="font-wight-bold">
                      {{ nomor_bpjs }}
                    </span>
                    <b-img
                      center
                      :src="asuransi_file"
                      alt="Asuransi file"
                      height="220px"
                      width="220px"
                      class="mt-2"
                    />
                  </b-card>
                </b-col>
              </b-row>
            </b-card-body>
            <hr class="invoice-spacing" />
            <b-card-body class="invoice padding pb-0 ml-5 mr-5">
              <b-col v-for="(data, index) in reasons" v-bind:key="index">
                <b-form-group
                  :label="data.reason_title"
                  label-class="font-weight-bold"
                >
                  <b-form-checkbox-group
                    v-model="selected[data.reason_title]"
                    @input.native="selectDefault(data, $event)"
                    :options="data.options"
                    name="reasons[]"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-col>
              {{ selected }}
            </b-card-body>
            <div class="ml-5 mb-2">
              <b-button variant="danger" class="ml-1" @click.prevent="back()">
                Kembali
              </b-button>
            </div>
          </b-card>
        </b-form>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BCard,
  BCardText,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  Section,
  BCol,
  BRow,
  BAvatar,
  BFormCheckbox,
  BFormCheckboxGroup,
  BCardBody,
  BImg,
} from "bootstrap-vue";
import FormatDate from "@/components/FormatDate/FormatDate.vue";
import fetchApi from "@/api";
export default {
  components: {
    BCard,
    BCardText,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    Section,
    BCol,
    BRow,
    BAvatar,
    BFormCheckbox,
    BFormCheckboxGroup,
    BCardBody,
    FormatDate,
    BImg,
  },
  data() {
    return {
      nama: null,
      asuransi: null,
      tanggal_periksa: null,
      dokter: null,
      poli: null,
      btn: true,
      asuransi_file: null,
      ktp: null,
      nomor_bpjs: null,
      nomor_ktp: null,
      solidColor: [
        { bg: "primary", title: "Foto KTP" },
        { bg: "secondary", title: "Foto surat rujukan BPJS" },
        { bg: "danger", title: "Surat Pengantar" },
      ],
      reasons: [
        {
          reason_title: "Catatan",
          reason_default: "",
          options: [
            {
              text:
                "Foto KTP tidak jelas, harap membawa KTP asli saat datang ke RS",
              value: "foto_ktp_tidak_jelas",
            },
            {
              text:
                "Status kepersetaan BPJS bermasalah karena premi belum dibayar, harap datang ke bagian BPJS di RS untuk pengurusan masalah kepesertaan",
              value: "BPJS_bermasalah_karena_premi_belum_dibayar",
            },
            {
              text:
                "Surat rujukan sudah kadaluarsa, harap meminta surat rujukan yang sesuai di faskes tingkat 1 dan melakukan pendaftaran ulang",
              value: "Surat_rujukan_kadaluarsa",
            },
            {
              text:
                "Status kepesertaan asuransi bermasalah karena premi belum dibayar, harap melakukan konfirmasi ke asuransi untuk pengurusan masalah kepesertaan",
              value:
                "Status_kepersataan_asuransi_bermasalah_karena_belum_bayar",
            },
            {
              text:
                "Foto kartu asuransi tidak jelas, harap melakukan foto ulang dan melakukan pendaftaran ulang",
              value: "Foto_kartu_asuransi_tidak_jelas",
            },
            {
              text:
                "Untuk penjelasan selanjutnya silahkan menghubungi Customer Service",
              value: "penjalasan_lanjutan_hubungi_customer_service",
            },
          ],
        },
      ],
      selected: {},
    };
  },
  computed: {
    pasientId() {
      return window.atob(this.$route.params.id);
    },
  },
  mounted() {
    this.detailVeriksaPasien();
  },
  methods: {
    detailVeriksaPasien() {
      fetchApi.pemeriksaan
        .getPemeriksaanById(this.pasientId)
        .then(({ data }) => {
          this.asuransi = data.asuransi;
          this.tanggal_periksa = data.tanggal_periksa;
          this.poli = data.poli.nama;
          this.dokter = data.dokter.user.nama;
          this.asuransi_file = data.asuransi_file;
          this.ktp = data.user.foto_ktp;
          this.nomor_bpjs = data.user.nomor_bpjs;
          this.nomor_ktp = data.user.nik;
        });
    },
    selectDefault(data, event) {
      /*  Return if the checkbox was unchecked */
      if (!event.target.checked) return;
      /* Return if the selected value was the default */
      if (data.reason_default === event.target.value) return;

      /* Init the array if it doesn't exist yet.*/
      if (!this.selected[data.reason_title]) {
        this.$set(this.selected, data.reason_title, []);
      }

      const nestedSelected = this.selected[data.reason_title];
      /* Push in the default value if it doesn't exist alreayd */
      if (!nestedSelected.find((value) => value === data.reason_default)) {
        this.selected[data.reason_title].push(data.reason_default);
      }
    },
    back() {
      this.show = false;
      this.$router.push({ name: "antrian-verifikasi" });
    },
  },
};
</script>
