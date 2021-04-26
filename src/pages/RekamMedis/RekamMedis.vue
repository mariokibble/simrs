<template>
  <div>
    <HeaderRekamMedis />
    <BodyRekamedis />
  </div>

</template>
<script>
import HeaderRekamMedis from '@/components/HeaderRekamMedis/HeaderRekamMedis.vue'
import BodyRekamedis from '@/components/BodyRekamedis/BodyRekamedis.vue'
// import { BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    HeaderRekamMedis,
    BodyRekamedis,
  },
}
</script>
