<template>
  <span>
    <b-button
      :id="`pop-over-${pemeriksaanId}`"
      v-b-tooltip.hover.top="'Hapus'"
      v-ripple.400="'rgba(40, 199, 111, 0.15)'"
      variant="flat-success"
      class="btn-icon"
    >
      <feather-icon icon="TrashIcon" />
    </b-button>
    <b-popover
      ref="popover"
      :target="`pop-over-${pemeriksaanId}`"
      title="Popover"
    >
      Hello <strong>World!</strong>
    </b-popover>
  </span>
</template>
<script>

import { BButton, VBTooltip } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  props: {
    pemeriksaanId: {
      type: Number,
      required: true,
    },
  },
  created() {
    console.log(this.pemeriksaanId)
  },
}
</script>
