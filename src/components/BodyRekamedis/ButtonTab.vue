<template>
  <div>
    <b-button
      v-for="btn in listButton"
      :key="btn.value"
      :variant="btnSelected === btn.value ? 'success' : 'warning'"
      class="mr-1 mb-1"
      @click="btnSelected = btn.value, $router.push(`/rekam-medis/${$route.params.id}/${btn.value}`)"
    >
      {{ btn.text }}
    </b-button>
  </div>
</template>
<script>
import { BButton } from 'bootstrap-vue'

export default {
  components: {
    BButton,
  },
  data() {
    return {
      btnSelected: 0,
      listButton: [
        {
          value: 'pengkajian-awal',
          text: 'Pengkajian Awal',
        },
        {
          value: 'resep',
          text: 'Resep',
        },
        {
          value: 'laboratorium',
          text: 'Laboratorium',
        },
        {
          value: 'radiologi',
          text: 'Radiologi',
        },
        {
          value: 'cppt',
          text: 'CPPT',
        },
        {
          value: 'pengkajian-perawat-rajal',
          text: 'Pengkajian Perawat Rajal',
        },
        {
          value: 'resume-medis',
          text: 'Resume Medis',
        },
        {
          value: 'care-plan',
          text: 'Care Plan',
        },
        {
          value: 'dpo',
          text: 'DPO',
        },
        {
          value: 'edukasi',
          text: 'Edukasi',
        },
        {
          value: 'resume-medis-rajal',
          text: 'Resume Medis Rajal',
        },
      ],
    }
  },
  created() {
    const { content } = this.$route.params
    const foundContent = this.listButton.filter(btn => btn.value === content)[0]
    this.btnSelected = foundContent?.value || 'pengkajian-awal'
  },
}
</script>
