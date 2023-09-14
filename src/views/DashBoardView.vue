<template>

  <div class="row">
    <div class="col">
      <UserImage :image-data-base64="userContactInfo.imageData" class="rounded" ></UserImage>
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
      <tr>
        <div placeholder="Koristaja lühitutvustus" class="dashboard-introduction mt-3" >
          {{ userContactInfo.contactIntroduction }}
        </div>
      </tr>
      <div class="row text-center">
        <div class="col col-3 ">
          <button @click="navigateToUserView" type="submit" class="btn btn-dark m-3 ">Redigeeri andmeid</button>
        </div>
      </div>

    </div>

    <div class="col">
      <div class="row">
        <h4>Kuulutused</h4>
        <div class="dash-board-advertisements">
        </div>
        <div>
          <router-link to="/advertisement">
            <button type="submit" class="btn btn-dark mt-2">Lisa kuulutus</button>
          </router-link>
        </div>
      </div>
      <div class="row">
        Tagasiside
      </div>
    </div>
  </div>


</template>

<script>
import UserImage from "@/views/UserImage.vue";
import router from "@/router";
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: 'DashBoardView',
  components: {ImageInput, UserImage},
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
      }
    }
  },
  methods: {
    navigateToUserView() {
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
  },
  beforeMount() {
    this.getUserContactInfo()
  }
}
</script>
