<template>
  <div>
    <Modal close-button-name="Katkesta" ref="modalRef">

      <template #header>
        Muuda salasõna:
      </template>

      <template #body>
        <tr>
          <td><label for="password">Uus salasõna</label></td>
          <td><input v-model="inputPassword1" type="password" id="password"></td>
        </tr>
        <tr>
          <td><label for="password">Salasõna uuesti</label></td>
          <td><input v-model="inputPassword2" type="password" id="password"></td>
        </tr>
      </template>

      <template #footer>
            <button type="submit" class="btn btn-dark">Muuda</button>
      </template>

    </Modal>
  </div>

</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import {useRoute} from "vue-router";

export default {
  name: 'EditPasswordModal',
  components: {Modal},
  props: {
    contactRequest: {},
  },
  data() {
    return {
      currentUserId: Number(useRoute().query.userId),
      inputPassword1: '',
      inputPassword2: ''
    }
  },
  methods() {
  //   passwordsAreSame() {
  //     if (this.inputPassword1 === this.inputPassword2) {
  //       this.contactRequest.userPassword = this.inputPassword1;
  //       return true;
  //     } else {
  //       this.errorResponse.message = PASSWORDS_DONT_MATCH
  //     }
  // }

},
}


</script>
