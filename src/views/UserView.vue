<template>

<div class="row">
  <div class="col">
    <UserImage :image-data-base64="contactRequest.imageData"></UserImage>

    <ImageInput @event-emit-base64="setContactRequestImageData"/>

    <AlertDanger :alert-message="errorResponse.message"></AlertDanger>

  </div>
  <div class="col">
    <table>
      <tr>
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
        <td><input  v-model="inputPassword1" type="password" id="password"></td>
      </tr>
      <tr>
        <td><label for="password2">Salasõna uuesti</label></td>
        <td><input v-model="inputPassword2" type="password" id="password2"></td>
      </tr>
    </table>
    <textarea placeholder="Koristaja lühitutvustus" cols="50" rows="5"></textarea>
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
import {FILL_MANDATORY_FIELDS, PASSWORDS_DONT_MATCH} from "@/assets/script/AlertMessage";
import ImageInput from "@/components/ImageInput.vue";
import CountyDropdown from "@/components/CountyDropdown.vue";
import CityDropdown from "@/components/CityDropdown.vue";

export default {
  name: 'UserView',
  components: {CityDropdown, CountyDropdown, ImageInput, AlertDanger, UserImage},
  data() {
    return {
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
      if (this.mandatoryFieldsAreFilled() && this.passwordsAreSame()) {
        this.addContact()
      }

    },
    addContact()
    {
      this.$http.post("/contact", this.contactRequest
      ).then(response => {
        const responseBody = response.data
        alert("andmed saadetud")
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
  }
}
</script>

