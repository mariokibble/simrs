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
          v-if="props.column.field === 'hasil'"
        >
          <b-button
            v-if="props.row.hasil"
            variant="warning"
            class="p-25"
            @click="$emit('showImageHasil', props.row.hasil)"
          >
            <svgicon
              width="30"
              height="30"
              name="Radiologi"
            />
          </b-button>
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
  BButton,
} from 'bootstrap-vue'
import '@/assets/images/iconSidebar/Radiologi'

import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    VueGoodTable,
    BButton,
  },
  props: {
    orderRadiologi: {
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
          label: 'Expertise',
          field: 'expertise',
          width: '65%',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.orderRadiologi.data.map(lab => ({
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
