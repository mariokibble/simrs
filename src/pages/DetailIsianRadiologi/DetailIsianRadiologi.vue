<template>
  <div>
    <div v-if="!fetching">
      <CardDataDiriLab
        :nama="formattedNama"
        :foto-profile="pemeriksaan.user.foto_profile"
        :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
        :asuransi="pemeriksaan.pemeriksaan.asuransi"
        :tanggal-appointment="pemeriksaan.nrm"
        :poliklinikTujuan="pemeriksaan.pemeriksaan.poli.nama"
      />     
      <CardPemeriksaan
        :tanggal-pemeriksaan="pemeriksaan.pemeriksaan.tanggal_periksa"
        :tanggal-hasil="pemeriksaan.pemeriksaan.tanggal_periksa"
      /> 
    </div>
    <div v-else>
      loading ...
    </div>
  </div>
</template>

<script>
import CardDataDiriLab from '@/components/CardDetailVerifikasi/CardDataDiriLab.vue'
import CardPemeriksaan from '@/components/CardDetailVerifikasi/CardPemeriksaan.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import addPrefixName from '@/utils/addPrefixName'

// import FormatDate from "@/components/FormatDate/FormatDate.vue";
import fetchApi from '@/api'

export default {
  components: {
    CardDataDiriLab,
    CardPemeriksaan,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      pemeriksaan: null,
      fetching: true,
      status: 0,
    }
  },
  computed: {
    radioId() {
        return this.$route.params.id
    //   return window.atob(this.$route.params.id)
    },
    formattedNama() {
      const { user } = this.pemeriksaan
      console.log(user, '<<<user')
      const prefixName = addPrefixName({
        jenisKelamin: user.jenis_kelamin,
        statusPernikahan: user.pernikahan,
        tanggalLahir: user.tanggal_lahir,
      })
      return `${prefixName} ${user.nama}`
    },
    formattedStatus() {
      if (this.status === 0) {
        return 'Terverifikasi'
      } if (this.status === 1) {
        return 'Terverifikasi-catatan'
      }
      return 'Ditolak'
    },
  },
  created() {
    this.detailIsianRadiologi()
  },
  methods: {
    detailIsianRadiologi() {
      fetchApi.pemeriksaan
        .getRadiologiById(this.radioId, 'rs_id=1')
        .then(({ data }) => {
          this.pemeriksaan = data
          this.fetching = false
        })
        .catch(err => console.log(err))
    },
    preSubmit(payload) {
      this.catatanTambahan = payload.catatan
      this.status = payload.status
      console.log(payload)
      this.$refs.modalVerifikasiPemeriksaan.show()
    },
    async submitForm() {
      try {
        await fetchApi.pemeriksaan.updatePemeriksaan({
          id: this.pemeriksaan.id,
          status: this.status === 2 ? 9 : 1,
          notes: this.catatanTambahan,
        })
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `Berhasil mengupdate status pemeriksaan menjadi ${this.formattedStatus}`,
            icon: 'CheckIcon',
            variant: 'success',
          },
        })
        this.back()
      } catch (err) {
        console.log(err)
        if (err.response.status === 422) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: err.response.data.message || err.response.data,
              icon: 'BellIcon',
              variant: 'danger',
              setTimeout: '5000',
            },
          })
          setTimeout(() => {
            this.btnDisabled = false
          }, 3300)
        }
      }
    },
    back() {
      this.$router.push({ name: 'antrian-radiologi' })
    },
  },
}
</script>
