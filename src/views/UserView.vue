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
        <td><input type="text" name="username" id=""></td>
      </tr>
      <tr>
        <td><label for="">Eesnimi</label></td>
        <td><input type="text" name="" id=""></td>
      </tr>
      <tr>
        <td><label for="">Perekonnanimi</label></td>
        <td><input type="text" name="" id=""></td>
      </tr>
      <tr>
        <td><label for="">Telefoni number</label></td>
        <td><input type="text" name="" id=""></td>
      </tr>
      <tr>
        <td><label for="">Email</label></td>
        <td><input type="text" name="" id=""></td>
      </tr>
      <tr>
        <td><label for="">Linn</label></td>
        <td>
          <div class="dropdown">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Vali linn
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </td>
      </tr>
    </table>

  </div>
</div>




</template>

<script>
import UserImage from "@/views/UserImage.vue";

export default {
  name: 'UserView',
  components: {UserImage}
}
</script>

