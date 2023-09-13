<template>
  <div>
    <Modal ref="modalRef">

      <template #header>
        Muuda salasõna:
      </template>

      <template #body>
        <td><label for="password">Uus salasõna</label></td>
        <td><input  v-model="inputPassword1" type="password" id="password"></td>
        <td><label for="password">Salasõna uuesti</label></td>
        <td><input  v-model="inputPassword2" type="password" id="password"></td>
      </template>

      <template #footer>
        <div class="row">
          <div class="col justify-content-center">
            <button @click="this.$router.go(-1)" type="submit" class="btn btn-dark">Katkesta</button>
          </div>
          <div class="col justify-content-center">
            <button type="submit" class="btn btn-dark">Muuda</button>
          </div>
        </div>
      </template>

    </Modal>
  </div>

</template>

<script>

import Modal from "@/components/modal/Modal.vue";
export default {
  name: 'EditPasswordModal',
  components: {Modal},
  props: {
    contactRequest: {},
  },
  data() {
    return {
      inputPassword1: '',
      inputPassword2: ''
    }
  }
}

</script>
