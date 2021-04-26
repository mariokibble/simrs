<template>
  <div>
    <div v-if="!fetching">
      <CardDataDiriLab
        :nama="formattedNama"
        :foto-profile="pemeriksaan.user.foto_profile"
        :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
        :asuransi="pemeriksaan.pemeriksaan.asuransi"
        :tanggal-appointment="pemeriksaan.nrm"
        :poliklinikTujuan="pemeriksaan.pemeriksaan.poli.nama"
      />
      <CardPemeriksaan
        :tanggal-pemeriksaan="pemeriksaan.pemeriksaan.tanggal_periksa"
        :tanggal-hasil="pemeriksaan.pemeriksaan.tanggal_periksa"
        :prioritas="pemeriksaan.is_prioritas"
      />
      <template>
        <b-card>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :group-options="{
              enabled: true,
            }"
          >
            <template slot="table-row" slot-scope="props" :items="rows">
              <span v-if="props.column.field === 'action'">
                <span>
                  <b-button
                    v-b-tooltip.hover.top="'Input Hasil Laboratorium'"
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    variant="flat-success"
                    class="btn-icon ml-2"
                  >
                    <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button
                    v-b-tooltip.hover.top="'Hapus'"
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    variant="flat-success"
                    class="btn-icon"
                  >
                    <feather-icon icon="TrashIcon" />
                  </b-button>
                </span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </b-card>
        <b-modal
      id="modal-antrian-rajal"
      ref="modalUpdateTtv"
      ok-variant="secondary"
      cancel-variant="danger"
      ok-title="Simpan"
      cancel-title="Batalkan"
      modal-class="modal-dark"
      centered
      title="Pemeriksaan TTV"
      class="p-0"
      @ok="submitForm"
    >
      <ValidationObserver
        ref="formTtvAwalRajal"
        tag="form"
      >
        <FormTtvAwalRajal />
      </ValidationObserver>
    </b-modal>
      </template>
    </div>
    <div v-else>
      loading ...
    </div>
  </div>
</template>

<script>
import CardDataDiriLab from "@/components/CardDetailLab/CardDataDiriLab.vue";
import CardPemeriksaan from "@/components/CardDetailRadiologi/CardPemeriksaan.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import addPrefixName from "@/utils/addPrefixName";
import { BCard, BDropdownItem, BDropdown, BTable, BButton, BModal } from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

// import FormatDate from "@/components/FormatDate/FormatDate.vue";
import fetchApi from "@/api";
const response = [
  {
    nama: "Thorax PA",
    hasil: "hasil",
    ekspertise: "satuan",
    satuan: "satuan",
  },
  {
    nama: "Thorax PA+Lateral",
    hasil: "hasil",
    ekspertise: "satuan",
    satuan: "satuan",
  },
  {
    nama: "Top Lordotik",
    hasil: "hasil",
    ekspertise: "satuan",
    satuan: "satuan",
  },
];

export default {
  components: {
    BCard,
    BTable,
    BButton,
    VueGoodTable,
    CardDataDiriLab,
    CardPemeriksaan,
    BDropdown,
    BDropdownItem,
    BModal,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      pemeriksaan: null,
      fetching: true,
      status: 0,
      columns: [
        {
          label: "Jenis Pemeriksaan",
          field: "nama",
          sortable: false,
        },
        {
          label: "Hasil",
          field: "hasil",
          sortable: false,

        },
        {
          label: "Ekspertise",
          field: "ekspertise",
          sortable: false,
        },
        {
          label: "Aksi",
          field: "action",
          sortable: false,
        },
      ],
      rows: [],
    };
  },
  computed: {
    radioId() {
      return this.$route.params.id;
      //   return window.atob(this.$route.params.id)
    },
    formattedNama() {
      const { user } = this.pemeriksaan;
      console.log(user, "<<<user");
      const prefixName = addPrefixName({
        jenisKelamin: user.jenis_kelamin,
        statusPernikahan: user.pernikahan,
        tanggalLahir: user.tanggal_lahir,
      });
      return `${prefixName} ${user.nama}`;
    },
    formattedStatus() {
      if (this.status === 0) {
        return "Terverifikasi";
      }
      if (this.status === 1) {
        return "Terverifikasi-catatan";
      }
      return "Ditolak";
    },
  },
  created() {
    this.detailIsianRadiologi(), this.loadTableDataAsync();
  },
  methods: {
    loadTableDataAsync() {
      this.rows = [
        {
          mode: "span",
          label: "X-Ray",
          children: response,
        },
      ];
    },
    detailIsianRadiologi() {
      fetchApi.pemeriksaan
        .getRadiologiById(this.radioId, "rs_id=1")
        .then(({ data }) => {
          this.pemeriksaan = data;
          this.fetching = false;
        })
        .catch((err) => console.log(err));
    },
    preSubmit(payload) {
      this.catatanTambahan = payload.catatan;
      this.status = payload.status;
      console.log(payload);
      this.$refs.modalVerifikasiPemeriksaan.show();
    },
    async submitForm() {
      try {
        await fetchApi.pemeriksaan.updatePemeriksaan({
          id: this.pemeriksaan.id,
          status: this.status === 2 ? 9 : 1,
          notes: this.catatanTambahan,
        });
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `Berhasil mengupdate status pemeriksaan menjadi ${this.formattedStatus}`,
            icon: "CheckIcon",
            variant: "success",
          },
        });
        this.back();
      } catch (err) {
        console.log(err);
        if (err.response.status === 422) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: err.response.data.message || err.response.data,
              icon: "BellIcon",
              variant: "danger",
              setTimeout: "5000",
            },
          });
          setTimeout(() => {
            this.btnDisabled = false;
          }, 3300);
        }
      }
    },
    back() {
      this.$router.push({ name: "antrian-radiologi" });
    },
    prioritasText() {
      const text = {
        0: "Non Cito",
        1: "Cito",
      };
      return (prioritas) => text[prioritas];
    },
  },
};
</script>
