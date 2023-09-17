<template>
  <select v-model="selectedCountyId" @change="emitSelectedCountyId" class="dropdowns">
    <option selected :value="0">Vali maakond</option>
    <option v-for="county in countyResponse" id="county" :value="county.countyId" :key="county.countyId">
      {{ county.countyName }}
    </option>
  </select>
</template>
<script>
import router from "@/router";

export default {
  name: 'CountyDropdown',
  data() {
    return {
      selectedCountyId: 0,
      countyResponse: [
        {
          countyId: 0,
          countyName: ''
        }
      ]
    }
  },
  methods: {
    getCounties() {
      this.$http.get("/counties")
          .then(response => {
            this.countyResponse= response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    emitSelectedCountyId() {
      this.$emit('event-update-selected-county-id', this.selectedCountyId)
    },
  },
  beforeMount() {
    this.getCounties()
  }
}
</script>