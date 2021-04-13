<template>
  <div>
    <TableAntrian />
    <b-modal
      id="modal-antrian-rajal"
      ref="modalUpdateTtv"
      ok-variant="dark"
      ok-title="Simpan"
      cancel-title="Batalkan"
      modal-class="modal-dark"
      centered
      title="Pemeriksaan Tanda-Tanda Vital"
      class="p-0"
    >
      <ModalTtvAwalRajal />
    </b-modal>
  </div>
</template>
<script>

import TableAntrian from '@/components/TableAntrian/TableAntrian.vue'
import { BModal } from 'bootstrap-vue'
import ModalTtvAwalRajal from '@/components/ModalTtvAwalRajal/ModalTtvAwalRajal.vue'

export default {
  components: {
    TableAntrian,
    BModal,
    ModalTtvAwalRajal,
  },
  mounted() {
    this.$refs.modalUpdateTtv.show()
  },
}
</script>
