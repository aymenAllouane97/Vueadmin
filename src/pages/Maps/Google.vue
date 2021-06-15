<template>
  <div>
    <h1 class="mapTitle page-title">
      Google <span class="fw-semi-bold">Maps</span>
    </h1>
    <div class="mapContainer">
      <GmapMap
        :center="center"
        :zoom="14"
        style="width: 100%; height: inherit"
      >
      <GmapMarker
          :key="index"
          v-for="(m, index) in items"
          :position="m"
          @click="center=m"
          :label=label
          :icon="markerOptions"
      />
<!--        :position="{lat: -37.813179, lng: 144.950259}"-->

      </GmapMap>
    </div>
  </div>
</template>

<script>
import image  from './../../assets/label_icon.svg';
export default {
  name: 'GoogleMap',
  props:['items'],
  data(){
    return {
    label:{text:'232548466',color:'red' ,fontWeight: "bold"},
      center:{
        lat: 36.35,
        lng: 6.6,
      },
      markerOptions: {
        url: image,
        size: {width: 90, height: 90, f: 'px', b: 'px',},
        scaledSize: {width: 90, height: 45, f: 'px', b: 'px',},
        labelOrigin: new google.maps.Point(45, 20),
      },
      markers : [
        {
          lat: 36.35,
          lng: 6.6,
          label: 'Surat',
          markerOptions: {
            url: image,
            size: {width: 90, height: 90, f: 'px', b: 'px',},
            scaledSize: {width: 90, height: 45, f: 'px', b: 'px',},
            labelOrigin: new google.maps.Point(45, 20),
          }
        },
        {
          lat: 36.2831875,
          lng: 6.471658,
          label: 'Ahmedabad',
          markerOptions: {
            url: image,
            size: {width: 90, height: 90, f: 'px', b: 'px',},
            scaledSize: {width: 90, height: 45, f: 'px', b: 'px',},
            labelOrigin: new google.maps.Point(45, 20),
          }
        },
        {
          lat: 36.2456,
          lng: 6.5677,
          label: 'Rajkot',
          markerOptions: {
            url: image,
            size: {width: 90, height: 90, f: 'px', b: 'px',},
            scaledSize: {width: 90, height: 45, f: 'px', b: 'px',},
            labelOrigin: new google.maps.Point(45, 20),
          }
        }
      ]
    }
  }
};
</script>

<style src="./Google.scss" lang="scss" scoped />
