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
      id: '',
    }
  },
  methods: {
    async detailIsianLab({ id }) {
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
          fetchApi.pemeriksaan
            .getLabById(id, query)
            .then(res => {
              const encrypId = window.btoa(`${res.data.id}`)
              this.$router.push(`/antrian-lab/${encrypId}?${query}`)
            })
            .catch(err => {
              console.info(err.message)
            })
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
