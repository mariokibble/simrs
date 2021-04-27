<template>
  <CardBorder
    class="p-1 m-1 content"
  >
    <div v-if="fetchingLab === 'pending'">
      loading ...
    </div>
    <div v-else-if="fetchingLab === 'resolved'">
      <BioHistoryLaboratorium :order-lab="lab" />
      <TableHistoryLaboratorium :order-lab="lab" />
      <div class="action">
        <b-button
          variant="danger"
          class="mt-1 mr-1"
          @click="$router.go(-1)"
        >
          Kembali
        </b-button>
        <b-button
          variant="secondary"
          class="mt-1"
          @click="print"
        >
          Print sekarang
        </b-button>
      </div>
    </div>
    <div v-else-if="fetchingLab === 'rejected'">
      ERROR
    </div>
  </CardBorder>
</template>
<script>
import {
  BButton,
} from 'bootstrap-vue'
import CardBorder from '@/components/CardBorder/CardBorder.vue'
import BioHistoryLaboratorium from '@/components/ContentLaboratorium/BioHistoryLaboratorium.vue'
import TableHistoryLaboratorium from '@/components/ContentLaboratorium/TableHistoryLaboratorium.vue'
import fetchApi from '@/api'

export default {
  components: {
    CardBorder,
    BButton,
    BioHistoryLaboratorium,
    TableHistoryLaboratorium,
  },
  data() {
    return {
      lab: null,
      fetchingLab: 'idle',
    }
  },
  computed: {
    labId() {
      return this.$route.params.id
    },
  },
  async created() {
    await this.getLabById()
  },
  methods: {
    async getLabById() {
      try {
        this.fetchingLab = 'pending'
        const { data } = await fetchApi.laboratorium.getOrderLabById(this.labId)
        this.lab = data
        this.fetchingLab = 'resolved'
      } catch (error) {
        console.log(error)
        this.fetchingLab = 'rejected'
      }
    },
    print() {
      window.print()
    },
  },
}
</script>

<style lang="scss">

@media print {
    @page {
      // size: 75mm 60mm;
      margin: 0;
    }
    // Global Styles
    body {
        background-color: transparent !important;
    }
    nav.header-navbar {
        display: none;
    }
    .main-menu {
        display: none;
    }
    .header-navbar-shadow {
        display: none !important;
    }
    footer.footer {
        display: none;
    }
    .content {
        top: 200px
    }
    .action {
        display: none;
    }
}
</style>
