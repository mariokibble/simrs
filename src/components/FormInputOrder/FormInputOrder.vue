<template>
  <div>
    <CardBorder
      v-for="order in rows"
      :key="order.id"
      class="mt-25 p-25"
    >
      <b-form-group
        v-slot="{ ariaDescribedby }"
        :label="order.nama"
        label-class="text-uppercase font-weight-bold"
      >
        <b-form-checkbox-group
          :id="order.nama"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          :name="order.nama"
        >
          <b-form-checkbox
            v-for="(layanan) in order.layanans"
            :key="`layanan-${layanan.id}`"
            :value="layanan.id"
            class="mb-1"
          >
            {{ layanan.nama }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </CardBorder>
  </div>
</template>
<script>
import CardBorder from '@/components/CardBorder/CardBorder.vue'
import { BFormGroup, BFormCheckboxGroup, BFormCheckbox } from 'bootstrap-vue'

export default {
  components: {
    CardBorder,
    BFormGroup,
    BFormCheckboxGroup,
    BFormCheckbox,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [], // Must be an array reference!
    }
  },
  watch: {
    selected(val) {
      this.$emit('setEntry', val)
    },
  },
}
</script>
