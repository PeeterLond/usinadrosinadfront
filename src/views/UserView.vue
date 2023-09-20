<template>
  <EditPasswordModal ref="editPasswordModalRef"/>

  <div class="user-master">
    <div class="user-item">
      <div class="user-item-item">
        <h1>{{ title }}</h1>
      </div>
      <div class="user-item-image">
        <UserImage :image-data-base64="contactRequest.imageData" :img-height="USER_VIEW_IMAGE.height"
                   :img-width="USER_VIEW_IMAGE.width"></UserImage>
        <ImageInput @event-emit-base64="setContactRequestImageData"/>
      </div>
      <div class="user-item-item">
        <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
        <AlertSuccess :alert-message="successMessage"></AlertSuccess>
      </div>


    </div>
    <div class="user-item">
      <div class="user-item-item">
        <table>
          <tr v-if="!isEdit">
            <td><label for="username">Kasutajanimi</label></td>
            <td><input v-model="contactRequest.userUsername" type="text" id="username"></td>
          </tr>
          <tr>
            <td><label for="firstName">Eesnimi</label></td>
            <td><input v-model="contactRequest.contactFirstName" type="text" id="firstName"></td>
          </tr>
          <tr>
            <td><label for="lastName">Perekonnanimi</label></td>
            <td><input v-model="contactRequest.contactLastName" type="text" id="lastName"></td>
          </tr>
          <tr>
            <td><label for="telephone">Telefoni number</label></td>
            <td><input v-model="contactRequest.contactMobileNumber" type="text" id="telephone"></td>
          </tr>
          <tr>
            <td><label for="email">Email</label></td>
            <td><input v-model="contactRequest.contactEmail" type="email" id="email"></td>
          </tr>
          <tr>
            <td><label for="county">Maakond</label></td>
            <td>
              <CountyDropdown @event-update-selected-county-id="setContactRequestCountyId" ref="countyDropdownRef"/>
            </td>
          </tr>
          <tr>
            <td><label for="city">Linn</label></td>
            <td>
              <CityDropdown @event-update-selected-city-id="setContactRequestCityId" ref="cityDropdownRef"/>
            </td>
          </tr>
          <tr>
            <td><label for="password">Salasõna</label></td>
            <td v-if="!isEdit"><input v-model="inputPassword1" type="password" id="password"></td>
            <td v-else>
              <button @click="openEditPasswordModal" type="submit" class="btn btn-dark">Muuda</button>
            </td>
          </tr>
          <tr v-if="!isEdit">
            <td><label for="password2">Salasõna uuesti</label></td>
            <td><input v-model="inputPassword2" type="password" id="password2"></td>
          </tr>
        </table>
      </div>
      <div class="user-item-item">
      <textarea v-model="contactRequest.contactIntroduction" placeholder="Koristaja lühitutvustus" cols="50"
                rows="5"></textarea>
      </div>
      <div class="user-item-item">
        <table>
          <tr>
            <td v-if="!isEdit">
              <router-link to="/login">
                <button type="submit" class="btn btn-dark m-3">Katkesta</button>
              </router-link>
            </td>
            <td v-else>
              <router-link to="/dashBoard">
                <button type="submit" class="btn btn-dark m-3">Katkesta</button>
              </router-link>
            </td>
            <td v-if="!isEdit">
              <button @click="validateAndCreateContact" type="submit" class="btn btn-dark m-3">Kinnita</button>
            </td>
            <td v-else>
              <button @click="validateAndUpdateContact" type="submit" class="btn btn-dark m-3">Kinnita</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserImage from "@/components/image/UserImage.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {
  EMAIL_INCORRECT_FORMAT,
  FILL_MANDATORY_FIELDS, MOBILE_NUMBER_INCORRECT_FORMAT,
  NEW_USER_SUCCESSFULLY_ADDED,
  PASSWORDS_DONT_MATCH,
  USER_DATA_SUCCESSFULLY_UPDATED
} from "@/assets/script/AlertMessage";
import ImageInput from "@/components/image/ImageInput.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {useRoute} from "vue-router";
import EditPasswordModal from "@/components/modal/EditPasswordModal.vue";
import CountyDropdown from "@/components/dropdown/CountyDropdown.vue";
import CityDropdown from "@/components/dropdown/CityDropdown.vue";
import router from "@/router";
import {USER_VIEW_IMAGE} from "@/assets/script/ImageSizes";

export default {
  name: 'UserView',
  computed: {
    USER_VIEW_IMAGE() {
      return USER_VIEW_IMAGE
    }
  },
  components: {CityDropdown, CountyDropdown, EditPasswordModal, AlertSuccess, ImageInput, AlertDanger, UserImage},
  data() {
    return {
      title: 'Registreeri kasutaja:',
      successMessage: '',
      currentUserId: Number(useRoute().query.userId),
      isEdit: false,
      contactRequest: {
        userUsername: '',
        userPassword: '',
        countyId: 0,
        cityId: 0,
        imageData: '',
        contactFirstName: '',
        contactLastName: '',
        contactMobileNumber: '',
        contactEmail: '',
        contactIntroduction: ''
      },
      inputPassword1: '',
      inputPassword2: '',
      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {
    setContactRequestCountyId(selectedCountyId) {
      this.contactRequest.countyId = selectedCountyId
      this.$refs.cityDropdownRef.selectedCountyId = selectedCountyId
      this.$refs.cityDropdownRef.getCities()
    },

    setContactRequestCityId(selectedCityId) {
      this.contactRequest.cityId = selectedCityId
    },

    setContactRequestImageData(imageDataBase64) {
      this.contactRequest.imageData = imageDataBase64;
    },

    validateAndCreateContact() {
      this.resetErrorMessage();
      this.resetSuccessMessage();

      if (!this.mandatoryFieldsAreFilled() || !this.mandatoryPasswordFieldsAreFilled()) {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      } else if (!this.passwordsAreSame()) {
        this.errorResponse.message = PASSWORDS_DONT_MATCH
      } else if (!this.contactMobileNumberHasCorrectFormat()) {
        this.errorResponse.message = MOBILE_NUMBER_INCORRECT_FORMAT
      } else if (!this.contactEmailHasCorrectFormat()) {
        this.errorResponse.message = EMAIL_INCORRECT_FORMAT
      } else {
        this.contactRequest.userPassword = this.inputPassword1;
        this.addContact();
      }
    },

    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },

    mandatoryFieldsAreFilled() {
      return this.contactRequest.userUsername.length > 0 && this.contactRequest.contactFirstName.length > 0 &&
          this.contactRequest.contactLastName.length > 0 && this.contactRequest.contactEmail.length > 0 &&
          this.contactRequest.countyId > 0
    },

    mandatoryPasswordFieldsAreFilled() {
      return this.inputPassword1.length > 0 && this.inputPassword2.length > 0
    },

    passwordsAreSame() {
      return this.inputPassword1 === this.inputPassword2
    },

    contactMobileNumberHasCorrectFormat() {
      let nrRegex = /^(\+)?\d+(\s\d+)*$/
      return nrRegex.test(this.contactRequest.contactMobileNumber)
    },

    contactEmailHasCorrectFormat() {
      let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      return emailRegex.test(this.contactRequest.contactEmail)
    },

    addContact() {
      this.$http.post("/contact", this.contactRequest
      ).then(response => {
        this.successMessage = NEW_USER_SUCCESSFULLY_ADDED
        setTimeout(() => {
          router.push({name: 'loginRoute'})
        }, 2500)
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },

    handleIsEdit() {
      this.isEdit = !isNaN(this.currentUserId)

      if (this.isEdit) {
        this.title = 'Redigeeri andmeid:';
        this.getCurrentUserContactData()
      }
    },

    getCurrentUserContactData() {
      this.$http.get("/contact", {
            params: {
              userId: this.currentUserId
            }
          }
      ).then(response => {
        this.contactRequest = response.data;
        this.setLocationFields();
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    setLocationFields() {
      this.$refs.countyDropdownRef.selectedCountyId = this.contactRequest.countyId
      this.$refs.countyDropdownRef.emitSelectedCountyId()
      this.$refs.cityDropdownRef.selectedCityId = this.contactRequest.cityId
    },

    openEditPasswordModal() {
      this.$refs.editPasswordModalRef.$refs.modalRef.openModal()
    },

    validateAndUpdateContact() {
      this.resetErrorMessage();
      this.resetSuccessMessage();

      if (!this.mandatoryFieldsAreFilled()) {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      } else if (!this.contactMobileNumberHasCorrectFormat()) {
        this.errorResponse.message = MOBILE_NUMBER_INCORRECT_FORMAT
      } else if (!this.contactEmailHasCorrectFormat()) {
        this.errorResponse.message = EMAIL_INCORRECT_FORMAT
      } else {
        this.sendUpdateContactInfoRequest()
      }
    },

    sendUpdateContactInfoRequest() {
      this.$http.put("/contact", this.contactRequest, {
            params: {
              userId: this.currentUserId,
            }
          }
      ).then(response => {
        this.successMessage = USER_DATA_SUCCESSFULLY_UPDATED
                setTimeout(() => {
                  router.push({name: 'dashboardRoute'})
                }, 2000)
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
  },

  mounted() {
    this.handleIsEdit()
  },

  beforeMount() {
    this.isEdit = false
  }
}
</script>

