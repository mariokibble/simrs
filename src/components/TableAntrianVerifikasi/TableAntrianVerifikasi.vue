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
            <SelectStatusAntrianVerifikasi
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
            <SelectSearchAntrianVerifikasi
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
      :line-numbers="true"
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
        <!-- Column: Status -->
        <span v-if="props.column.field === 'status'">
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
              v-b-tooltip.hover.top="'Edit Verifikasi'"
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon"
              @click="$emit('detailVerifikasi', { id: props.row.id })"
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
import SelectStatusAntrianVerifikasi from '@/components/SelectStatusAntrianVerifikasi/SelectStatusAntrianVerifikasi.vue'
import SelectSearchAntrianVerifikasi from '@/components/SelectSearchAntrianVerifikasi/SelectSearchAntrianVerifikasi.vue'
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
    SelectStatusAntrianVerifikasi,
    SelectSearchAntrianVerifikasi,
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
          label: 'Nama',
          field: 'user.nama',
        },
        {
          label: 'Tanggal Lahir',
          field: 'user.tanggal_lahir',
        },
        {
          label: 'Jaminan',
          field: 'asuransi',
        },
        {
          label: 'Poliklinik',
          field: 'poli.nama',
        },

        {
          label: 'Tanggal Appointment',
          field: 'tanggal_periksa',
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
      totalRecords: 0,
      searchTerm: '',
      selectedSearch: 'nama',
      filterByPoli: null,
      filterByStatus: '0',
      serverParams: {
        columnFilters: {},
        sort: {
          field: '',
          type: '',
        },
        page: 1,
        perPage: 10,
      },
      saveInterval: null,
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
    statusVariant() {
      const statusColor = {
        0: 'light-warning',
        1: 'light-success',
        9: 'light-danger',
      }
      return status => statusColor[status]
    },
    statusText() {
      const text = {
        0: 'Belum diverifikasi',
        1: 'Sudah diverifikasi',
        9: 'Ditolak',
      }

      return status => text[status]
    },
  },
  watch: {
    filterByPoli() {
      this.init()
    },
    filterByStatus() {
      this.init()
    },
    reload() {
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
  mounted() {
    this.interval()
  },
  beforeDestroy() {
    clearInterval(this.saveInterval)
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
        let query = 'rs_id=1'
        query += `&status=${
          this.filterByStatus ? this.filterByStatus : '0,1,9'
        }`
        query += `&limit=${this.serverParams.perPage}&page=${this.serverParams.page}`
        query += `${this.filterByPoli ? '&poli_id='.concat(this.filterByPoli) : ''}`
        query
          += this.selectedSearch && this.searchTerm
            ? `&${this.selectedSearch}=${this.searchTerm}`
            : ''
        const { data: res } = await fetchApi.pemeriksaan.getAntrianVerifikasi(
          query,
        )
        const { data } = res
        this.rows = data
        this.totalRecords = res.total
      } catch (error) {
        console.log(error)
      }
    },
    interval() {
      this.saveInterval = setInterval(() => {
        this.init()
      }, 60 * 1000)
    },
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
