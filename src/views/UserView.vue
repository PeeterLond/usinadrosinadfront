<template>
  <EditPasswordModal ref="editPasswordModalRef"/>
  <div class="row">
    <div class="col">
      <h1>{{title}}</h1>
    </div>
  </div>
<div class="row">
  <div class="col">
    <UserImage :image-data-base64="contactRequest.imageData"></UserImage>
    <ImageInput @event-emit-base64="setContactRequestImageData"/>

    <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
    <AlertSuccess :alert-message="successMessage"></AlertSuccess>
  </div>
  <div class="col">
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
          <CountyDropdown @event-update-selected-county-id="setContactRequestCountyId"/>
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
        <td v-if="!isEdit"><input  v-model="inputPassword1" type="password" id="password"></td>
        <td v-else ><button @click="handleEditPassword" type="submit" class="btn btn-dark" >Muuda</button></td>
      </tr>
      <tr v-if="!isEdit">
        <td><label for="password2">Salasõna uuesti</label></td>
        <td><input v-model="inputPassword2" type="password" id="password2"></td>
      </tr>
    </table>
    <textarea v-model="contactRequest.contactIntroduction" placeholder="Koristaja lühitutvustus" cols="50" rows="5"></textarea>
    <table>
      <tr>
        <td><router-link to="/login"><button type="submit" class="btn btn-dark m-3">Katkesta</button></router-link></td>
        <td><button @click="validateAndSendContactInfo" type="submit" class="btn btn-dark m-3">Kinnita</button></td>
      </tr>
    </table>


  </div>
</div>

</template>

<script>
import UserImage from "@/views/UserImage.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {FILL_MANDATORY_FIELDS, NEW_USER_SUCCESSFULLY_ADDED, PASSWORDS_DONT_MATCH} from "@/assets/script/AlertMessage";
import ImageInput from "@/components/ImageInput.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {useRoute} from "vue-router";
import EditPasswordModal from "@/components/modal/EditPasswordModal.vue";
import CountyDropdown from "@/components/CountyDropdown.vue";
import CityDropdown from "@/components/CityDropdown.vue";
import router from "@/router";

export default {
  name: 'UserView',
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
    validateAndSendContactInfo() {
      this.alertMessage = ''
      this.successMessage = ''
      if (this.mandatoryFieldsAreFilled() && this.passwordsAreSame()) {
        this.addContact()
      }

    },
    addContact() {
      this.$http.post("/contact", this.contactRequest
      ).then(response => {
        this.successMessage = NEW_USER_SUCCESSFULLY_ADDED
        setTimeout(() => {
          router.push({name: 'dashboardRoute'})
        }, 3000)
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },
    mandatoryFieldsAreFilled() {
      if (this.contactRequest.userUsername.length > 0 &&
          this.contactRequest.contactFirstName.length > 0 &&
          this.contactRequest.contactLastName.length > 0 &&
          this.contactRequest.contactEmail.length > 0 &&
          this.inputPassword1.length > 0 &&
          this.inputPassword2.length > 0 &&
          this.contactRequest.countyId > 0) {
        return true;
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      }
    },
    passwordsAreSame() {
      if (this.inputPassword1 === this.inputPassword2) {
        this.contactRequest.userPassword = this.inputPassword1;
        return true;
      } else {
        this.errorResponse.message = PASSWORDS_DONT_MATCH
      }
    },
    setContactRequestImageData(imageDataBase64) {
      this.contactRequest.imageData = imageDataBase64;
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
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    handleEditPassword() {
      this.$refs.editPasswordModalRef.$refs.modalRef.openModal()
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

