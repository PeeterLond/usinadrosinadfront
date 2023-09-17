<template>

  <div class="dashboard-master">
    <div class="dashboard-item">
      <div class="dashboard-item-image">
        <UserImage :image-data-base64="userContactInfo.imageData" :img-height="DASHBOARD_PROFILE_IMAGE.height"
                   :img-width="DASHBOARD_PROFILE_IMAGE.width"></UserImage>
      </div>
      <div class="dashboard-item-item">
        <table>
          <tbody>
          <tr>
            <td>Kasutajanimi</td>
            <td>{{ userContactInfo.userUsername }}</td>
          </tr>
          <tr>
            <td>Eesnimi</td>
            <td>{{ userContactInfo.contactFirstName }}</td>
          </tr>
          <tr>
            <td>Perekonnanimi</td>
            <td>{{ userContactInfo.contactLastName }}</td>
          </tr>
          <tr>
            <td>Maakond</td>
            <td>{{ userContactInfo.countyName }}</td>
          </tr>
          <tr>
            <td>Linn</td>
            <td>{{ userContactInfo.cityName }}</td>
          </tr>
          <tr>
            <td>Telefoni number</td>
            <td>{{ userContactInfo.contactMobileNumber }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ userContactInfo.contactEmail }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="dashboard-item-intro">
        {{ userContactInfo.contactIntroduction }}
      </div>
      <div class="dashboard-item-item">
        <button @click="navigateToUserEditView" type="submit" class="btn btn-dark m-3 ">Redigeeri andmeid</button>
      </div>
    </div>
    <div class="dashboard-item">
      <div class="dashboard-item-item">
        <h4>Kuulutused</h4>
        <div class="dashboard-advertisements">
          <Advertisement :advertisement-response="advertisementResponse"></Advertisement>
        </div>
        <div class="dashboard-advertisements-btn">
          <router-link to="/advertisement"><button type="submit" class="btn btn-dark mt-2">Lisa kuulutus</button></router-link>
        </div>
      </div>
      <div class="dashboard-item-item">
        <h4>Tagasiside</h4>
        <div class="dashboard-feedback">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserImage from "@/components/image/UserImage.vue";
import router from "@/router";
import ImageInput from "@/components/image/ImageInput.vue";
import {DASHBOARD_PROFILE_IMAGE} from "@/assets/script/ImageSizes";
import Advertisement from "@/components/Advertisement.vue";

export default {
  name: 'DashBoardView',
  computed: {
    DASHBOARD_PROFILE_IMAGE() {
      return DASHBOARD_PROFILE_IMAGE
    }
  },
  components: {Advertisement, ImageInput, UserImage},
  data() {
    return {
      currentUserId: sessionStorage.getItem('userId'),
      userContactInfo: {
        userUsername: '',
        countyName: '',
        cityName: '',
        imageData: '',
        contactFirstName: '',
        contactLastName: '',
        contactMobileNumber: '',
        contactEmail: '',
        contactIntroduction: ''
      },
      advertisementResponse: [
        {
          advertisementId: 0,
          userId: 0,
          countyName: '',
          cityName: '',
          toolName: '',
          typeName: '',
          coordinateId: 0,
          coordinateLongField: 0,
          coordinateLat: 0,
          advertisementDescription: '',
          advertisementArea: 0,
          advertisementPrice: 0,
          advertisementTime: '',
          contactFirstName: '',
          contactLastName: '',
          contactCountyName: '',
          contactCityName: '',
          contactImageData: '',
          contactMobileNumber: '',
          contactEmail: ''
        }
      ]
    }
  },
  methods: {
    navigateToUserEditView() {
      router.push({name: 'userRoute', query: {userId: this.currentUserId}})
    },
    getUserContactInfo() {
      this.$http.get("/contact-show", {
            params: {
              userId: this.currentUserId,
            }
          }
      ).then(response => {
        this.userContactInfo = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    getUserAdvertisementsWithContact() {
      this.$http.get("/advertisement-user-with-contact", {
            params: {
              userId: this.currentUserId
            }
          }
      ).then(response => {

        this.advertisementResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
  },
  beforeMount() {
    this.getUserContactInfo()
    this.getUserAdvertisementsWithContact()
  }
}
</script>
