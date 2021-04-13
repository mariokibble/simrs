<template>
  <b-row>
    <b-col
      cols="12"
      class="mb-2"
    >
      <b-input-group
        prepend="Keluhan Utama * :"
        class="input-group-merge"
      >
        <b-form-textarea autofocus="autofocus" />
      </b-input-group>
    </b-col>
    <b-col
      cols="12"
      class="mb-2"
    >
      <b-input-group
        prepend="Tekanan darah * :"
        append="mmHg"
        class="input-group-merge"
      >
        <b-form-input
          type="number"
          placeholder="120"
          style="border-right: none !important;"
        />
        <b-input-group-text class="border-right-0 border-left-0" style="border-radius:0;">/</b-input-group-text>
        <b-form-input
          type="number"
          placeholder="80"
        />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group
        prepend="Nadi * :"
        append="x/menit"
        class="input-group-merge"
      >
        <b-form-input type="number" />
      </b-input-group>
    </b-col>
    <b-col
      class="mb-2"
      cols="12"
    >
      <b-input-group
        prepend="Pernapasan * :"
        append="x/menit"
        class="input-group-merge"
      >
        <b-form-input type="number" />
      </b-input-group>
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
        <b-form-input type="number" />
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
        <b-form-input type="number" />
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
        <b-form-input type="number" />
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
        <b-form-input type="number" />
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
        <b-form-input type="number" />
      </b-input-group>
    </b-col>
  </b-row>
</template>
<script>
import {
  BRow, BCol, BFormInput, BFormGroup, BInputGroup, BInputGroupPrepend, BInputGroupAppend, BFormTextarea, BInputGroupText
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormTextarea,
   BInputGroupText
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
