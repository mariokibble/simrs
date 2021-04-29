<template>
  <div>
    <b-form-group
      v-slot="{ ariaDescribedby }"
      label="Proritas: "
      label-cols-lg="2"
    >
      <b-form-radio-group
        v-model="isPrioritas"
        :options="priotitasOptions"
        :aria-describedby="ariaDescribedby"
        name="isPrioritas"
        class="mt-25 pt-25"
      />
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormRadioGroup } from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormRadioGroup,
  },
  data() {
    return {
      isPrioritas: '0',
      priotitasOptions: [
        { text: 'Cito', value: '1' },
        { text: 'Non Cito', value: '0' },
      ],
    }
  },
  watch: {
    isPrioritas(val) {
      this.$emit('isPrioritas', val)
    },
  },
  async created() {
    this.$emit('isPrioritas', this.isPrioritas)
  },
}
</script>
