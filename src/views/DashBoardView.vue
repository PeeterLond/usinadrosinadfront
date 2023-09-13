<template>

<div class="row">
  <div class="col">

    <userImage/>

    <table>
      <tbody>
      <tr>
        <td>Kasutajanimi</td>
        <td>?</td>
      </tr>
      <tr>
        <td>Eesnimi</td>
        <td>?</td>
      </tr>
      <tr>
        <td>Perekonnanimi</td>
        <td>?</td>
      </tr>
      <tr>
        <td>Linn</td>
        <td>?</td>
      </tr>
      <tr>
        <td>Telefoni number</td>
        <td>?</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>?</td>
      </tr>
      </tbody>
    </table>
    <textarea placeholder="Koristaja lühitutvustus" cols="50" rows="5"></textarea>
    <div class="row text-center">
      <div class="col col-3">
        <button type="submit" class="btn btn-dark m-3">Redigeeri andmeid</button>
      </div>
    </div>

  </div>

  <div class="col">
    <div class="row">
      <h4>Kuulutused</h4>
      <div class="dash-board-advertisements">
      </div>
      <div>
        <router-link to="/advertisement"><button type="submit" class="btn btn-dark mt-2">Lisa kuulutus</button></router-link>
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

export default {
  name: 'DashBoardView',
  components: {UserImage}



}
</script>
