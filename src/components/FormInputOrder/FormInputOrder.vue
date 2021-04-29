<template>
  <div>
    <!-- TODO: validate when there's no selected -->
    <CardBorder
      v-for="order in rows"
      :key="order.id"
      class="mt-25 p-25"
    >
      <b-form-group
        v-slot="{ ariaDescribedby }"
        :label="order.nama"
        label-class="text-uppercase font-weight-bold"
        content-cols-lg="12"
      >
        <b-form-checkbox-group
          :id="order.nama"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          :name="order.nama"
          class="row"
        >
          <b-col
            v-for="(layanan) in order.layanans"
            :key="`layanan-${layanan.id}`"
            lg="4"
            @change="autoCheckList ? changed(...arguments, layanan.id) : null"
          >
            <b-form-checkbox
              :value="layanan.id"
            >
              {{ layanan.nama }}
            </b-form-checkbox>
          </b-col>
        </b-form-checkbox-group>
      </b-form-group>
    </CardBorder>
  </div>
</template>
<script>
import CardBorder from '@/components/CardBorder/CardBorder.vue'
import {
  BFormGroup, BFormCheckboxGroup, BFormCheckbox, BCol,
} from 'bootstrap-vue'

export default {
  components: {
    CardBorder,
    BFormGroup,
    BFormCheckboxGroup,
    BFormCheckbox,
    BCol,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    autoCheckList: {
      type: Object,
      default: null,
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
  methods: {
    changed(e, id) {
      const isChecked = e.target.checked
      if (Number(this.autoCheckList.trigger) === Number(id) && isChecked) {
        this.selected = this.autoCheckList.list
        // console.log(this.autoCheckList)
      } else if (Number(this.autoCheckList.trigger) === Number(id) && !isChecked) {
        this.selected = []
      }
    },
  },
}
</script>
