<template>
  <div>

    <img v-if="imageDataBase64 === ''" src="../assets/image/userDefaultImage.png" height="280" width="280" alt="Kasutaja profiilipilt"/>
    <img v-else :src="imageDataBase64" height="280" width="280" alt="Kasutaja profiilipilt"/>

  </div>

</template>
<script>
export default {
  name: 'userImage',
  props: {
    imageDataBase64: String
  }
}
</script>