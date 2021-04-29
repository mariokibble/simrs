<template>
  <div>
    <b-row>
      <b-col
        lg="12"
        class="content-header-left mb-2"
      >
        <b-row class="breadcrumbs-top">
          <b-col cols="12">
            <div class="breadcrumb-wrapper">
              <b-breadcrumb>
                <b-breadcrumb-item to="/">
                  <feather-icon
                    icon="HomeIcon"
                    size="16"
                    class="align-text-top"
                  />
                </b-breadcrumb-item>
                <b-breadcrumb-item
                  v-for="item in breadcrumb"
                  :key="item.text"
                  :active="item.active"
                  :to="item.to"
                >
                  {{ item.text }}
                </b-breadcrumb-item>
              </b-breadcrumb>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="12">
        <div v-if="fetchingPemeriksaan === 'pending'">
          loading ...
        </div>
        <div v-else-if="fetchingPemeriksaan === 'resolved'">
          <HeaderRekamMedis />
          <BodyRekamedis />
        </div>
        <div v-else-if="fetchingPemeriksaan === 'rejected'">
          ERROR
        </div>
      </b-col>
    </b-row>
  </div>

</template>
<script>
import {
  BRow, BCol, BBreadcrumb, BBreadcrumbItem,
} from 'bootstrap-vue'
import HeaderRekamMedis from '@/components/HeaderRekamMedis/HeaderRekamMedis.vue'
import BodyRekamedis from '@/components/BodyRekamedis/BodyRekamedis.vue'
import { listButton } from '@/components/BodyRekamedis/ButtonTab.vue'
import { mapMutations, mapState } from 'vuex'
import fetchApi from '@/api'
import { formattedDate } from '@/components/FormatDate/FormatDate.vue'

export default {
  components: {
    HeaderRekamMedis,
    BodyRekamedis,
    BRow,
    BCol,
    BBreadcrumb,
    BBreadcrumbItem,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('rekamMedis', ['fetchingPemeriksaan', 'pemeriksaan']),
    pemeriksaanId() {
      return this.$route.params.id
    },
    breadcrumb() {
      let from = 'Master data'

      // eslint-disable-next-line default-case
      switch (this.$route.query.from) {
        case 'antrian-poliklinik':
          from = 'Antrian Poliklinik'
          break
        case 'rawat-inap':
          from = 'Rawat Inap'
      }
      const selectedTab = listButton.filter(btn => btn.value === this.$route.params.content)[0]
      const output = [
        {
          text: from,
          active: false,
        },
        {
          text: 'Rekam medis',
          active: true,
        },
        {
          text: selectedTab ? selectedTab.text : 'not found',
          active: true,
        },
      ]
      if (this.fetchingPemeriksaan === 'resolved') {
        output.push({
          text: this.pemeriksaan.poli.nama,
          active: true,
        }, {
          text: formattedDate(this.pemeriksaan.tanggal_periksa),
          active: true,
        }, {
          text: this.pemeriksaan.nrm,
          active: true,
        })
      }
      return output
    },
  },
  beforeDestroy() {
    this.CLEAR_STATE()
  },
  async created() {
    try {
      this.UPDATE_FETCHING_PEMERIKSAAN('pending')
      const { data } = await fetchApi.pemeriksaan.getPemeriksaanById(this.pemeriksaanId)
      this.UPDATE_PEMERIKSAAN(data)
    } catch (error) {
      console.log(error)
      this.UPDATE_FETCHING_PEMERIKSAAN('rejected')
    }
  },
  methods: {
    ...mapMutations('rekamMedis', ['UPDATE_FETCHING_PEMERIKSAAN', 'UPDATE_PEMERIKSAAN', 'CLEAR_STATE']),
  },
}
</script>
