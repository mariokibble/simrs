<template>
  <div>
    <div v-if="!fetching">
      <CardDataDiriLab
        :nama="formattedNama"
        :foto-profile="
          pemeriksaan.user.foto_profil ? pemeriksaan.user.foto_profil : ''
        "
        :tanggal-lahir="pemeriksaan.user.tanggal_lahir"
        :asuransi="pemeriksaan.pemeriksaan.asuransi"
        :nrm="pemeriksaan.nrm"
        :tanggal-appointment="pemeriksaan.tanggal_periksa"
        :poliklinik-tujuan="pemeriksaan.pemeriksaan.poli.nama"
        :dokter="
          pemeriksaan.dokter_pengirim && pemeriksaan.dokter_pengirim.user.nama
            ? pemeriksaan.dokter_pengirim.user.nama
            : ''
        "
      />
      <CardPemeriksaan
        :tanggal-pemeriksaan="pemeriksaan.pemeriksaan.tanggal_periksa"
        :tanggal-hasil="pemeriksaan.pemeriksaan.tanggal_periksa"
        :petugas="
          pemeriksaan.petugas_laboratorium &&
            pemeriksaan.petugas_laboratorium.user.nama
            ? pemeriksaan.petugas_laboratorium.user.nama
            : ''
        "
        :prioritas="pemeriksaan.is_prioritas"
        :status="pemeriksaan.status"
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
              <span v-if="props.row.active">
                <input
                  v-if="props.column.field === 'hasil'"
                  v-model="
                    rows[props.row.vgt_id].children[props.index][
                      props.column.field
                    ]
                  "
                  type="number"
                  @change="masukanHasil(props)"
                >
                <input
                  v-else-if="props.column.field === 'keterangan'"
                  v-model="
                    rows[props.row.vgt_id].children[props.index][
                      props.column.field
                    ]
                  "
                  type="text"
                >
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
          <b-col class="d-flex justify-content-end mt-2">
            <b-button
              variant="danger"
              class="mr-2"
              @click.prevent="batal"
            >
              Batal
            </b-button>
            <b-button
              variant="warning"
              class="ml-2"
              @click.prevent="simpan"
            >
              Simpan
            </b-button>
          </b-col>
        </b-card>
      </template>
    </div>
    <div v-else>
      loading ...
    </div>
  </div>
</template>

<script>
import CardDataDiriLab from '@/components/CardDetailLab/CardDataDiriLab.vue'
import CardPemeriksaan from '@/components/CardDetailLab/CardPemeriksaan.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import addPrefixName from '@/utils/addPrefixName'
import {
  BCard, BButton, BCol,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

import fetchApi from '@/api'

export default {
  components: {
    BCard,
    BCol,
    BButton,
    VueGoodTable,
    CardDataDiriLab,
    CardPemeriksaan,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
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
          label: 'Flag',
          field: 'isFlag',
          sortable: false,
        },
        {
          label: 'Nilai Normal',
          field: 'nilaiNormal',
          sortable: false,
        },
        {
          label: 'Satuan',
          field: 'satuan',
          sortable: false,
        },
        {
          label: 'Keterangan',
          field: 'keterangan',
          sortable: false,
        },
      ],
      rows: [],
    }
  },
  computed: {
    labId() {
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
    this.detailIsianLab()
  },
  methods: {
    detailIsianLab() {
      fetchApi.pemeriksaan
        .getLabById(this.labId, 'rs_id=1')
        .then(res => {
          this.pemeriksaan = res.data
          const arr = []
          for (let a = 0; a < this.pemeriksaan.data.length; a += 1) {
            const arrCategori = this.pemeriksaan.data
            const parent = {
              mode: 'span',
              label: arrCategori[a].nama,
              children: [],
            }
            for (let b = 0; b < arrCategori[a].hasils.length; b += 1) {
              const hasil = arrCategori[a].hasils[b]
              let isFlag = null
              if (hasil.is_flag === 1) isFlag = 'H'
              else if (hasil.is_flag === 0) isFlag = 'L'
              parent.children.push({
                nama: hasil.layanan.nama,
                hasil: hasil.hasil,
                isFlag,
                nilaiNormal: hasil.nilai_normal,
                satuan: hasil.satuan,
                keterangan: hasil.keterangan,
                laboratorium_id: hasil.laboratorium_id,
              })
            }
            arr.push(parent)
          }
          this.rows = arr
          this.fetching = false
        })
        .catch(err => console.log(err))
    },
    tampilkanModal() {
      this.$refs.modalKonfirmasiIsianLab.show()
    },
    async simpan() {
      const payload = {
        id: this.pemeriksaan.id,
        waktu_pemeriksaan: this.pemeriksaan.waktu_pemeriksaan,
        layanans: [],
      }
      for (let a = 0; a < this.rows.length; a += 1) {
        for (let b = 0; b < this.rows[a].children.length; b += 1) {
          const children = this.rows[a].children[b]
          let isFlag = null
          if (children.isFlag === 'H') isFlag = 1
          else if (children.isFlag === 'L') isFlag = 0
          payload.layanans.push({
            laboratorium_id: children.laboratorium_id,
            hasil: children.hasil,
            is_flag: isFlag,
            nilai_normal: children.nilaiNormal,
            keterangan: children.keterangan,
            satuan: children.satuan,
          })
        }
      }
      try {
        const { data } = await fetchApi.pemeriksaan.inputLab(payload)
        if (data.status === 1) {
          payload.status = 3
        }
        await this.detailIsianLab()
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Berhasil mengupdate data pengisian laboratorium',
            icon: 'CheckIcon',
            variant: 'success',
            setTimeout: '1000',
          },
        })
        this.back()
        await fetchApi.pemeriksaan.inputLab(payload)
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
        }
      }
    },
    async batal() {
      console.log('masuk sini')
    },
    masukanHasil(props) {
      const temp = this.rows[props.row.vgt_id].children[props.index]
      const nilaiBawah = Number(temp.nilaiNormal.split(' - ')[0])
      const nilaiAtas = Number(temp.nilaiNormal.split(' - ')[1])
      if (temp.hasil < nilaiBawah) {
        temp.isFlag = 'L'
      } else if (temp.hasil > nilaiAtas) {
        temp.isFlag = 'H'
      } else {
        temp.isFlag = ''
      }
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
    back() {
      this.$router.push({ name: 'antrian-lab' })
    },
  },
}
</script>
