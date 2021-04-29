<template>
  <b-container class="container">
    <div class="myCard">
      <b-row>
        <b-col md="6">
          <div class="rightCol">
            <div class="brandLogo">
              <img
                :src="image"
                alt="rsud-bogor"
                height="40px"
                width="40px"
              >
            </div>
            <b-card-title
              title-tag="h1"
              class="mb-5 headerLeft"
            >

              Pelayanan<br>
              pasien<br>
              lebih efisien<br>
              dengan SIMRS.<br>
            </b-card-title>
          </div>
        </b-col>
        <b-col md="6">
          <div class="leftCol">
            <b-card-title
              title-tag="h2"
              class="mb-5 header"
            >
              Selamat datang di Aplikasi SIMRS Garda !
            </b-card-title>
            <b-card-text class="mb-2">
              Anda dapat memasukan username dan password dibawah ini
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
                      type="password"
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
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BRow, BCardTitle, BCardText, BCol, BContainer,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import image from '@/assets/images/rsud/logo-kuning.svg'
import fetchApi from '@/api'
import {
  SIMRS_NO_HANDPHONE, SIMRS_ROLE_ID, SIMRS_TOKEN_CURRENT, SIMRS_TOKEN_PARENT, SIMRS_RS_ID,
} from '@/constants/index'
import { required } from '@validations'
import { mapMutations } from 'vuex'
import { getUserDataFromStorage } from '@/utils/getDataStorage'

export default {
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCardTitle,
    BCardText,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    // eslint-disable-next-line vue/no-unused-components
    required,
    BRow,
    BCol,
    BContainer,
  },
  data() {
    return {
      image,
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapMutations('userLoggedIn', ['UPDATE_DATA_USER_FROM_STORAGE', 'UPDATE_USER']),
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
        this.UPDATE_USER(data.user)
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
<style lang="css" scope="locale">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #fbf3ff;
}
.container {
  position: absolute;
  max-width: 800px;
  height: 500px;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.rightCol {
  position: relative;
  background-image: linear-gradient(45deg, #55705d, #558662);
  border-radius: 25px;
  height: 100%;
  padding: 25px;
  color: rgb(192, 192, 192);
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.leftCol {
  position: relative;
  background: #fff;
  border-radius: 25px;
  height: 100%;
  padding: 25px;
  padding-left: 50px;
}
.leftCol header {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.headerLeft {
  color: #fff !important;
  font-size: 32px;
}

.row {
  height: 100%;
}
.myCard {
  position: relative;
  background: #fff;
  height: 100%;
  border-radius: 25px;
  -webkit-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
}
.rightCol {
  color: #fff;
  font-size: 44px;
}
.box {
  position: relative;
  margin: 20px;
  margin-bottom: 100px;
}
.box h2 {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
}
.brandLogo {
   position: absolute; top: 12pt; right: 24pt;
}
.myForm {
  position: relative;
  margin-top: 50px;
}
.btn-primary {
  color: #000 !important;
}
</style>
