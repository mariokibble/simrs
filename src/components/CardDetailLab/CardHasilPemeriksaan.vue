<template>
  <b-card>
    <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :group-options="{
            enabled: true
        }"
    >
    </vue-good-table>
  </b-card>
</template>
<script>
import { BCard } from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table'
export default {
  components: {
    BCard,
  },
};
</script>
