<template>
  <div class="auth-wrapper auth-v1 px-2">
    <b-card class="mb-0">
      <b-card-title class="mb-1">
        Selamat datang di aplikasi SIMRS GARDA !
      </b-card-title>
      <b-card-text class="mb-2">
        Anda dapat memasukan Username dan Password di bawah ini
      </b-card-text>
      <validation-observer
        ref="loginForm"
      >
        <b-form
          class="auth-login-form mt-2"
          @submit.prevent="submit"
        >
          <b-form-group
            label-for="username"
            label="Username"
          >
            <validation-provider
              v-slot="{ errors }"
              vid="username"
              name="username"
              rules="required"
            >
              <b-form-input
                v-model="username"
                :error-messages="errors"
                placeholder="username"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label-for="password"
            label="Password"
          >
            <validation-provider
              v-slot="{ errors }"
              vid="password"
              name="password"
              rules="required"
            >
              <b-form-input
                v-model="password"
                :error-messages="errors"
                placeholder="password"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <!-- submit button -->
          <b-button
            type="submit"
            variant="secondary"
          >
            Login
          </b-button>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BCardTitle, BCardText,
} from 'bootstrap-vue'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import image from '@/assets/images/rsud/rsudBogor.png'
import fetchApi from '@/api'
import {
  SIMRS_NO_HANDPHONE, SIMRS_ROLE_ID, SIMRS_TOKEN_CURRENT, SIMRS_TOKEN_PARENT, SIMRS_RS_ID,
} from '@/constants/index'
import { mapMutations } from 'vuex'
import { getUserDataFromStorage } from '@/utils/getDataStorage'

export default {
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    // eslint-disable-next-line vue/no-unused-components
    required,
    BCardText,
  },
  data() {
    return {
      no_handphone: '',
      image,
      username: 'dokter3',
      password: '123456',
    }
  },
  methods: {
    ...mapMutations('userLoggedIn', ['UPDATE_DATA_USER_FROM_STORAGE']),
    checkValidateForm() {
      return new Promise((resolve, reject) => (async () => {
        const validated = await this.$refs.loginForm.validate()
        if (!validated) {
          return reject()
        }
        return resolve(true)
      })())
    },
    async fetchLogin() {
      // fetchApi
      try {
        const { data } = await fetchApi.auth.login({ username: this.username, password: this.password })

        this.$storage.setStorage(SIMRS_TOKEN_PARENT, data.token)
        this.$storage.setStorage(SIMRS_TOKEN_CURRENT, data.token)
        this.$storage.setStorage(SIMRS_ROLE_ID, data.user.role_id)
        this.$storage.setStorage(SIMRS_NO_HANDPHONE, data.user.no_handphone)
        this.$storage.setStorage(SIMRS_RS_ID, data.user.rs_id)
        this.UPDATE_DATA_USER_FROM_STORAGE(getUserDataFromStorage())
        this.$router.replace('/')
      } catch (err) {
        if (err.response.status === 422) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: err.response.data.message,
              icon: 'BellIcon',
              variant: 'danger',
              setTimeout: '3000',
            },
          })
        }
      }
    },
    async submit() {
      try {
        if (await this.checkValidateForm()) {
          await this.fetchLogin()
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
