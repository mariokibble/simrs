<template>
  <div>
    <b-row>
      <b-col>
        <Content>
          <div>
            <CardBorder>
              <b-button
                variant="flat-dark"
                @click="$refs.modalLayananRadiologi.show()"
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
                <BioHistoryRadiologi :order-radiologi="lastOrderLab" />
                <TableHistoryRadiologi
                  :order-radiologi="lastOrderLab"
                  @showImageHasil="showImageHasil"
                />

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
      <ContentHeadModal @setEntry="setEntry('isPrioritas', ...arguments)" />
      <div v-if="fetchingRadiologis === 'pending'">
        loading ...
      </div>
      <FormInputOrder
        v-else-if="fetchingRadiologis === 'resolved'"
        :rows="radiologis"
        @setEntry="setEntry('selectedRadilogis', ...arguments)"
      />
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BioHistoryRadiologi from '@/components/ContentRadiologi/BioHistoryRadiologi.vue'
import TableHistoryRadiologi from '@/components/ContentRadiologi/TableHistoryRadiologi.vue'
import getDate from '@/utils/getDate'
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
  },
  data() {
    return {
      isPrioritas: 0,
      selectedRadilogis: [],
      radiologis: [],
      fetchingRadiologis: 'idle',
      lastOrderRadiologi: null,
      fetchingLastOrderRadiologi: 'idle',
      imageHasil: '',
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
    showImageHasil(hasil) {
      this.imageHasil = hasil
      this.$refs.modalImageHasil.show()
    },
    async fetchRadiologis() {
      try {
        this.fetchingRadiologis = 'pending'
        const { data: radiologis } = await fetchApi.radiologi.getRadiologis()
        this.radiologis = radiologis
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
    async orderRadiologi() {
      try {
        const form = {
          pemeriksaan_id: this.pemeriksaanId,
          waktu_pemeriksaan: getDate(),
          is_prioritas: this.isPrioritas,
          layanans: this.selectedRadilogis.map(radiologiId => ({
            radiologi_id: radiologiId,
          })),
        }
        const { data } = await fetchApi.radiologi.orderRadiologi(form)
        // langsung update status menjadi 1 untuk sementara
        await fetchApi.radiologi.updateOrderRadiologi({
          id: data.id,
          status: 1,
        })
        this.$refs.modalLayananRadiologi.hide()
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Berhasil order radiologi',
            icon: 'CheckIcon',
            variant: 'success',
          },
        })
      } catch (err) {
        if (err.response.status === 422) {
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
