<template>
  <div>
    <div v-if="!fetching">
      <CardDataDiri
        :nama="formattedNama"
        :foto-profile="pemeriksaan.user.foto_profile"
        :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
        :asuransi="pemeriksaan.asuransi"
        :tanggal-appointment="pemeriksaan.tanggal_periksa"
        :poliklinik-tujuan="pemeriksaan.poli.nama"
        :dokter="pemeriksaan.dokter.user.nama"
      />
      <CardKtp :uri="pemeriksaan.user.foto_ktp" />
      <CardAsuransi
        v-if="pemeriksaan.asuransi !== 'UMUM'"
        :type-asuransi="pemeriksaan.asuransi"
        :uri="pemeriksaan.asuransi_file"
        :nomor-bpjs="pemeriksaan.user.nomor_bpjs || '-'"
        :nomor-surat-rujukan-bpjs="'-'"
      />
      <CardFormVerifikasi @submitted="preSubmit" />
      <b-modal
        id="modal-verifikasi-pemeriksaan"
        ref="modalVerifikasiPemeriksaan"
        ok-variant="dark"
        ok-title="Konfirmasi"
        cancel-title="Batalkan"
        modal-class="modal-dark"
        centered
        title="Apakah sudah benar?"
        class="p-0"
        @ok="submitForm"
      >
        <ConfirmationVerifikasi
          :nama-pasien="formattedNama"
          :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
          :jaminan="pemeriksaan.asuransi"
          :tanggal-appointment="pemeriksaan.tanggal_periksa"
          :poliklinik="pemeriksaan.poli.nama"
          :dokter="pemeriksaan.dokter.user.nama"
          :status="formattedStatus"
          :catatan="catatanTambahan"
        />
      </b-modal>
    </div>
    <div v-else>
      loading ...
    </div>
  </div>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import CardDataDiri from '@/components/CardDetailVerifikasi/CardDataDiri.vue'
import CardKtp from '@/components/CardDetailVerifikasi/CardKtp.vue'
import CardAsuransi from '@/components/CardDetailVerifikasi/CardAsuransi.vue'
import CardFormVerifikasi from '@/components/CardDetailVerifikasi/CardFormVerifikasi.vue'
import ConfirmationVerifikasi from '@/components/CardDetailVerifikasi/ConfirmationVerifikasi.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import addPrefixName from '@/utils/addPrefixName'

// import FormatDate from "@/components/FormatDate/FormatDate.vue";
import fetchApi from '@/api'

export default {
  components: {
    CardDataDiri,
    CardKtp,
    CardAsuransi,
    CardFormVerifikasi,
    BModal,
    ConfirmationVerifikasi,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      pemeriksaan: null,
      fetching: true,
      catatanTambahan: [],
      status: 0,
    }
  },
  computed: {
    pasientId() {
      return window.atob(this.$route.params.id)
    },
    formattedNama() {
      const { user } = this.pemeriksaan
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
    this.detailVeriksaPasien()
  },
  methods: {
    detailVeriksaPasien() {
      fetchApi.pemeriksaan
        .getPemeriksaanById(this.pasientId)
        .then(({ data }) => {
          console.log(data)
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
      this.$router.push({ name: 'antrian-verifikasi' })
    },
  },
}
</script>