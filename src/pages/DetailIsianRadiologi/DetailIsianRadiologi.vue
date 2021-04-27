<template>
  <div>
    <div v-if="!fetching">
      <CardDataDiriLab
        :nama="formattedNama"
        :foto-profile="pemeriksaan.user.foto_profile"
        :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
        :asuransi="pemeriksaan.pemeriksaan.asuransi"
        :nrm="pemeriksaan.nrm"
        :tanggal-appointment="pemeriksaan.nrm"
        :poliklinik-tujuan="pemeriksaan.pemeriksaan.poli.nama"
        :dokter="pemeriksaan.dokter_pengirim.user.nama"
      />
      <CardPemeriksaan
        :tanggal-pemeriksaan="pemeriksaan.pemeriksaan.tanggal_periksa"
        :tanggal-hasil="pemeriksaan.pemeriksaan.tanggal_periksa"
        :dokter="pemeriksaan.dokter_radiologi.user.nama"
        :petugas="pemeriksaan.petugas_radiologi.user.nama"
        :prioritas="pemeriksaan.pemeriksaan.is_prioritas"
      />
      <template>
        <b-card>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :group-options="{
              enabled: true,
            }"
            @on-row-click="clikBaris"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <!-- Column: Action -->
              <span v-if="props.column.field === 'action'">
                <span>
                  <b-button
                    v-b-tooltip.hover.top="'Update image dan expertise'"
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    variant="flat-success"
                    class="btn-icon"
                    @click="tampilkanModal(props.row.id)"
                  >
                    <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button
                    v-b-tooltip.hover.top="'Hapus'"
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    variant="flat-success"
                    class="btn-icon"
                    @click="
                      $emit('deleteVerifikasi', {
                        id: props.row.id,
                      })
                    "
                  >
                    <feather-icon icon="TrashIcon" />
                  </b-button>
                </span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
          <b-col class="d-flex justify-content-end mt-2">
            <b-button
              variant="warning"
              @click.prevent="submit"
            >
              Simpan
            </b-button>
          </b-col>
        </b-card>
      </template>
      <b-modal
        id="modal-1"
        ref="modalUploadImageExpertise"
        title="Upload Image dan expertise"
        centered
        hide-footer
      >
        <form @submit.prevent="">
          <b-form-group
            label="Upload Profile Photo (optional)"
            label-for="photo_id"
          >
            <b-form-file
              id="photo_id"
              placeholder="Choose a file..."
              accept=".jpg, .jpeg, .png"
              @change="editAttachImage"
            />
          </b-form-group>

          <b-form-group
            label="Ekspertise"
            label-for="ekspertise"
          >
            <b-form-input type="text" />
          </b-form-group>

          <b-row>
            <b-col class="text-left">
              <b-button variant="warning">
                Cancel
              </b-button>
            </b-col>
            <b-col class="text-right">
              <b-button
                type="submit"
                variant="secondary"
                class="mr-2"
              >Update</b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>
    </div>
    <div v-else>
      loading ...
    </div>
  </div>
</template>

<script>
import CardDataDiriLab from '@/components/CardDetailLab/CardDataDiriLab.vue'
import CardPemeriksaan from '@/components/CardDetailRadiologi/CardPemeriksaan.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import addPrefixName from '@/utils/addPrefixName'
import {
  BCard,
  BButton,
  VBTooltip,
  BModal,
  BCol,
  BFormGroup,
  BFormInput,
  BFormFile,
  BRow,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import 'vue-good-table/dist/vue-good-table.css'

// import FormatDate from "@/components/FormatDate/FormatDate.vue";
import fetchApi from '@/api'

export default {
  components: {
    BCard,
    BButton,
    VueGoodTable,
    CardDataDiriLab,
    CardPemeriksaan,
    BModal,
    BCol,
    BFormInput,
    BFormGroup,
    BFormFile,
    BRow,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  data() {
    return {
      pemeriksaan: null,
      fetching: true,
      status: 0,
      columns: [
        {
          label: 'Jenis Pemeriksaan',
          field: 'nama',
          sortable: false,
        },
        {
          label: 'Hasil',
          field: 'hasil',
          sortable: false,
        },
        {
          label: 'Ekspertise',
          field: 'pemeriksaan.ekspertise',
          sortable: false,
        },
        {
          label: 'Aksi',
          field: 'action',
          sortable: false,
        },
      ],
      rows: [],
    }
  },
  computed: {
    radioId() {
      return this.$route.params.id
    },
    formattedNama() {
      const { user } = this.pemeriksaan
      const prefixName = addPrefixName({
        jenisKelamin: user.jenis_kelamin,
        statusPernikahan: user.pernikahan,
        tanggalLahir: user.tanggal_lahir,
      })
      return `${prefixName} ${user.nama}`
    },
  },
  created() {
    this.detailIsianRadiologi()
  },
  methods: {
    tampilkanModal() {
      this.$refs.modalUploadImageExpertise.show()
    },
    editAttachImage(evt) {
      const file = evt.target.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {}, false)
      reader.readAsDataURL(file)
    },
    clikBaris(params) {
      for (let a = 0; a < this.rows.length; a += 1) {
        for (let b = 0; b < this.rows[a].children.length; b += 1) {
          this.$set(this.rows[a].children[b], 'active', false)
        }
      }
      let jumlahIndex = 0
      for (let i = 0; i < this.rows.length; i += 1) {
        if (params.row.vgt_id === i) {
          const temp = i === 0
            ? params.row.originalIndex
            : params.row.originalIndex - jumlahIndex
          this.$set(
            this.rows[params.row.vgt_id].children[temp],
            'active',
            true,
          )
          break
        }
        jumlahIndex += this.rows[i].children.length
      }
    },
    detailIsianRadiologi() {
      fetchApi.pemeriksaan
        .getRadiologiById(this.radioId, 'rs_id=1')
        .then(res => {
          this.pemeriksaan = res.data
          this.fetching = false
          const sebentar = []
          for (let a = 0; a < this.pemeriksaan.data.length; a += 1) {
            const baru = this.pemeriksaan.data
            console.log(baru[a].nama)
            const parent = {
              mode: 'span',
              label: baru[a].nama,
              children: [],
            }
            for (let b = 0; b < baru[a].hasils.length; b += 1) {
              const hasil = baru[a].hasils[b]
              parent.children.push({
                id: hasil.id,
                nama: hasil.layanan.nama,
                hasil: hasil.hasil,
                expertise: hasil.expertise,
              })
            }
            sebentar.push(parent)
          }
          this.rows = sebentar
          this.fetching = false
        })
        .catch(err => console.log(err))
    },
    submit() {
      console.log('masuk sini cuy')
    },
    back() {
      this.$router.push({ name: 'antrian-radiologi' })
    },
  },
}
</script>
