<template>
  <b-card>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <div>
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="mr-1">Filter</label>
            <SelectPoli
              class="mr-1"
              @selected="changeEntry('filterByPoli', ...arguments)"
            />
            <SelectCito
              class="mr-1"
              @selected="changeEntry('filterByCito', ...arguments)"
            />
            <SelectStatusLab
              class="mr-1"
              @selected="changeEntry('filterByStatus', ...arguments)"
            />
          </div>
        </b-form-group>
      </div>
      <div class="custom-search mr-5">
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="col-3 text-right">Search</label>
            <SelectSearchLab
              class="col-3 mr-1"
              @selected="changeEntry('selectedSearch', ...arguments)"
            />
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block col-6"
            />
            <b-button
              v-b-tooltip.hover.top="'refresh'"
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="success"
              class="btn-icon ml-1"
              @click="init"
            >
              <feather-icon icon="RefreshCwIcon" />
            </b-button>
          </div>
        </b-form-group>
      </div>
    </div>
    <!-- table -->
    <vue-good-table
      mode="remote"
      style-class="vgt-table striped"
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm,
      }"
      :is-loading.sync="isLoading"
      :pagination-options="{
        enabled: true,
      }"
      :sort-options="{
        enabled: false,
      }"
      :total-rows="totalRecords"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-column-filter="onColumnFilter"
      @on-per-page-change="onPerPageChange"
      @on-search="onSearch"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <!-- Column: Cito -->
        <span v-if="props.column.field === 'pemeriksaan.is_prioritas'">
          <b-badge :variant="citoVariant(props.row.pemeriksaan.is_prioritas)">
            {{ citoText(props.row.pemeriksaan.is_prioritas) }}
          </b-badge>
        </span>
        <span v-else-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ statusText(props.row.status) }}
          </b-badge>
        </span>

        <span v-else-if="props.column.field === 'user.nama'">
          <b>
            {{
              prefixName({
                jenisKelamin: props.row.user.jenis_kelamin,
                statusPernikahan: props.row.user.pernikahan,
                tanggalLahir: props.row.user.tanggal_lahir,
              })
            }}
          </b>
          {{ props.row.user.nama }}
        </span>
        <span
          v-else-if="props.column.field === 'user.tanggal_lahir'"
          class="text-nowrap"
        >
          <FormatDate :date="props.row.user.tanggal_lahir" />
        </span>

        <span
          v-else-if="props.column.field === 'tanggal_periksa'"
          class="text-nowrap"
        >
          <FormatDate :date="props.row.tanggal_periksa" />
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <!-- button  edit, delete, TTV, rekamedis -->

            <b-button
              v-b-tooltip.hover.top="'Input Hasil Laboratorium'"
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon"
              @click="$emit('detailIsianLab', { id: props.row.id })"
            >
              <feather-icon icon="EditIcon" />
            </b-button>

            <b-button
              v-b-tooltip.hover.top="'Hapus'"
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon"
              @click="
                $emit('deleteVerifikasi', {
                  id: props.row.id,
                })
              "
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Showing 1 to
            </span>
            <b-form-select
              v-model="serverParams.perPage"
              :options="['3', '5', '10']"
              class="mx-1"
              @input="
                (value) => props.perPageChanged({ currentPerPage: value })
              "
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="serverParams.perPage"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value) => props.pageChanged({ currentPage: value })"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </b-card>
</template>

<script>
import {
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BCard,
  BButton,
  VBTooltip,
  BBadge,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import SelectPoli from '@/components/SelectPoli/SelectPoli.vue'
import store from '@/store/index'
import FormatDate from '@/components/FormatDate/FormatDate.vue'
import fetchApi from '@/api/index'
import Ripple from 'vue-ripple-directive'
import { debounce } from 'debounce'
import SelectCito from '@/components/SelectCito/SelectCito.vue'
import SelectSearchLab from '@/components/SelectSearchLab/SelectSearchLab.vue'
import SelectStatusLab from '@/components/SelectStatusLab/SelectStatusLab.vue'
import addPrefixName from '@/utils/addPrefixName'

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BCard,
    FormatDate,
    SelectPoli,
    BButton,
    BBadge,
    SelectSearchLab,
    SelectCito,
    SelectStatusLab,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  props: {
    reload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixName: addPrefixName,
      isLoading: false,
      dir: false,
      columns: [
        {
          label: 'No Antrian',
          field: 'no_antrian',
        },
        {
          label: 'Nama',
          field: 'user.nama',
        },
        {
          label: 'Tanggal Lahir',
          field: 'user.tanggal_lahir',
        },
        {
          label: 'NRM',
          field: 'nrm',
        },
        {
          label: 'Prioritas',
          field: 'pemeriksaan.is_prioritas',
          name: 'prioritas',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      names: [],
      totalRecords: 0,
      searchTerm: '',
      selectedSearch: null,
      filterByPoli: null,
      filterByCito: null,
      filterByStatus: '',
      poliId: null,
      poliName: null,
      name: null,
      serverParams: {
        columnFilters: {},
        sort: {
          field: '',
          type: '',
        },
        page: 1,
        perPage: 10,
      },
    }
  },
  computed: {
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
    idDenganIndex() {
      return this.rows.map((rows, index) => ({
        ...rows,
        index: index + 1,
      }))
    },
    citoVariant() {
      const citoColor = {
        0: 'light-success',
        1: 'light-danger',
      }
      return prioritas => citoColor[prioritas]
    },
    citoText() {
      const text = {
        0: 'Non Cito',
        1: 'Cito',
      }

      return prioritas => text[prioritas]
    },
    statusVariant() {
      const statusColor = {
        0: 'light-warning',
        1: 'light-primary',
        3: 'light-success',
        9: 'light-danger',
      }
      return status => statusColor[status]
    },
    statusText() {
      const text = {
        0: 'Belum diproses',
        1: 'Sedang diproses',
        3: 'Selesai',
        9: 'Batal',
      }
      return status => text[status]
    },
  },
  watch: {
    filterByPoli() {
      this.init()
    },
    filterByCito() {
      this.init()
    },
    reload() {
      this.init()
    },
    filterByStatus() {
      this.init()
    },
    async selectedSearch(val) {
      if (val && this.searchTerm) {
        this.isLoading = true
        this.updateParams({ page: 1, perPage: 10 })
        await this.loadItems()
        this.isLoading = false
      }
    },
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.isLoading = true
      this.updateParamsToDefault()
      await this.loadItems()
      this.isLoading = false
    },
    changeEntry(key, value) {
      this[key] = value
    },
    updateParams(newProps) {
      this.serverParams = { ...this.serverParams, ...newProps }
    },
    updateParamsToDefault() {
      this.serverParams = {
        columnFilters: {},
        sort: {
          field: '',
          type: '',
        },
        page: 1,
        perPage: 10,
      }
    },
    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },
    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },
    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params.sortType,
            field: this.columns[params.columnIndex].field,
          },
        ],
      })
      this.loadItems()
    },
    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    // eslint-disable-next-line prefer-arrow-callback, func-names
    onSearch: debounce(function () {
      this.init()
    }, 200),
    async loadItems() {
      try {
        const { data: res } = await fetchApi.pemeriksaan.getResep()
        const { data } = res
        console.log(data, '<< data')
        this.rows = data
        this.totalRecords = res.total
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
