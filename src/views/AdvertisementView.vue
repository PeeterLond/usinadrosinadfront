<template>
  <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
  <AlertSuccess :alert-message="successMessage"></AlertSuccess>

  <div v-if="isChoresAdding" class="advertisement-view-master">
    <div class="advertisement-back">
      <div class="advertisement-chore-header">
        <AlertSuccess :alert-message="successMessage"></AlertSuccess>
        <h4 class="mb-2">Vali Teenused:</h4>
      </div>
      <div class="advertisement-chore-items">
        <table>
          <tr v-for="chore in choreResponse">
            <td>{{ chore.choreName }}</td>
            <td>
              <button v-if="!isChoreSelected[chore.choreId - 1]" @click="handleAdvertisementChoreAdd(chore.choreId)"
                      class="btn btn-dark" type="submit">Vali
              </button>
              <button v-else @click="handleAdvertisementChoreDelete(chore.choreId)" class="btn btn-dark" type="submit">
                Eemalda
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div class="advertisement-view-items">
        <button v-if="!advertisementHasChores" @click="removeAddedAdvertisementAndAdvertisementChores"
                class="btn btn-dark m-3" type="submit">Katkesta
        </button>
        <button v-else @click="goBackToEdit" class="btn btn-dark m-2" type="submit">Tagasi</button>
        <button v-if="!advertisementHasChores" @click="validateAndPushToAdvertisements(NEW_ADVERTISEMENT_ADDED())"
                class="btn btn-dark m-2" type="submit">Kinnita
        </button>
        <button v-else @click="validateAndPushToAdvertisements(ADVERTISEMENT_UPDATED())"
                class="btn btn-dark" type="submit">Muuda
        </button>
      </div>
    </div>
  </div>
  <div v-else class="advertisement-view-master">
    <div class="advertisement-back">
      <div class="advertisement-view-item1">
        <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
        <h2 v-if="!isEdit">Lisa kuulutus:</h2>
        <h2 v-else>Muuda kuulutust:</h2>

        <div v-for="type in typeResponse">
          <input v-model="advertisementRequest.typeId" type="radio" name="radio" :id="type.typeName "
                 :value="type.typeId"
                 :key="type.typeId">
          <label :for="type.typeName" class="radio-label">{{ type.typeName }}</label>
          <br>
        </div>
      </div>
      <div class="advertisement-view-item2">
        <table>
          <tr>
            <td><label for="county">Maakond</label></td>
            <td class="county-city-dropdown-width">
              <CountyDropdown @event-update-selected-county-id="setSelectedCountyId" ref="countyDropdownRef"
                              id="county"/>
            </td>
          </tr>
          <tr>
            <td ><label for="city">Linn</label></td>
            <td>
              <CityDropdown @event-update-selected-city-id="setSelectedCityId" ref="cityDropdownRef" id="city"/>
            </td>
          </tr>
          <tr>
            <td><label for="lat">Koordinaadid (laius)</label></td>
            <td><input v-model="advertisementRequest.coordinateLat" type="text" id="lat"></td>
          </tr>
          <tr>
            <td><label for="long">Koordinaadid (pikkus)</label></td>
            <td><input v-model="advertisementRequest.coordinateLongField" type="text" id="long"></td>
          </tr>
          <tr>
            <td><label for="price">Tunnihind</label></td>
            <td><input v-model="advertisementRequest.advertisementPrice" type="text" id="price"></td>
          </tr>
          <tr>
            <td><label for="area">Pindala</label></td>
            <td><input v-model="advertisementRequest.advertisementArea" type="text" id="area"></td>
          </tr>
        </table>
      </div>
      <div class="advertisement-view-item3">
      <textarea v-model="advertisementRequest.advertisementDescription" placeholder="Kuulutuse tekst" class="mb-4"
                cols="50" rows="5"></textarea>
        <div v-for="tool in toolResponse">
          <input v-model="advertisementRequest.toolId" type="radio" name="radio2" :id="tool.toolName" :key="tool.toolId"
                 :value="tool.toolId">
          <label :for="tool.toolName" class="radio-label">{{ tool.toolName }}</label>
          <br>
        </div>
        <div class="mt-3">
          <router-link to="/dashboard">
            <button class="btn btn-dark m-2" type="submit">Tagasi</button>
          </router-link>
          <button v-if="!isEdit" @click="validateFieldsAndAddAdvertisementToUser" class="btn btn-dark m-2"
                  type="submit">
            Lisa kuulutus
          </button>
          <button v-else @click="validateFieldsAndUpdateAdvertisement" class="btn btn-dark m-2" type="submit">Muuda
            kuulutust
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import CountyDropdown from "@/components/dropdown/CountyDropdown.vue";
import CityDropdown from "@/components/dropdown/CityDropdown.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {
  ADVERTISEMENT_UPDATED,
  AT_LEAST_ONE_CHORE_SELECTED,
  FILL_MANDATORY_FIELDS,
  NEW_ADVERTISEMENT_ADDED
} from "@/assets/script/AlertMessage";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {useRoute} from "vue-router";


export default {
  name: 'AdvertisementView',
  components: {AlertSuccess, AlertDanger, CityDropdown, CountyDropdown},
  data() {
    return {
      isChoreSelected: [],
      advertisementRequest: {
        userId: sessionStorage.getItem('userId'),
        countyId: 0,
        cityId: 0,
        toolId: '',
        typeId: '',
        coordinateLongField: null,
        coordinateLat: null,
        advertisementDescription: '',
        advertisementArea: 0,
        advertisementPrice: 0
      },
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
      ],
      choreResponse: [
        {
          choreId: 0,
          choreName: ''
        }
      ],
      advertisementChoreResponse: [
        {
          adChoreId: 0,
          choreName: ''
        }
      ],
      advertisementChoreRequest: {
        choreId: 0,
        advertisementId: 0
      },
      advertisementId: 0,
      isChoresAdding: false,
      selectedAdvertisementId: Number(useRoute().query.advertisementId),
      isEdit: false,
      editQuery: Number(useRoute().query.edit),
      advertisementHasChores: false,
      errorResponse: {
        message: '',
        errorCode: 0
      },
      successMessage: ''
    }
  },
  methods: {
    ADVERTISEMENT_UPDATED() {
      return ADVERTISEMENT_UPDATED
    },
    NEW_ADVERTISEMENT_ADDED() {
      return NEW_ADVERTISEMENT_ADDED
    },
    setSelectedCountyId(selectedCountyId) {
      this.advertisementRequest.countyId = selectedCountyId
      this.$refs.cityDropdownRef.selectedCountyId = selectedCountyId
      this.$refs.cityDropdownRef.getCities()
    },

    setSelectedCityId(selectedCityId) {
      this.advertisementRequest.cityId = selectedCityId
    },

    validateFieldsAndAddAdvertisementToUser() {
      this.resetErrorMessage();
      if (this.mandatoryFieldsAreFilled()) {
        this.$http.post("/advertisement", this.advertisementRequest
        ).then(response => {
          this.advertisementId = response.data
          router.push({name: 'advertisementRoute', query: {advertisementId: this.advertisementId}})
        }).catch(error => {
          router.push({name: 'errorRoute'})
        });
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      }
    },

    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    mandatoryFieldsAreFilled() {
      return this.advertisementRequest.typeId > 0 &&
          this.advertisementRequest.toolId > 0 &&
          this.advertisementRequest.countyId > 0 &&
          this.advertisementRequest.advertisementPrice > 0 &&
          this.advertisementRequest.advertisementDescription.length > 0
    },

    validateFieldsAndUpdateAdvertisement() {
      this.resetErrorMessage();
      if (this.mandatoryFieldsAreFilled()) {
        this.$http.put("/advertisement", this.advertisementRequest, {
              params: {
                advertisementId: this.selectedAdvertisementId,
              }
            }
        ).then(response => {
          const responseBody = response.data
          router.push({name: 'advertisementRoute', query: {advertisementId: this.selectedAdvertisementId}})
        }).catch(error => {
          router.push({name: 'errorRoute'})
        })
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      }
    },

    handleAdvertisementChoreAdd(choreId) {
      this.resetErrorMessage()
      this.isChoreSelected[choreId - 1] = true
      this.advertisementChoreRequest.choreId = choreId
      this.advertisementChoreRequest.advertisementId = this.selectedAdvertisementId
      this.addAdvertisementChore()
    },

    addAdvertisementChore() {
      this.$http.post("/advertisement-chore", this.advertisementChoreRequest
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    handleAdvertisementChoreDelete(choreId) {
      this.isChoreSelected[choreId - 1] = false
      this.$http.delete("/advertisement-chore", {
            params: {
              choreId: choreId,
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    removeAddedAdvertisementAndAdvertisementChores() {
      this.deleteAllAdvertisementChores()
      this.deleteAdvertisement()
      router.push({name: 'dashboardRoute'})
    },

    deleteAllAdvertisementChores() {
      this.$http.delete("/advertisement-chores", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    deleteAdvertisement() {
      this.$http.delete("/advertisement", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    goBackToEdit() {
      router.push({name: 'advertisementRoute', query: {advertisementId: this.selectedAdvertisementId, edit: 1}})
    },

    validateAndPushToAdvertisements(errorMessage) {
      this.resetErrorMessage();
      if (this.atLeastOneChoreSelected()) {
        this.successMessage = errorMessage;
        setTimeout(() => {
          router.push({name: 'advertisementsRoute'})
        }, 2500);
      } else {
        this.errorResponse.message = AT_LEAST_ONE_CHORE_SELECTED
      }
    },

    atLeastOneChoreSelected() {
      for (const choreSelectedElement of this.isChoreSelected) {
        if (choreSelectedElement === true) {
          return true
        }
      }
    },

    handleIsChoresAddingOrEdit() {
      if (!isNaN(this.selectedAdvertisementId) && !isNaN(this.editQuery)) {
        this.isEdit = true;
        this.getAdvertisement()
      } else if (!isNaN(this.selectedAdvertisementId)) {
        this.isChoresAdding = !isNaN(this.selectedAdvertisementId)
        this.checkIfAdvertisementChoresExist()
        this.getAllChores()
      }
    },

    getAdvertisement() {
      this.$http.get("/advertisement", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        this.advertisementRequest = response.data
        this.setLocationFields()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    setLocationFields() {
      this.$refs.countyDropdownRef.selectedCountyId = this.advertisementRequest.countyId
      this.$refs.countyDropdownRef.emitSelectedCountyId()
      this.$refs.cityDropdownRef.selectedCityId = this.advertisementRequest.cityId
    },

    async checkIfAdvertisementChoresExist() {
      await this.$http.get("/advertisement-chore-exists", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        this.advertisementHasChores = response.data
        this.getAdvertisementChores()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    getAllChores() {
      this.$http.get("/chore")
          .then(response => {
            this.choreResponse = response.data
            this.createIsChoreSelectedList()
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },

    createIsChoreSelectedList() {
      let nrOfChores = this.choreResponse.length;
      for (let i = 0; i < nrOfChores; i++) {
        this.isChoreSelected.push(false)
      }
    },

    getAdvertisementChores() {
      this.$http.get("/advertisement-chore", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        this.advertisementChoreResponse = response.data
        this.updateIsChoreSelectedList()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    updateIsChoreSelectedList() {
      let nrOfChores = this.isChoreSelected.length;
      for (let i = 0; i < nrOfChores; i++) {
        for (const adChore of this.advertisementChoreResponse) {
          if (this.choreResponse[i].choreName === adChore.choreName) {
            this.isChoreSelected[i] = true
            break
          }
        }
      }
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
    this.handleIsChoresAddingOrEdit()
    if (!this.isChoresAdding) {
      this.getAdvertisementTypes()
      this.getAdvertisementTools()
    }
  }
}

</script>