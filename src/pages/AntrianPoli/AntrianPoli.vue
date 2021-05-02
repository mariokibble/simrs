<template>
  <div>
    <TableAntrianPoli
      :reload="reload"
      @deletePemeriksaan="deleteConfirm"
      @goToRekamedis="goToRekamedis"
    />
  </div>
</template>
<script>

import TableAntrianPoli from '@/components/TableAntrianPoli/TableAntrianPoli.vue'
import fetchApi from '@/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    TableAntrianPoli,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
    }
  },
  methods: {
    async goToRekamedis({ id, kodeAntrian }) {
      try {
        const { value } = await this.$swal({
          title: 'Mulai Rekam medis?',
          text: 'apakah anda yakin ingin memulai Rekam medis?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Iya',
          cancelButtonText: 'Tidak',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        })
        if (value) {
          await fetchApi.pemeriksaan.mulaiPoli(id)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Status poli menjadi sedang di periksa pada pasien dengan kode antrian ${kodeAntrian}`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push(`/rekam-medis/${id}/pengkajian-awal?from=antrian-poliklinik`)
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteConfirm({ id, kodeAntrian }) {
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
        if (result.value) {
          return fetchApi.pemeriksaan.deletePemeriksaan(id)
        }
        return null
      }).then(res => {
        if (res && res.data) {
          this.reload = !this.reload
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Berhasil menghapus pemeriksaan dengan kode antrian ${kodeAntrian}`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        }
      })
    },
  },
}
</script>
