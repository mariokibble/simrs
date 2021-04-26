<template>
  <b-row>
    <b-col lg="3">
      <SideBar>
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
    <b-col>
      <Content>
        <div>
          <h2>Order Radiologi</h2>
        </div>
      </Content>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BButton } from 'bootstrap-vue'
import SideBar from './SideBar.vue'
import Content from './Content.vue'

export default {
  components: {
    BRow,
    BCol,
    SideBar,
    Content,
    BButton,
  },
  data() {
    return {
      btnSelected: 1,
      listButton: [
        {
          value: 1,
          text: 'Order Radiologi',
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
