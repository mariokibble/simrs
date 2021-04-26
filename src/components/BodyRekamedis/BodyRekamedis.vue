<template>
  <b-row>
    <b-col lg="12">
      <ButtonTab />
    </b-col>
    <b-col lg="12">
      <router-view />
    </b-col>
  </b-row>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue'
import ButtonTab from './ButtonTab.vue'

export default {
  components: {
    BRow,
    BCol,
    ButtonTab,
  },
}
</script>
