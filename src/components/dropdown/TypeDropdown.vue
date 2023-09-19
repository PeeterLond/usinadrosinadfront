<template>
  <select v-model="selectedTypeId" @change="emitSelectedTypeId" class="dropdowns">
    <option selected :value="0">Vali tüüp</option>
    <option v-for="type in typeResponse" :value="type.typeId" :key="type.typeId" id="type">
      {{type.typeName}}
    </option>


  </select>



</template>

<script>
import router from "@/router";

export default {
  name: 'TypeDropdown',
  data() {
    return {
      selectedTypeId: 0,
      typeResponse: [
        {
          typeId: 0,
          typeName: ''
        }
      ]

    }
  },
  methods: {
    emitSelectedTypeId() {
      this.$emit("event-update-selected-type-id", this.selectedTypeId)
    },
    getAdvertisementTypes() {
      this.$http.get("/type")
          .then(response => {
            this.typeResponse = response.data
          })
          .catch(error => {
           router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.getAdvertisementTypes()
  }
}

</script>
