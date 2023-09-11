<template>

<div class="row">
  <div class="col">
    <UserImage></UserImage>
    <input type="file" accept="image/png,image/jpeg,image/gif">

  </div>
  <div class="col">
    <table>
      <tr>
        <td><label for="username">Kasutajanimi</label></td>
        <td><input type="text" id="username"></td>
      </tr>
      <tr>
        <td><label for="firstName">Eesnimi</label></td>
        <td><input type="text" id="firstName"></td>
      </tr>
      <tr>
        <td><label for="lastName">Perekonnanimi</label></td>
        <td><input type="text" id="lastName"></td>
      </tr>
      <tr>
        <td><label for="telephone">Telefoni number</label></td>
        <td><input type="text" id="telephone"></td>
      </tr>
      <tr>
        <td><label for="email">Email</label></td>
        <td><input type="email" id="email"></td>
      </tr>
      <tr>
        <td><label for="county">Maakond</label></td>
        <td>
          <div class="dropdown">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="county">
              Vali maakond
            </button>
            <ul class="dropdown-menu">
              <li v-for="county in countyResponse" :value="county.countyId"><a class="dropdown-item">{{county.countyName}}</a></li>
            </ul>
          </div>
        </td>
      </tr>
      <tr>
        <td><label for="city">Linn</label></td>
        <td>
          <div class="dropdown">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="city">
              Vali linn
            </button>
            <ul class="dropdown-menu">
              <li v-for="city in cityResponse" :value="city.cityId"><a class="dropdown-item">{{city.cityName}}</a></li>
            </ul>
          </div>
        </td>
      </tr>
      <tr>
        <td><label for="password">Salasõna</label></td>
        <td><input type="password" id="password"></td>
      </tr>
      <tr>
        <td><label for="password2">Salasõna uuesti</label></td>
        <td><input type="password" id="password2"></td>
      </tr>
    </table>
    <textarea placeholder="Koristaja lühitutvustus" cols="50" rows="5"></textarea>
    <table>
      <tr>
        <td><button type="submit" class="btn btn-light m-3">Katkesta</button></td>
        <td><button type="submit" class="btn btn-light m-3">Kinnita</button></td>
      </tr>
    </table>


  </div>
</div>




</template>

<script>
import UserImage from "@/views/UserImage.vue";
import router from "@/router";

export default {
  name: 'UserView',
  components: {UserImage},
  data() {
    return {
      countyResponse: [
        {
          "countyId": 0,
          "countyName": "string"
        }
      ],
      cityResponse: [
        {
          "cityId": 0,
          "countyId": 0,
          "cityName": "string"
        }
      ]

    }
  },
  methods: {
    getCounties() {
      this.$http.get("/counties")
          .then(response => {
            this.countyResponse= response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    getCities() {
      this.$http.get("/cities")
          .then(response => {
            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.cityResponse = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.getCounties()
    this.getCities()
  }
}
</script>

