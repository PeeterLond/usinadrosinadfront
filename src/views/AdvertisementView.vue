<template>
  <div class="advertisement-view-master">
    <div class="advertisement-view-items">
      <h4>Lisa kuulutus</h4>

      <div v-for="type in typeResponse">
        <input type="radio" name="radio" :id="type.typeName" :value="type.typeId">
        <label :for="type.typeName">{{type.typeName}}</label>
        <br>
      </div>
    </div>
    <div class="advertisement-view-items">
      tabel
    </div>
    <div class="advertisement-view-items">
      <textarea placeholder="Kuulutuse tekst" cols="50" rows="5"></textarea>

      <div v-for="tool in toolResponse">
        <input type="radio" name="radio2" :id="tool.toolName" :value="tool.toolId">
        <label :for="tool.toolName">{{tool.toolName}}</label>
        <br>
      </div>

    </div>
  </div>


</template>

<script>
import router from "@/router";

export default {
  name: 'AdvertisementView',
  data() {
    return {
      typeResponse: [
        {
          typeId: 0,
          typeName: ''
        }
      ],
      toolResponse: [
        {
          toolId: 0,
          toolName: ''
        }
      ]
    }
  },
  methods: {
    getAdvertisementTypes() {
      this.$http.get("/type")
          .then(response => {
            this.typeResponse = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    getAdvertisementTools() {
      this.$http.get("/tool")
          .then(response => {
            this.toolResponse = response.data
          })
          .catch(error => {
           router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.getAdvertisementTypes()
    this.getAdvertisementTools()
  }
}

</script>