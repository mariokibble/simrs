<template>
  <div>
    <b-row>
      <b-col lg="12">
        <Content>
          <div>
            <CardBorder>
              <b-button
                variant="flat-dark"
                @click="$refs.modalLayananLaboratorium.show()"
              >
                <feather-icon icon="PlusSquareIcon" />
                Order Laboratorium
              </b-button>
              <b-button
                variant="flat-dark"
              >
                <feather-icon icon="EyeIcon" />
                Lihat hasil Laboratorium lainnya
              </b-button>
            </CardBorder>
            <CardBorder class="p-1">
              <div v-if="fetchingLastOrderLab === 'pending'">
                loading ...
              </div>
              <div v-else-if="fetchingLastOrderLab === 'resolved'">
                <div v-if="Object.keys(lastOrderLab).length">
                  <BioHistoryLaboratorium :order-lab="lastOrderLab" />
                  <TableHistoryLaboratorium :order-lab="lastOrderLab" />

                  <div class="d-flex justify-content-end">
                    <b-button
                      variant="warning"
                      class="mt-1"
                      @click="$router.push(`/print/ordered-laboratorium/${lastOrderLab.id}`)"
                    >
                      <!-- <feather-icon icon="PlusSquareIcon" /> -->
                      Print
                    </b-button>
                  </div>
                </div>
                <div
                  v-else
                  class="text-center"
                >
                  belum ada hasil laboratorium
                </div>

              </div>
              <div v-else-if="fetchingLastOrderLab === 'rejected'">
                ERROR
              </div>
            </CardBorder>
          </div>
        </Content>
      </b-col>
    </b-row>
    <!-- Todo: Lazy load modal -->
    <b-modal
      ref="modalLayananLaboratorium"
      size="lg"
      title="Order Laboratorium"
      ok-variant="secondary"
      cancel-variant="danger"
      ok-title="Simpan"
      cancel-title="Batalkan"
      @ok="orderLaboratorium"
    >
      <ValidationObserver
        ref="formOrderLab"
        tag="form"
      >
        <ContentHeadModal />
        <FormInputPrioritas
          @isPrioritas="setEntry('isPrioritas', ...arguments)"
        />
        <div v-if="fetchingLabs === 'pending'">
          loading ...
        </div>
        <FormInputOrder
          v-else-if="fetchingLabs === 'resolved'"
          :rows="laboratoriums"
          @setEntry="setEntry('selectedLab', ...arguments)"
        />
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton, BModal,
} from 'bootstrap-vue'
import CardBorder from '@/components/CardBorder/CardBorder.vue'
import ContentHeadModal from '@/components/ContentLaboratorium/ContentHeadModal.vue'
import FormInputOrder from '@/components/FormInputOrder/FormInputOrder.vue'
import FormInputPrioritas from '@/components/FormInputPrioritas/FormInputPrioritas.vue'
import BioHistoryLaboratorium from '@/components/ContentLaboratorium/BioHistoryLaboratorium.vue'
import TableHistoryLaboratorium from '@/components/ContentLaboratorium/TableHistoryLaboratorium.vue'
import fetchApi from '@/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import getDate from '@/utils/getDate'
import laboratoriumTopLevel from '@/constants/laboratorium_top_level.json'
import { ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import { mapState } from 'vuex'
import Content from './Content.vue'

export default {
  components: {
    BRow,
    BCol,
    Content,
    BButton,
    CardBorder,
    BModal,
    ContentHeadModal,
    FormInputOrder,
    BioHistoryLaboratorium,
    TableHistoryLaboratorium,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    FormInputPrioritas,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    required,
  },
  data() {
    return {
      selectedLab: [],
      isPrioritas: '',
      laboratoriums: [],
      fetchingLabs: 'idle',
      lastOrderLab: null,
      fetchingLastOrderLab: 'idle',
    }
  },
  computed: {
    ...mapState('rekamMedis', ['pemeriksaan']),
    pemeriksaanId() {
      return this.$route.params.id
    },
  },
  async created() {
    try {
      await this.fetchLastOrderLab()
      await this.fetchLabs()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    setEntry(key, value) {
      this[key] = value
    },
    async fetchLabs() {
      try {
        this.fetchingLabs = 'pending'
        const { data: laboratoriums } = await fetchApi.laboratorium.getLaboratoriums()
        const newDataLabs = []
        laboratoriums.forEach(lab => {
          let layanans = [...lab.layanans]
          if (laboratoriumTopLevel[lab.nama]) {
            const newLayanans = []
            layanans.forEach(layanan => {
              if (laboratoriumTopLevel[lab.nama][layanan.nama]) {
                newLayanans.unshift(layanan)
              } else {
                newLayanans.push(layanan)
              }
            })
            layanans = newLayanans
          }
          newDataLabs.push({
            ...lab,
            layanans,
          })
        })
        this.laboratoriums = newDataLabs
        this.fetchingLabs = 'resolved'
      } catch (error) {
        console.log(error)
        this.fetchingLabs = 'rejected'
      }
    },
    async fetchLastOrderLab() {
      try {
        this.fetchingLastOrderLab = 'pending'
        const { data: result } = await fetchApi.laboratorium.getLastOrderLab(this.pemeriksaan.user.id)
        this.lastOrderLab = result
        this.fetchingLastOrderLab = 'resolved'
      } catch (error) {
        this.fetchingLastOrderLab = 'rejected'
      }
    },
    checkValidateForm() {
      return new Promise((resolve, reject) => (async () => {
        const validated = await this.$refs.formOrderLab.validate()
        if (!validated) {
          return reject()
        }
        return resolve(true)
      })())
    },
    async orderLaboratorium(e) {
      e.preventDefault()
      try {
        if (await this.checkValidateForm()) {
          const form = {
            pemeriksaan_id: this.pemeriksaanId,
            waktu_pemeriksaan: getDate(),
            is_prioritas: this.isPrioritas,
            dokter_id: this.$store.state.userLoggedIn.user.id,
            layanans: this.selectedLab.map(labId => ({
              laboratorium_id: labId,
            })),
          }
          await fetchApi.laboratorium.orderLaboratorium(form)
          this.$refs.modalLayananLaboratorium.hide()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil order laboratorium',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        }
      } catch (err) {
        console.log(err)
        if (err && err.response.status === 422) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: err.response.data.message,
              icon: 'BellIcon',
              variant: 'danger',
              setTimeout: '3000',
            },
          })
        }
      }
    },
  },
}
</script>
