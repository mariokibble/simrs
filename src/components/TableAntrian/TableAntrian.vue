<template>
  <b-card>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <div>
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="mr-1">Filter</label>
            <SelectPoli @selected="changeEntry('filterValue', ...arguments)" />
          </div>
        </b-form-group>
      </div>
      <div class="custom-search">
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="mr-1">Search</label>
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>

    </div>
    <!-- TODO: + filter poli -->
    <!-- table -->
    <vue-good-table
      mode="remote"
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
        <span
          v-if="props.column.field === 'user.tanggal_lahir'"
          class="text-nowrap"
        >
          <FormatDate :date="props.row.user.tanggal_lahir" />
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <!-- TODO: update TTV => pindah ke antrian =>   -->
            <!-- button detail, edit, delete, TTV, rekamedis -->
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item>
                <feather-icon
                  icon="BookOpenIcon"
                  class="mr-50"
                />
                <span>Detail</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="TargetIcon"
                  class="mr-50"
                />
                <span>Update TTV</span>
              </b-dropdown-item>
            </b-dropdown>
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
    </vue-good-table>
  </b-card>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BCard,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import SelectPoli from '@/components/SelectPoli/SelectPoli.vue'
import store from '@/store/index'
import FormatDate from '@/components/FormatDate/FormatDate.vue'
import fetchApi from '@/api/index'

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BCard,
    FormatDate,
    SelectPoli,
  },
  data() {
    return {
      isLoading: false,
      dir: false,
      columns: [
        //   No Antrian, Nama, Tanggal Lahir, NRM, Poli, DPJP, Status TTV , Action.
        {
          label: 'No Antrian',
          field: 'kode_antrian',
        },
        {
          label: 'Nama',
          field: 'user.nama',
        },
        {
          label: 'Poli',
          field: 'poli.nama',
        },
        {
          label: 'Tanggal Lahir',
          field: 'user.tanggal_lahir',
        },
        {
          label: 'Jenis Kelamin',
          field: 'user.jenis_kelamin',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      totalRecords: 0,
      searchTerm: '',
      filterValue: '',
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
  },
  watch: {
    async filterValue() {
      this.isLoading = true
      this.updateParams({
        page: 1,
        perPage: 10,
      })
      await this.loadItems()
      this.isLoading = false
    },
  },
  async created() {
    this.loadItems()
  },
  methods: {
    changeEntry(key, value) {
      this[key] = value
    },
    updateParams(newProps) {
      this.serverParams = { ...this.serverParams, ...newProps }
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
    // eslint-disable-next-line no-unused-vars
    onSearch(params) {
      // TODO: debounce and fetch items by search
      // console.log(params)
    },
    async loadItems() {
      try {
        const { data: res } = await fetchApi.pemeriksaan.getAntrianRajal({ perPage: this.serverParams.perPage, page: this.serverParams.page, poli: this.filterValue })
        const { data } = res
        this.rows = data
        this.totalRecords = res.total
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss" >
    @import '@core/scss/vue/libs/vue-good-table.scss';
</style>
