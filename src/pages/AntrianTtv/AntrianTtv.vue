<template>
  <div>
    <TableAntrianTtv
      :reload="reload"
      @updateTtv="preUpdateTtv"
      @deletePemeriksaan="deleteConfirm"
    />
    <b-modal
      id="modal-antrian-rajal"
      ref="modalUpdateTtv"
      ok-variant="dark"
      ok-title="Simpan"
      cancel-title="Batalkan"
      modal-class="modal-dark"
      centered
      title="Pemeriksaan TTV"
      class="p-0"
      @ok="submitForm"
    >
      <ValidationObserver
        ref="formTtvAwalRajal"
        tag="form"
      >
        <FormTtvAwalRajal />
      </ValidationObserver>
    </b-modal>
  </div>
</template>
<script>

import TableAntrianTtv from '@/components/TableAntrianTtv/TableAntrianTtv.vue'
import { BModal } from 'bootstrap-vue'
import FormTtvAwalRajal from '@/components/FormTtvAwalRajal/FormTtvAwalRajal.vue'
import { ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import { mapMutations, mapActions, mapState } from 'vuex'
import { FORM_TYPES } from '@/store/ttv'
import getDate from '@/utils/getDate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import fetchApi from '@/api'

export default {
  components: {
    TableAntrianTtv,
    BModal,
    FormTtvAwalRajal,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    required,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      reload: false,
    }
  },
  computed: {
    ...mapState('ttv', ['formState']),
  },
  mounted() {
    // this.$refs.modalUpdateTtv.show()
    this.CLEAR_ENTRY_FORM()
  },
  methods: {
    ...mapMutations('ttv', ['SET_ENTRY_FORM', 'CLEAR_ENTRY_FORM']),
    ...mapActions('ttv', ['addTtv']),
    async submitForm(e) {
      e.preventDefault()
      if (await this.checkValidateForm()) {
        this.SET_ENTRY_FORM({ key: FORM_TYPES.WAKTU_SELESAI, value: getDate() })
        // TODO: show alert when failed add ttv
        const res = await this.addTtv()
        if (res === true) {
          this.$toast({
            component: ToastificationContent,
            props: {
              // TODO: show nomer_antrian
              title: 'Berhasil update ttv',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        }
        this.$refs.modalUpdateTtv.hide()
        this.reload = !this.reload
      }
    },
    checkValidateForm() {
      return new Promise((resolve, reject) => (async () => {
        const validated = await this.$refs.formTtvAwalRajal.validate()
        if (!validated) {
          return reject()
        }
        return resolve(true)
      })())
    },
    preUpdateTtv(value) {
      this.$refs.modalUpdateTtv.show()
      this.SET_ENTRY_FORM({ key: FORM_TYPES.PEMERIKSAAN_ID, value })
      this.SET_ENTRY_FORM({ key: FORM_TYPES.WAKTU_MULAI, value: getDate() })
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
