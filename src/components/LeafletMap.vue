<template>
  <div id="map"></div>
</template>

<script>

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import defaultIcon from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


export default {
  name: 'LeafletMap',
  data() {
    return {
      myIcon: new Icon({iconUrl: defaultIcon, iconSize: [20, 30], iconAnchor: [10, 30]}),
      advertisementResponse: []
    }
  },
  methods: {
    setUpMap() {
      this.map = L.map('map').setView([58.69, 24.70], 6);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map)

      this.map.on('click', this.onMapClick)

    },

    onMapClick(e) {
      const latLng = e.latlng
      L.popup()
          .setLatLng(latLng)
          .setContent(`Vajutasid asukohta: ${latLng}`)
          .openOn(this.map)
    },

    addLocationsToMap() {
      for (const ad of this.advertisementResponse) {
        if (ad.coordinateLongField !== null && ad.coordinateLat !== null) {
          let long = ad.coordinateLongField;
          let lat = ad.coordinateLat
          let marker = L.marker([long, lat], {icon: this.myIcon}).addTo(this.map)
          marker.bindPopup(ad.advertisementDescription)
        }

      }
    },

    addLocationToMap(ad) {
      let marker = L.marker([ad.coordinateLongField, ad.coordinateLat], {icon: this.myIcon}).addTo(this.map)
      marker.bindPopup(ad.advertisementDescription)
    },

    zoomInToLocationOnMap(ad) {
      this.map.setView([ad.coordinateLongField, ad.coordinateLat], 12)
    },

  },
  mounted() {
    this.setUpMap()
  }
}
</script>