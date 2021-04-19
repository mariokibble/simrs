<template>
  <div>
    <TableAntrianVerifikasi
      :reload="reload"
      @deleteVerifikasi="deleteConfirm"
      @detailVerifikasi="detailVerifikasi"
    />
  </div>
</template>
<script>
import TableAntrianVerifikasi from '@/components/TableAntrianVerifikasi/TableAntrianVerifikasi.vue'
import fetchApi from '@/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'AntrianVerifikasi',
  components: {
    TableAntrianVerifikasi,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
      id: '',
    }
  },
  methods: {
    async detailVerifikasi({ id }) {
      fetchApi.pemeriksaan
        .getPemeriksaanById(id)
        .then(res => {
          const encrypId = window.btoa(`${res.data.id}`)
          this.$router.push(`/antrian-verifikasi/${encrypId}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteConfirm({ id }) {
      this.$swal({
        title: 'Hapus verifikasi!',
        text: 'Apakah kamu yakin, akan menghapus verifikasi ini ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iya, hapus sekarang!',
        cancelButtonText: 'Tidak, batalkan',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
        .then(result => {
          if (result.value) {
            return fetchApi.pemeriksaan.deletePemeriksaan(id)
          }
          return null
        })
        .then(res => {
          if (res && res.data) {
            this.reload = !this.reload
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Berhasil menghapus data verifikasi ini',
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
