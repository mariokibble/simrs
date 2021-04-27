<template>
  <div>
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
  </div>

</template>
<script>
import HeaderRekamMedis from '@/components/HeaderRekamMedis/HeaderRekamMedis.vue'
import BodyRekamedis from '@/components/BodyRekamedis/BodyRekamedis.vue'
import { mapMutations, mapState } from 'vuex'
import fetchApi from '@/api'

export default {
  components: {
    HeaderRekamMedis,
    BodyRekamedis,
  },
  computed: {
    ...mapState('rekamMedis', ['fetchingPemeriksaan']),
    pemeriksaanId() {
      return this.$route.params.id
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
