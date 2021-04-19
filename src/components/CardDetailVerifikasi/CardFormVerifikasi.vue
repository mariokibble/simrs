<template>
  <ValidationObserver
    ref="formVerifikasi"
    tag="form"
  >
    <b-card>
      <b-row>
        <b-col lg="12">
          <b-row>
            <b-col>
              <b-button
                class="btn-block"
                :variant="notesBy === 0 ? 'success' : 'warning'"
                @click="notesBy = 0; selected = [], isNoteCustom = false, noteCustom = ''"
              >
                Verifikasi
              </b-button>
            </b-col>
            <b-col>
              <b-button
                class="btn-block"
                :variant="notesBy === 1 ? 'success' : 'warning'"
                @click="notesBy = 1; selected = [], isNoteCustom = false, noteCustom = ''"
              >
                Verifikasi dengan catatan
              </b-button>
            </b-col>
            <b-col>
              <b-button
                class="btn-block"
                :variant="notesBy === 2 ? 'success' : 'warning'"
                @click="notesBy = 2; selected = [], isNoteCustom = false, noteCustom = ''"
              >
                Tolak dengan catatan
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          lg="12"
          class="d-flex justify-content-center mt-2"
        >
          <div class="w-75">
            <div v-if="notesBy !== 0">
              <p>Catatan: </p>
              <div>

                <ValidationProvider
                  #default="{ errors }"
                  name="Catatan tambahan"
                  :rules="!isNoteCustom ? 'required' : ''"
                >
                  <b-form-checkbox
                    v-for="option in notes[notesBy]"
                    :key="option.value"
                    v-model="selected"
                    :value="option.value"
                    aria-describedby="Catatan:"
                    name="catatan-tambahan"
                    class="mb-1"
                  >
                    {{ option.text }}
                  </b-form-checkbox>
                  <b-form-checkbox
                    id="note-kustom"
                    v-model="isNoteCustom"
                    name="note-kustom"
                    :value="true"
                    :unchecked-value="false"
                  >
                    Ketik di sini
                  </b-form-checkbox>
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
                <ValidationProvider
                  v-if="isNoteCustom"
                  #default="{ errors }"
                  name="Catatan tambahan"
                  :rules="selected.length === 0 ? 'required' : ''"
                >
                    <b-form-textarea
                      id="noteCustomTextarea"
                      v-model="noteCustom"
                      placeholder="tulis di sini..."
                      rows="3"
                      max-rows="6"
                  ></b-form-textarea>
                   <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
            <div
              v-else
              class="text-center"
            >
              Verifikasi tanpa catatan
            </div>
          </div>
        </b-col>
        <b-col class="d-flex justify-content-end mt-2">
          <!-- {{selected}} -->
          <b-button
            variant="warning"
            @click="submit"
          >
            Submit
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </ValidationObserver>
</template>
<script>
import {
  BRow, BCol, BCard, BButton, BFormCheckbox, BFormTextarea
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BFormCheckbox,
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    required,
    BFormTextarea,
  },
  data() {
    return {
      notesBy: 0,
      selected: [],
      isNoteCustom: false,
      noteCustom: '',
      notes: {
        0: [],
        1: [
          {
            text: 'Foto KTP tidak jelas, harap membawa KTP asli saat datang ke RS',
            value: 'Foto KTP tidak jelas, harap membawa KTP asli saat datang ke RS',
          },
          {
            text: 'Status kepersetaan BPJS bermasalah karena premi belum dibayar, harap datang ke bagian BPJS di RS untuk pengurusan masalah kepesertaan',
            value: 'Status kepersetaan BPJS bermasalah karena premi belum dibayar, harap datang ke bagian BPJS di RS untuk pengurusan masalah kepesertaan',
          },
          {
            text: 'Untuk penjelasan selanjutnya silahkan menghubungi Customer Service',
            value: 'Untuk penjelasan selanjutnya silahkan menghubungi Customer Service',
          },
        ],
        2: [
          {
            text: 'Status kepersetaan BPJS bermasalah karena premi belum dibayar, harap datang ke bagian BPJS di RS untuk pengurusan masalah kepesertaan',
            value: 'Status kepersetaan BPJS bermasalah karena premi belum dibayar, harap datang ke bagian BPJS di RS untuk pengurusan masalah kepesertaan',
          },
          {
            text: 'Status kepesertaan asuransi bermasalah karena premi belum dibayar, harap melakukan konfirmasi ke asuransi untuk pengurusan masalah kepesertaan',
            value: 'Status kepesertaan asuransi bermasalah karena premi belum dibayar, harap melakukan konfirmasi ke asuransi untuk pengurusan masalah kepesertaan',
          },
          {
            text: 'Foto kartu asuransi tidak jelas, harap melakukan foto ulang dan melakukan pendaftaran ulang',
            value: 'Foto kartu asuransi tidak jelas, harap melakukan foto ulang dan melakukan pendaftaran ulang',
          },
          {
            text: 'Untuk penjelasan selanjutnya silahkan menghubungi Customer Service',
            value: 'Untuk penjelasan selanjutnya silahkan menghubungi Customer Service',
          },
        ],
      },
    }
  },
  methods: {
    async checkValidateForm() {
      return new Promise((resolve, reject) => (async () => {
        const validated = await this.$refs.formVerifikasi.validate()
        if (!validated) {
          return reject()
        }
        return resolve(true)
      })())
    },
    async submit() {
      if (await this.checkValidateForm()) {
        if (this.isNoteCustom && this.noteCustom) {
          this.selected.push(this.noteCustom)
        }
        this.$emit('submitted', { catatan: this.selected, status: this.notesBy })
      }
    },
  },
}
</script>
