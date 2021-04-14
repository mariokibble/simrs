<template>
  <b-row>
    <b-col
      cols="12"
      class="mb-2"
    >
      <ValidationProvider
        #default="{ errors }"
        name="Keluhan Utama"
        rules="required"
      >
        <b-input-group
          prepend="Keluhan Utama * :"
          class="input-group-merge"
        >
          <b-form-textarea
            autofocus="autofocus"
            :value="formState[FORM_TYPES.KELUHAN_UTAMA]"
            @input="setEntry(FORM_TYPES.KELUHAN_UTAMA, ...arguments)"
          />
        </b-input-group>
        <small class="text-danger">{{ errors[0] }}</small>
      </ValidationProvider>
    </b-col>
    <b-col
      cols="12"
      class="mb-2"
    >
      <b-input-group
        prepend="Tekanan darah :"
        append="mmHg"
        class="input-group-merge"
      >
        <b-form-input
          v-model="tekananDarah"
          name="tekananDarah"
          type="number"
          placeholder="120"
          style="border-right: none !important;"
        />
        <b-input-group-text
          class="border-right-0 border-left-0"
          style="border-radius:0;"
        >
          /
        </b-input-group-text>
        <b-form-input
          v-model="tekananDarahPer"
          name="tekananDarah"
          type="number"
          placeholder="80"
          required="required"
        />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <ValidationProvider
        #default="{ errors }"
        name="Nadi"
        rules="required"
      >
        <b-input-group
          prepend="Nadi * :"
          append="x/menit"
          class="input-group-merge"
        >
          <b-form-input
            :value="formState[FORM_TYPES.NADI]"
            type="number"
            @input="setEntry(FORM_TYPES.NADI, ...arguments)"
          />
        </b-input-group>
        <small class="text-danger">{{ errors[0] }}</small>
      </ValidationProvider>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <ValidationProvider
        #default="{ errors }"
        name="Pernapasan"
        rules="required"
      >
        <b-input-group
          prepend="Pernapasan * :"
          append="x/menit"
          class="input-group-merge"
        >
          <b-form-input
            :value="formState[FORM_TYPES.PERNAPASAN]"
            type="number"
            @input="setEntry(FORM_TYPES.PERNAPASAN, ...arguments)"
          />
        </b-input-group>
        <small class="text-danger">{{ errors[0] }}</small>
      </ValidationProvider>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group
        prepend="Suhu tubuh * :"
        append="oC"
        class="input-group-merge"
      >
        <b-form-input
          :value="formState[FORM_TYPES.SUHU_TUBUH]"
          type="number"
          @input="setEntry(FORM_TYPES.SUHU_TUBUH, ...arguments)"
        />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group
        prepend="Saturasi :"
        append="%"
        class="input-group-merge"
      >
        <b-form-input
          :value="formState[FORM_TYPES.SATURASI]"
          type="number"
          @input="setEntry(FORM_TYPES.SATURASI, ...arguments)"
        />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group

        prepend="Berat badan :"
        append="kg"
        class="input-group-merge"
      >
        <b-form-input
          :value="formState[FORM_TYPES.BERAT_BADAN]"
          type="number"
          @input="setEntry(FORM_TYPES.BERAT_BADAN, ...arguments)"
        />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group
        prepend="Tinggi badan :"
        append="cm"
        class="input-group-merge"
      >
        <b-form-input
          :value="formState[FORM_TYPES.TINGGI_BADAN]"
          type="number"
          @input="setEntry(FORM_TYPES.TINGGI_BADAN, ...arguments)"
        />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group
        prepend="Lingkar kepala :"
        append="cm"
        class="input-group-merge"
      >
        <b-form-input
          :value="formState[FORM_TYPES.LINGKAR_KEPALA]"
          type="number"
          @input="setEntry(FORM_TYPES.LINGKAR_KEPALA, ...arguments)"
        />
      </b-input-group>
    </b-col>
    <b-col>
      <small> <b>*</b> <font class="text-warning">Wajib di isi</font>  </small>
    </b-col>
  </b-row>
</template>
<script>
import {
  BRow, BCol, BFormInput, BInputGroup, BFormTextarea, BInputGroupText,
} from 'bootstrap-vue'
import { mapState, mapMutations } from 'vuex'
import { FORM_TYPES } from '@/store/ttv'
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
    BFormTextarea,
    BInputGroupText,
    ValidationProvider,
  },
  data() {
    return {
      tekananDarah: null,
      tekananDarahPer: null,
      FORM_TYPES,
    }
  },
  computed: {
    ...mapState('ttv', ['formState']),
  },
  watch: {
    tekananDarah(val) {
      this.setEntry(this.FORM_TYPES.TEKANAN_DARAH, `${val}/${this.tekananDarahPer === null ? 0 : this.tekananDarahPer}`)
    },
    tekananDarahPer(val) {
      this.setEntry(this.FORM_TYPES.TEKANAN_DARAH, `${this.tekananDarah === null ? 0 : this.tekananDarah}/${val}`)
    },
  },
  methods: {
    ...mapMutations('ttv', ['SET_ENTRY_FORM']),
    setEntry(key, value) {
      this.SET_ENTRY_FORM({ key, value })
    },
  },

}
/*
    1. Keluhan utama (wajib)
    2. Tekanan darah (mmHg) (wajib kecuali bayi dan anak opsional)
    3. Nadi (x/menit) (wajib)
    4. Pernapasan (x/menit) (wajib)
    5. Suhu tubuh (oC) (wajib)
    6. Saturasi (%) (opsional)
    7. Berat badan (kg) (opsional)
    8. Tinggi badan (cm) (opsional)
    9. Lingkar kepala (cm) (opsional)
*/
</script>
