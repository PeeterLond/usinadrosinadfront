<template>
  <div class="reset-password-master">
    <div>
      <p>Unustasid salasõna?</p>
    </div>
    <div>
      <label class="me-3" for="email">Email</label>
      <input type="text" name="" id="email">
    </div>
    <div>
      <button @click="validateAndSendNewPassword" class="btn btn-dark mt-5" type="submit">Saada</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ResetPasswordView',
  methods: {
    validateAndSendNewPassword() {

    },
  }
}

</script>
