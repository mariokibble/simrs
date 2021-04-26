<template>
  <div>
    <div v-if="rows.length === 0">
      loading...
    </div>
    <CardBorder
      v-for="row in rows"
      :key="row.id"
      class="mt-25 p-25"
    >
      <b-form-group
        v-slot="{ ariaDescribedby }"
        :label="row.nama"
        label-class="text-uppercase font-weight-bold"
      >
        <b-form-checkbox-group
          :id="row.nama"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          :name="row.nama"
        >
          <b-form-checkbox
            v-for="layanan in row.layanans"
            :key="`layanan-${layanan.id}`"
            :value="layanan.id"
            class="mb-25"
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
import fetchApi from '@/api'

export default {
  components: {
    CardBorder,
    BFormGroup,
    BFormCheckboxGroup,
    BFormCheckbox,
  },
  data() {
    return {
      selected: [], // Must be an array reference!
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' },
      ],
      rows: [],
    }
  },
  async created() {
    try {
      const { data } = await fetchApi.laboratorium.getLayanan()
      this.rows = data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
