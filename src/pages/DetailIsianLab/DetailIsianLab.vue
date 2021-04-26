<template>
  <div>
    <div v-if="!fetching">
      <CardDataDiriLab
        :nama="formattedNama"
        :foto-profile="pemeriksaan.user.foto_profile"
        :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
        :asuransi="pemeriksaan.pemeriksaan.asuransi"
        :nrm="pemeriksaan.nrm"
        :tanggal-appointment="pemeriksaan.nrm"
        :poliklinikTujuan="pemeriksaan.pemeriksaan.poli.nama"
      />
      <CardPemeriksaan
        :tanggal-pemeriksaan="pemeriksaan.pemeriksaan.tanggal_periksa"
        :tanggal-hasil="pemeriksaan.pemeriksaan.tanggal_periksa"
        :prioritas="pemeriksaan.is_prioritas"
        :status="pemeriksaan.status"
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
            <template slot="table-row" slot-scope="props" :items="rows" >
              <span v-if="props.column.field === 'action'">
               <span>
                  <b-button
                    v-b-tooltip.hover.top="'Input Hasil Laboratorium'"
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    variant="flat-success"
                    class="btn-icon ml-3"
                  >
                    <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button
                    v-b-tooltip.hover.top="'Hapus'"
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    variant="flat-success"
                    class="btn-icon ml-1"
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
      </template>
    </div>
    <div v-else>
      loading ...
    </div>
  </div>
</template>

<script>
import CardDataDiriLab from "@/components/CardDetailLab/CardDataDiriLab.vue";
import CardPemeriksaan from "@/components/CardDetailLab/CardPemeriksaan.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import addPrefixName from "@/utils/addPrefixName";
import { BCard, BDropdownItem, BDropdown, BTable, BButton } from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

import fetchApi from "@/api";
const response = [
  {
    nama: "Hematologi rutin",
    hasil: null,
    isFlag: "",
    nilaiNormal: "00 - 100",
    satuan: "satuan",
  },
  {
    nama: "Hematologi rutin",
    hasil: null,
    isFlag: "",
    nilaiNormal: "00 - 100",
    satuan: "satuan",
  },
  {
    nama: "Hematologi rutin",
    hasil: null,
    isFlag: "",
    nilaiNormal: "00 - 100",
    satuan: "satuan",
  },
  {
    nama: "Hematologi rutin",
    hasil: null,
    isFlag: "",
    nilaiNormal: "00 - 100",
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
          label: "Flag",
          field: "isFlag",
          sortable: false,
        },
        {
          label: "Nilai Normal",
          field: "nilaiNormal",
          sortable: false,
        },
        {
          label: "Satuan",
          field: "satuan",
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
    labId() {
      console.info(this.$route.params.id);
      // return this.$route.params.id
      return window.atob(this.$route.params.id);
    },
    formattedNama() {
      const { user } = this.pemeriksaan;
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
    this.detailIsianLab();
    this.loadTableDataAsync();
  },
  mounted() {
    // this.initSortableGroups();
  },
  methods: {
    loadTableDataAsync(is_dragged) {
      this.rows = [
        {
          mode: "span", // span means this header will span all columns
          // label: "", // this is the label that'll be used for the header
          label: "Hematologi",
          children: is_dragged ? response_after_drag : response,
        },
      ];
    },
    onEdit(item) {
      if (item.isEditing) {
        item.isEditing = false;
      } else {
        this.$set(item, "isEditing", true);
      }
    },
    // initSortableGroups() {
    //   if (this.$refs.goods_table_ref) {
    //     const vgt_responsive_dom = this.$refs.goods_table_ref.$el.getElementsByClassName(
    //       "vgt-responsive"
    //     );
    //     const vgt_responsive_tbody_dom = vgt_responsive_dom[0].getElementsByTagName(
    //       "tbody"
    //     );
    //     const sortable_groups = Array.from(vgt_responsive_tbody_dom);

    //     this.rows.forEach((group, index) => {
    //       const drag_options = {
    //         delay: 400, // delay to drag start in milliseconds
    //         animation: 100,
    //         supportPointer: false,
    //         delayOnTouchOnly: true, // only delay on touch device (mobile, tablet, ipad)
    //         touchStartThreshold: 5,
    //         onEnd: this.onDragEnd,
    //       };

    //       sortablejs.create(sortable_groups[index], drag_options);
    //     });
    //   }
    // },
    onDragEnd(e) {
      this.loadTableDataAsync(true);
    },
    detailIsianLab() {
      fetchApi.pemeriksaan
        .getLabById(this.labId, "rs_id=1")
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
      this.$router.push({ name: "antrian-lab" });
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
