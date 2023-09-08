<template>
<div class="row justify-content-center">
  <div class="col col-4 text-center">
    <div v-if="alertMessage != null && alertMessage.length > 0" class="alert alert-danger" role="alert" >
      {{alertMessage}}
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'AlertDanger',
  props: {
    alertMessage: String
  }
}
</script>