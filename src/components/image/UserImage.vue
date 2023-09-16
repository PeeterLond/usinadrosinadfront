<template>
  <div>
    <img v-if="imageDataBase64 === null || imageDataBase64 === ''" src="../../assets/image/userDefaultImage.png"
         :style="{height: imgHeight, width: imgWidth}" alt="Kasutaja profiilipilt"/>
    <img v-else :src="imageDataBase64" :style="{height: imgHeight, width: imgWidth}" alt="Kasutaja profiilipilt2"/>
  </div>

</template>
<script>
export default {
  name: 'userImage',
  props: {
    imageDataBase64: String,
    imgHeight: String,
    imgWidth: String
  }
}
</script>