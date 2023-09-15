<template>
  <div>

    <img v-if="imageDataBase64 === null || imageDataBase64 === ''" src="../../assets/image/userDefaultImage.png" :height="imgHeight" :width="imgWidth" alt="Kasutaja profiilipilt"/>
    <img v-else :src="imageDataBase64" :height="imgHeight" :width="imgWidth" alt="Kasutaja profiilipilt2"/>

  </div>

</template>
<script>
export default {
  name: 'userImage',
  props: {
    imageDataBase64: String,
    imgHeight: Number,
    imgWidth: Number
  }
}
</script>