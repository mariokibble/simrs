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
                    data-toggle="modal"
                    data-target="#modal"
                    @click="editIsianModal(props.row)"
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
              @click.prevent="simpan"
            >
              Simpan
            </b-button>
          </b-col>
        </b-card>
      </template>
      <b-modal
        id="modal"
        ref="editIsianModal"
        v-model="modalEdit"
        title="Upload Image dan expertise"
        centered
        hide-footer
      >
        <form @submit.prevent="">
          <b-form-group
            label="Upload gambar basah"
            label-for="photo_id"
          >
            <b-form-file
              id="photo_id"
              v-model="dataHasil"
              placeholder="Pilih gambar..."
              accept="image/jpeg, image/png"
            />
          </b-form-group>

          <b-form-group
            label="Ekspertise"
            label-for="ekspertise"
          >
            <b-form-textarea
              id="expertise"
              v-model="dataExpert"
              :state="dataExpert.length <= 350"
              placeholder="Tulis expertise disini..."
              :rows="4"
              :max-rows="6"
            />
          </b-form-group>

          <b-row>
            <b-col class="text-left">
              <b-button
                variant="warning"
                @click="modalEdit = false"
              >
                Cancel
              </b-button>
            </b-col>
            <b-col class="text-right">
              <b-button
                type="submit"
                variant="secondary"
                class="mr-2"
                @click="updateDataIsian"
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
  BFormTextarea,
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
    BFormTextarea,
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
          label: 'Expertise',
          field: 'expertise',
          sortable: false,
        },
        {
          label: 'Aksi',
          field: 'action',
          sortable: false,
        },
      ],
      rows: [],
      modalEdit: false,
      dataId: '',
      dataHasil: null,
      dataExpert: '',
      masukanData: {},
    }
  },
  computed: {
    radioId() {
      return window.atob(this.$route.params.id)
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
          const arr = []
          for (let a = 0; a < this.pemeriksaan.data.length; a += 1) {
            const baru = this.pemeriksaan.data
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
                expertise: hasil.expertise,
                hasil: hasil.hasil,
              })
            }
            arr.push(parent)
          }
          this.rows = arr
          this.fetching = false
        })
        .catch(err => console.log(err))
    },
    editIsianModal(isianData) {
      this.modalEdit = true
      this.dataId = isianData.id
      this.dataHasil = isianData.hasil
      this.dataExpert = isianData.expertise
    },
    updateDataIsian() {

    },
    submit() {
    },
    async simpan() {
      const payload = {
        id: this.pemeriksaan.id,
        waktu_pemeriksaan: this.pemeriksaan.waktu_pemeriksaan,
        layanans: [],
      }
      for (let a = 0; a < this.rows.length; a += 1) {
        for (let b = 0; b < this.rows[a].children.length; b += 1) {
          const children = this.rows[a]
          payload.layanans.push({
            radiologi_id: children.radiologi_id,
            hasil: children.hasil,
            expertise: children.expertise,
          })
        }
      }
      try {
        await fetchApi.pemeriksaan.inputRadiologi(payload)
        await this.detailIsianRadiologi()
        this.$toast({
          components: ToastificationContent,
          props: {
            title: 'Berhasil mengupdate data pengisian radiologi',
            icon: 'CheckIcon',
            variant: 'success',
            setTimeout: '1000',
          },
        })
        setTimeout(() => {
          this.btnDisabled = false
        }, 4000)
      } catch (err) {
        if (err.response.status === 422) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: err.response.data.message || err.response.data,
              icon: 'BellIcon',
              variant: 'danger',
              setTimeout: '5000',
            },
          })
          setTimeout(() => {
            this.btnDisabled = false
          }, 3300)
        }
      }
    },
  },
}
</script>
