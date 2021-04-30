<template>
  <div>
    <TableAntrianRadiologi
      :reload="reload"
      @detailIsianRadiologi="detailIsianRadiologi"
    />
  </div>
</template>
<script>
import TableAntrianRadiologi from "@/components/TableAntrianRadiologi/TableAntrianRadiologi.vue";
import fetchApi from "@/api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  name: "AntrianRadiologi",
  components: {
    TableAntrianRadiologi,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
    };
  },
  methods: {
    async detailIsianRadiologi({ id, kodeAntrian }) {
      try {
        const { value } = await this.$swal({
          title: "Mulai isian radiologi!",
          text: "apakah anda yakin untuk mengisi data hasil radiologi?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Iya!",
          cancelButtonText: "Tidak!",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ml-1",
          },
          buttonsStyling: false,
        });
        if (value) {
          const query = "rs_id=1";
          const { data } = await fetchApi.pemeriksaan.getRadiologiById(
            id,
            query
          );
          const encrypId = window.btoa(`${data.id}`);
          const payload = {
            id: data.id,
            status: data.status,
          };
          if (data.status === 0) {
            payload.status = 1;
          }
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Anda sedang memeriksa pasien dengan kode antrian ${!kodeAntrian ? '12345' : kodeAntrian}`,
              icon: "CheckIcon",
              variant: "success",
              setTimeout: "1000",
            },
          })
          this.$router.push(`/antrian-radiologi/${encrypId}?${query}`);
          await fetchApi.pemeriksaan.inputRadiologi(payload);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
