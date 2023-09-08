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
        <button type="submit" class="btn btn-light m-3">Redigeeri andmeid</button>
      </div>
    </div>

  </div>

  <div class="col">
    <div class="row">
      Kuulutused
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
