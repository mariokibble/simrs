<template>
  <div>
    <TableAntrianLab
      :reload="reload"
      @deletePemeriksaan="deleteConfirm"
      @detailIsianLab="detailIsianLab"
    />
  </div>
</template>
<script>
import TableAntrianLab from "@/components/TableAntrianLab/TableAntrianLab.vue";
import fetchApi from "@/api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  name: "AntrianLab",
  components: {
    TableAntrianLab,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
      id: "",
    };
  },
  methods: {
    async detailIsianLab({ id }) {
      fetchApi.pemeriksaan
        .getLabById(id)
        .then((res) => {
          console.log(res, "<<res");
          const encrypId = window.btoa(`${res.data.id}`)
          this.$router.push(`/antrian-lab/${encrypId}`)
        })
        .catch((err) => {
          console.info(err.message);
        });
    },
    deleteConfirm({ id, kodeAntrian }) {
      this.$swal({
        title: "Hapus antrian laboratorium!",
        text: `Apakah kamu yakin, akan menghapus data antrian laboratorium dengan kode antrian ${kodeAntrian} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya, hapus sekarang!",
        cancelButtonText: "Tidak, batalkan",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      })
        .then((result) => {
          if (result.value) {
            return fetchApi.pemeriksaan.deletePemeriksaan(id);
          }
          return null;
        })
        .then((res) => {
          if (res && res.data) {
            this.reload = !this.reload;
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `Berhasil menghapus data pemeriksaan`,
                icon: "CheckIcon",
                variant: "success",
              },
            });
          }
        });
    },
  },
};
</script>
