<template>
  <b-card>
    <h3>Foto KTP</h3>
    <b-img
      thumbnail
      :src="uri"
      alt="KTP"
      height="220px"
      width="440px"
      class="mt-1 ml-2"
      fluid
      @click="$emit('showModalImage', uri)"
    />
  </b-card>
</template>
<script>
import { BCard, BImg } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BImg,
  },
  props: {
    uri: {
      type: String,
      default: 'https://4.bp.blogspot.com/-lqq9K_exCY4/WLN8m_YmdUI/AAAAAAAAAGE/wx1S4_Yn_TQ6IbG-Lm4QbJlZ1uhshjmWgCLcB/s1600/ktp.jpg',
    },
  },
}
</script>
