<template>
  <div>
    <b-row>
      <b-col lg="2">
        <SideBar
          class="sticky-top"
          style="top: 70px"
        >
          <b-button
            v-for="btn in listButton"
            :key="btn.value"
            :variant="btnSelected === btn.value ? 'warning' : 'success'"
            class="mb-1 btn-block"
            @click="btnSelected = btn.value"
          >
            {{ btn.text }}
          </b-button>
        </SideBar>
      </b-col>
      <b-col lg="10">
        <Content>
          <div>
            <CardBorder>
              <b-button
                variant="flat-dark"
                @click="$refs.modalLayananLaboratorium.show()"
              >
                <feather-icon icon="PlusSquareIcon" />
                Order Laboratorium
              </b-button>
            </CardBorder>
            <CardBorder class="p-1">
              <BioHistoryLaboratorium />
              <TableHistoryLaboratorium />
            </CardBorder>
          </div>
        </Content>
      </b-col>
    </b-row>
    <!-- Todo: Lazy load modal -->
    <b-modal
      ref="modalLayananLaboratorium"
      size="lg"
      title="Order Laboratorium"
      ok-variant="secondary"
      cancel-variant="danger"
      ok-title="Simpan"
      cancel-title="Batalkan"
      :static="true"
      :lazy="false"
    >
      <ContentHeadModal />
      <FormInputLayanan />
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton, BModal,
} from 'bootstrap-vue'
import CardBorder from '@/components/CardBorder/CardBorder.vue'
import ContentHeadModal from '@/components/ContentLaboratorium/ContentHeadModal.vue'
import FormInputLayanan from '@/components/ContentLaboratorium/FormInputLayanan.vue'
import BioHistoryLaboratorium from '@/components/ContentLaboratorium/BioHistoryLaboratorium.vue'
import TableHistoryLaboratorium from '@/components/ContentLaboratorium/TableHistoryLaboratorium.vue'

import SideBar from './SideBar.vue'
import Content from './Content.vue'

export default {
  components: {
    BRow,
    BCol,
    SideBar,
    Content,
    BButton,
    CardBorder,
    BModal,
    ContentHeadModal,
    FormInputLayanan,
    BioHistoryLaboratorium,
    TableHistoryLaboratorium,
  },
  data() {
    return {
      btnSelected: 1,
      listButton: [
        {
          value: 1,
          text: 'Order Lab',
        },
        {
          value: 2,
          text: '1 Maret 2021',
        },
        {
          value: 3,
          text: '20 February 2021',
        },
      ],
    }
  },
}
</script>
