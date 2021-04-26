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
    >
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Name -->
        <span
          v-if="props.column.field === 'fullName'"
          class="text-nowrap"
        >
          <b-avatar
            :src="props.row.avatar"
            class="mx-1"
          />
          <span class="text-nowrap">{{ props.row.fullName }}</span>
        </span>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ props.row.status }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
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
            </b-dropdown>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import {
  BAvatar, BBadge, BDropdownItem, BDropdown,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BDropdownItem,
    BDropdown,
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Name',
          field: 'fullName',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Date',
          field: 'startDate',
        },
        {
          label: 'Salary',
          field: 'salary',
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
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
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
  created() {
    this.rows = [
      {
        mode: 'span',
        label: 'Accountant',
        html: false,
        children: [
          {
            id: 1,
            avatar: require('@/assets/images/avatars/10-small.png'),
            fullName: "Korrie O'Crevy",
            email: 'kocrevy0@thetimes.co.uk',
            startDate: '09/23/2016',
            salary: '$23896.35',
            experience: '1 Year',
            status: 'Professional',
          },
        ],
      },
      {
        mode: 'span',
        label: 'Actuary',
        children: [
          {
            id: 2,
            avatar: require('@/assets/images/avatars/1-small.png'),
            fullName: 'Bailie Coulman',
            email: 'bcoulman1@yolasite.com',
            startDate: '05/20/2018',
            salary: '$13633.69',
            status: 'Current',
          },
        ],
      },
      {
        mode: 'span',
        label: 'Administrative Assistan',
        children: [
          {
            id: 3,
            avatar: require('@/assets/images/avatars/9-small.png'),
            fullName: 'Stella Ganderton',
            email: 'sganderton2@tuttocitta.it',
            startDate: '03/24/2018',
            salary: '$13076.28',
            status: 'Applied',
          },
          {
            id: 4,
            avatar: require('@/assets/images/avatars/3-small.png'),
            fullName: 'Dorolice Crossman',
            email: 'dcrossman3@google.co.jp',
            startDate: '12/03/2017',
            salary: '$12336.17',
            status: 'Professional',
          },
          {
            id: 5,
            avatar: require('@/assets/images/avatars/4-small.png'),
            fullName: 'Harmonia Nisius',
            email: 'hnisius4@gnu.org',
            startDate: '08/25/2017',
            salary: '$10909.52',
            status: 'Resigned',
          },
        ],
      },
      {
        mode: 'span',
        label: 'Analog Circuit Design manager',
        children: [
          {
            id: 6,
            avatar: require('@/assets/images/avatars/5-small.png'),
            fullName: 'Genevra Honeywood',
            email: 'ghoneywood5@narod.ru',
            startDate: '06/01/2017',
            salary: '$17803.8',
            experience: '1 Year',
            status: 'Current',
          },
          {
            id: 7,
            avatar: require('@/assets/images/avatars/7-small.png'),
            fullName: 'Eileen Diehn',
            email: 'ediehn6@163.com',
            startDate: '10/15/2017',
            salary: '$18991.67',
            status: 'Professional',
          },
        ],
      },
      {
        mode: 'span',
        label: 'Analyst Programmer',
        children: [
          {
            id: 8,
            avatar: require('@/assets/images/avatars/9-small.png'),
            fullName: 'Richardo Aldren',
            email: 'raldren7@mtv.com',
            startDate: '11/05/2016',
            salary: '$19230.13',
            status: 'Rejected',
          },
          {
            id: 9,
            avatar: require('@/assets/images/avatars/2-small.png'),
            fullName: 'Allyson Moakler',
            email: 'amoakler8@shareasale.com',
            startDate: '12/29/2018',
            salary: '$11677.32',
            status: 'Applied',
          },
          {
            id: 10,
            avatar: require('@/assets/images/avatars/6-small.png'),
            fullName: 'Merline Penhalewick',
            email: 'mpenhalewick9@php.net',
            startDate: '04/19/2019',
            salary: '$15939.52',
            status: 'Professional',
          },
        ],
      },
    ]
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
