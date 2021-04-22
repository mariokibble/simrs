<template>
  <b-card>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <div>
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="mr-1">Filter</label>
            <SelectTanggalAppointment
              class="mr-1"
              @selected="changeEntry('filterByTanggalKedatangan', ...arguments)"
            />
            <SelectStatusKehadiran @selected="changeEntry('filterByStatus', ...arguments)" />
          </div>
        </b-form-group>
      </div>
      <div class="custom-search mr-5">
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="col-3 text-right">Search</label>
            <SelectSearchKehadiran
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
      :row-style-class="rowStyleClassFn"
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
        <span v-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ statusText(props.row.status) }}
          </b-badge>
        </span>

        <span v-else-if="props.column.field === 'user.nama'">
          <b>
            {{ prefixName({
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
          v-else-if="props.column.field === 'user.no_handphone'"
        >
          {{
            props.row.user.no_handphone
              ? props.row.user.no_handphone
              : props.row.user.carrier_by
                ? props.row.user.carrier_by.no_handphone
                : ''
          }}
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <!-- button detail, edit, delete, TTV, rekamedis -->
            <b-button
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              v-b-tooltip.hover.top="'Lihat detail'"
              variant="flat-success"
              class="btn-icon"
            >
              <feather-icon icon="EyeIcon" />
            </b-button>

            <b-button
              v-b-tooltip.hover.top="'Tandai sudah di telpon'"
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon"
              @click="tandaiSudahDiTelpon(props.row.id)"
            >
              <feather-icon icon="PhoneForwardedIcon" />
            </b-button>

            <b-button
              v-b-tooltip.hover.top="'Hapus'"
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon"
              @click="$emit('deletePemeriksaan', { id:props.row.id, kodeAntrian: props.row.kode_antrian })"
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
              :options="['3','5','10']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
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
              @input="(value)=>props.pageChanged({currentPage:value})"
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
      <div
        slot="emptystate"
        class="text-center"
      >
        Data kehadiran tidak ada
      </div>
    </vue-good-table>
  </b-card>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BButton, VBTooltip, BBadge,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import FormatDate from '@/components/FormatDate/FormatDate.vue'
import fetchApi from '@/api/index'
import Ripple from 'vue-ripple-directive'
import { debounce } from 'debounce'
import addPrefixName from '@/utils/addPrefixName'
import { getDateWithoutHours } from '@/utils/getDate'
import SelectSearchKehadiran from './SelectSearchKehadiran.vue'
import SelectTanggalAppointment from './SelectTanggalAppointment.vue'
import SelectStatusKehadiran from './SelectStatusKehadiran.vue'

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BCard,
    FormatDate,
    BButton,
    SelectSearchKehadiran,
    BBadge,
    SelectTanggalAppointment,
    SelectStatusKehadiran,
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
          field: 'kode_antrian',
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
          label: 'No Handphone',
          field: 'user.no_handphone',
        },
        {
          label: 'DPJP',
          field: 'dokter.user.nama',
        },
        {
          label: 'Kehadiran',
          field: 'status',
        },
        {
          label: 'Tanggal Appointment',
          field: 'tanggal_periksa',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      totalRecords: 0,
      searchTerm: '',
      selectedSearch: null,
      filterByTanggalKedatangan: getDateWithoutHours(),
      filterByStatus: '',
      serverParams: {
        columnFilters: {
        },
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
    statusVariant() {
      const statusColor = {
        1: 'light-warning',
        2: 'light-success',
      }
      return status => statusColor[status]
    },
    statusText() {
      const text = {
        1: 'Belum Hadir',
        2: 'Sudah Hadir',
      }

      return status => text[status]
    },
  },
  watch: {
    filterByTanggalKedatangan() {
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
    async tandaiSudahDiTelpon(id) {
      const newData = []
      let newTandaiSudahDitelpon
      this.rows.forEach(item => {
        const { is_kontak: tandaiSudahDibaca } = item
        newTandaiSudahDitelpon = tandaiSudahDibaca
        if (item.id === id) {
          newTandaiSudahDitelpon = !tandaiSudahDibaca
        }
        newData.push({ ...item, is_kontak: newTandaiSudahDitelpon })
      })
      await fetchApi.pemeriksaan.updatePemeriksaan({
        id,
        is_kontak: newTandaiSudahDitelpon ? 1 : 0,
      })
      this.rows = newData
    },
    rowStyleClassFn(row) {
      return row.is_kontak ? 'bg-info bg-lighten-4' : ''
    },
    updateParams(newProps) {
      this.serverParams = { ...this.serverParams, ...newProps }
    },
    updateParamsToDefault() {
      this.serverParams = {
        columnFilters: {
        },
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
        sort: [{
          type: params.sortType,
          field: this.columns[params.columnIndex].field,
        }],
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
        query += `&status=${this.filterByStatus ? this.filterByStatus : '1,2'}`
        query += `&limit=${this.serverParams.perPage}&page=${this.serverParams.page}`
        query += this.selectedSearch && this.searchTerm ? `&${this.selectedSearch}=${this.searchTerm}` : ''
        query += `${this.filterByTanggalKedatangan ? '&tanggal_periksa='.concat(this.filterByTanggalKedatangan) : ''}`
        const { data: res } = await fetchApi.pemeriksaan.getKehadiran(query)
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
<style lang="scss" >
    @import '@core/scss/vue/libs/vue-good-table.scss';
</style>
