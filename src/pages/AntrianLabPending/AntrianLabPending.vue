<template>
  <div>
    <TableAntrianLabPending
      :reload="reload"
      @deletePemeriksaan="deleteConfirm"
      @detailIsianLab="detailIsianLab"
    />
  </div>
</template>
<script>
import TableAntrianLabPending from '@/components/TableAntrianLabPending/TableAntrianLabPending.vue'
import fetchApi from '@/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'AntrianLab',
  components: {
    TableAntrianLabPending,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
      id: '',
      rs_id: null,
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
          console.log(data.id, '<<< dataId')
          const encrypId = window.btoa(`${data.id}`)
          const payload = {
            id: data.id,
            status: data.status,
          }
          if (data.status === 2) {
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
    deleteConfirm({ id, kodeAntrian }) {
      this.$swal({
        title: 'Hapus antrian laboratorium!',
        text: `Apakah kamu yakin, akan menghapus data antrian laboratorium dengan kode antrian ${kodeAntrian} ?`,
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
