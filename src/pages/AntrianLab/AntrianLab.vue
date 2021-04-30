<template>
  <div>
    <TableAntrianLab
      :reload="reload"
      @detailIsianLab="detailIsianLab"
    />
  </div>
</template>
<script>
import TableAntrianLab from '@/components/TableAntrianLab/TableAntrianLab.vue'
import fetchApi from '@/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'AntrianLab',
  components: {
    TableAntrianLab,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
    }
  },
  methods: {
    async detailIsianLab({ id, kodeAntrian }) {
      try {
        const { value } = await this.$swal({
          title: 'Mulai isian lab!',
          text: 'apakah anda yakin untuk mengisi data hasil lab?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Iya!',
          cancelButtonText: 'Tidak!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        })
        if (value) {
          const query = 'rs_id=1'
          const { data } = await fetchApi.pemeriksaan.getLabById(id, query)
          const encrypId = window.btoa(`${data.id}`)
          const payload = {
            id: data.id,
            status: data.status,
          }
          if (data.status === 0) {
            payload.status = 1
          }
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Anda sedang memeriksa pasien dengan kode antrian ${kodeAntrian}`,
              icon: 'CheckIcon',
              variant: 'success',
              setTimeout: '1000',
            },
          })
          this.$router.push(`/antrian-lab/${encrypId}?${query}`)
          await fetchApi.pemeriksaan.inputLab(payload)
        }
      } catch (err) {
        console.log(err)
      }
    },
    deleteConfirm({ kodeAntrian }) {
      this.$swal({
        title: 'Hapus pemeriksaan!',
        text: `Apakah kamu yakin, akan menghapus pemeriksaan dengan kode antrian ${kodeAntrian}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iya, hapus sekarang!',
        cancelButtonText: 'Tidak, batalkan',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        console.log(result)
      })
    },
  },
}
</script>
