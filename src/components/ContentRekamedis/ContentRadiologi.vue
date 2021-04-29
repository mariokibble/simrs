<template>
  <div>
    <b-row>
      <b-col>
        <Content>
          <div>
            <CardBorder>
              <b-button
                variant="flat-dark"
                @click="$refs.modalLayananRadiologi.show(), newSelectedRadiologis = {}"
              >
                <feather-icon icon="PlusSquareIcon" />
                Order Radiologi
              </b-button>
              <b-button
                variant="flat-dark"
              >
                <feather-icon icon="EyeIcon" />
                Lihat hasil Radiologi lainnya
              </b-button>
            </CardBorder>
            <CardBorder class="p-1">
              <div v-if="fetchingLastOrderRadiologi === 'pending'">
                loading ...
              </div>
              <div v-else-if="fetchingLastOrderRadiologi === 'resolved'">
                <div v-if="Object.keys(lastOrderLab).length">
                  <BioHistoryRadiologi :order-radiologi="lastOrderLab" />
                  <TableHistoryRadiologi
                    :order-radiologi="lastOrderLab"
                    @showImageHasil="showImageHasil"
                  />

                </div>
                <div
                  v-else
                  class="text-center"
                >
                  belum ada hasil radiologi
                </div>
              </div>
              <div v-else-if="fetchingLastOrderRadiologi === 'rejected'">
                ERROR
              </div>
            </CardBorder>
          </div>
        </Content>
      </b-col>
    </b-row>
    <b-modal
      ref="modalLayananRadiologi"
      size="lg"
      title="Order Radiologi"
      ok-variant="secondary"
      cancel-variant="danger"
      ok-title="Simpan"
      cancel-title="Batalkan"
      @ok="orderRadiologi"
    >
      <ValidationObserver
        ref="formOrderRadiologi"
        tag="form"
      >
        <ContentHeadModal @setEntry="setEntry('isPrioritas', ...arguments)" />
        <FormInputPrioritas
          @isPrioritas="setEntry('isPrioritas', ...arguments)"
        />
        <div v-if="fetchingRadiologis === 'pending'">
          loading ...
        </div>
        <div v-else-if="fetchingRadiologis === 'resolved'">
          <FormInputOrder
            v-for="radiologi in radiologis"
            :key="radiologi.id"
            :rows="[radiologi]"
            @setEntry="setEntryNewSelectedRadiologis(radiologi.id, ...arguments)"
          />
        </div>
      </ValidationObserver>
    </b-modal>
    <b-modal
      ref="modalImageHasil"
      size="xl"
      title="Hasil"
    >
      <!-- 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0Dol5tNpSoCQqIVrdsQkIz87EdVl74ddrQ&usqp=CAU'  -->
      <b-img
        thumbnail
        :src="imageHasil"
        alt="image"
        style="height: 80vh; width: 100%"
      />
      <template #modal-footer>
        <div />
      </template>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton, BModal, BImg,
} from 'bootstrap-vue'
import CardBorder from '@/components/CardBorder/CardBorder.vue'
import ContentHeadModal from '@/components/ContentRadiologi/ContentHeadModal.vue'
import FormInputOrder from '@/components/FormInputOrder/FormInputOrder.vue'
import FormInputPrioritas from '@/components/FormInputPrioritas/FormInputPrioritas.vue'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BioHistoryRadiologi from '@/components/ContentRadiologi/BioHistoryRadiologi.vue'
import TableHistoryRadiologi from '@/components/ContentRadiologi/TableHistoryRadiologi.vue'
import getDate from '@/utils/getDate'
import radiologiToplLevel from '@/constants/radiologi_top_level.json'
import { ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import { mapState } from 'vuex'
import fetchApi from '@/api'
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
    BioHistoryRadiologi,
    TableHistoryRadiologi,
    BImg,
    FormInputPrioritas,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    required,
  },
  data() {
    return {
      isPrioritas: 0,
      selectedRadiologis: [],
      radiologis: [],
      fetchingRadiologis: 'idle',
      lastOrderRadiologi: null,
      fetchingLastOrderRadiologi: 'idle',
      imageHasil: '',
      newSelectedRadiologis: {},
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
      await this.fetchLastOrderRadiologi()
      await this.fetchRadiologis()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    setEntry(key, value) {
      this[key] = value
    },
    setEntryNewSelectedRadiologis(categoryId, value) {
      this.newSelectedRadiologis[categoryId] = value
      console.log(this.newSelectedRadiologis)
    },
    showImageHasil(hasil) {
      this.imageHasil = hasil
      this.$refs.modalImageHasil.show()
    },
    async fetchRadiologis() {
      try {
        this.fetchingRadiologis = 'pending'
        const { data: radiologis } = await fetchApi.radiologi.getRadiologis()

        const newDataRadiologis = []
        radiologis.forEach(radiologi => {
          const newDataLayanan = []
          let layanans = [...radiologi.layanans]
          if (layanans <= 3) {
            newDataLayanan.push(radiologi)
          } else {
            if (radiologiToplLevel[radiologi.nama]) {
              const duplicateLayanans = []
              layanans.forEach(layanan => {
                if (radiologiToplLevel[radiologi.nama][layanan.nama]) {
                  duplicateLayanans.unshift(layanan)
                } else {
                  duplicateLayanans.push(layanan)
                }
              })
              layanans = duplicateLayanans
            }
            const row = Math.ceil((layanans.length) / 3)
            for (let i = 0; i < row; i += 1) {
              for (let j = 0; j < layanans.length; j += row) {
                if (!layanans[i + j]) break
                newDataLayanan.push(layanans[i + j])
              }
            }
            newDataRadiologis.push({
              ...radiologi,
              layanans: newDataLayanan,
            })
          }
        })
        this.radiologis = newDataRadiologis
        this.fetchingRadiologis = 'resolved'
      } catch (error) {
        console.log(error)
        this.fetchingRadiologis = 'rejected'
      }
    },
    async fetchLastOrderRadiologi() {
      try {
        this.fetchingLastOrderRadiologi = 'pending'
        const { data: result } = await fetchApi.radiologi.getLastOrderRadiologi(this.pemeriksaan.user.id)
        this.lastOrderLab = result
        this.fetchingLastOrderRadiologi = 'resolved'
      } catch (error) {
        this.fetchingLastOrderRadiologi = 'rejected'
      }
    },
    checkValidateForm() {
      return new Promise((resolve, reject) => (async () => {
        const validated = await this.$refs.formOrderRadiologi.validate()
        if (!validated) {
          return reject()
        }
        return resolve(true)
      })())
    },
    async orderRadiologi(e) {
      e.preventDefault()
      try {
        if (await this.checkValidateForm()) {
          const promises = []
          const keysOfSelectedRadiologis = Object.keys(this.newSelectedRadiologis)
          keysOfSelectedRadiologis.forEach(keyOfSelectedRadiologis => {
            const listOrderRadiologis = this.newSelectedRadiologis[keyOfSelectedRadiologis]
            if (listOrderRadiologis.length) {
              const form = {
                pemeriksaan_id: this.pemeriksaanId,
                waktu_pemeriksaan: getDate(),
                is_prioritas: this.isPrioritas,
                dokter_id: this.$store.state.userLoggedIn.user.id,
                layanans: listOrderRadiologis.map(radiologiId => ({
                  radiologi_id: radiologiId,
                })),
              }
              promises.push(fetchApi.radiologi.orderRadiologi(form))
            }
          })

          await Promise.all(promises)
          this.$refs.modalLayananRadiologi.hide()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil order radiologi',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        }
      } catch (err) {
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
