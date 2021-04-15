<template>
  <div>
    <TableKehadiran
      :reload="reload"
      @deletePemeriksaan="deleteConfirm"
    />
  </div>
</template>
<script>

import TableKehadiran from '@/components/TableKehadiran/TableKehadiran.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import fetchApi from '@/api'

export default {
  components: {
    TableKehadiran,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
    }
  },
  methods: {
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
