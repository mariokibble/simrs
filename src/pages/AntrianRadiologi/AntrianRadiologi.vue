<template>
  <div>
    <TableAntrianRadiologi
      :reload="reload"
      @deletePemeriksaan="deleteConfirm"
      @detailIsianRadiologi="detailIsianRadiologi"
    />
  </div>
</template>
<script>

import TableAntrianRadiologi from '@/components/TableAntrianRadiologi/TableAntrianRadiologi.vue'
import fetchApi from '@/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'AntrianRadiologi',
  components: {
    TableAntrianRadiologi,
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
    async detailIsianRadiologi({ id }) {
      const query = 'rs_id=1'
      fetchApi.pemeriksaan
        .getRadiologiById(id, query)
        .then(res => {
          const encrypId = window.btoa(`${res.data.id}`)
          this.$router.push(`/antrian-radiologi/${encrypId}?${query}`)
        })
        .catch(err => {
          console.info(err.message)
        })
    },
    deleteConfirm({ id }) {
      this.$swal({
        title: 'Hapus pemeriksaan!',
        text: 'Apakah kamu yakin, akan menghapus data ini ?',
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
              title: 'Berhasil menghapus data pemeriksaan',
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
