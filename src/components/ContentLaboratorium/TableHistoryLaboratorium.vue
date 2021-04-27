<template>
  <div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :group-options="{
        enabled: true
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <!-- Column: Common -->
        <span
          v-if="props.column.field === 'is_flag'"
        >
          {{ flag({ hasil: props.row.hasil, nilai: props.row.nilai_normal}) }}
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import {

} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    VueGoodTable,
  },
  props: {
    orderLab: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      isLoading: false,
      columns: [
        {
          label: 'Jenis Pemeriksaan',
          field: 'layanan.nama',
        },
        {
          label: 'Hasil',
          field: 'hasil',
        },
        {
          label: 'Flag',
          field: 'is_flag',
        },
        {
          label: 'Nilai Normal',
          field: 'nilai_normal',
        },
        {
          label: 'Satuan',
          field: 'satuan',
        },
        {
          label: 'Keterangan',
          field: 'keterangan',
        },
      ],
    }
  },
  computed: {
    flag() {
      return res => {
        const nilai = res.nilai.split(' - ')
        if (Number(res.hasil) > nilai[1]) {
          return 'H'
        } if (Number(res.hasil) < nilai[0]) {
          return 'L'
        }
        return ''
      }
    },
    rows() {
      return this.orderLab.data.map(lab => ({
        mode: 'span',
        label: lab.nama,
        html: false,
        children: lab.hasils,
      }))
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
