<template>
  <select v-model="selectedToolId" @change="emitSelectedToolId" class="dropdowns">
    <option selected :value="0" value="">Vali vahendid</option>
    <option v-for="tool in toolResponse" :value="tool.toolId" :key="tool.toolId" id="tool">
      {{tool.toolName}}
    </option>
  </select>
</template>
<script>
import router from "@/router";

export default {
  name: 'ToolDropdown',
  data(){
    return {
      selectedToolId: 0,
      toolResponse: [
        {
          toolId: 0,
          toolName: ''
        }
      ]
    }
  },
  methods: {
    emitSelectedToolId() {
      this.$emit("event-update-selected-tool-id", this.selectedToolId)
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
    this.getAdvertisementTools()
  }


}
</script>