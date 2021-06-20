<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col-4  pr-0">
          <div class="card bg-white mr-0">
            <div class="card-body">



              <div class="row justify-content-center">
                <section class="col-12">


                    <div class="accordion shadow" v-for="item in items" :key="item.message" role="tablist">
                      <b-card no-body class="mb-2 ">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                          <div class='row p-2'>
                            <div class='col-3 pr-1' >
                              <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                <i class='mr-1 fa fa-user ' aria-hidden='true'></i> Name
                              </p>
                              <p class=' h6'>
                                {{item.name}}
                              </p>
                            </div>
                            <div class='col-3 pr-1' >
                              <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                <i class='mr-1 fa fa-phone ' aria-hidden='true'></i>   Phone
                              </p>
                              <p class=' h6'>
                                {{item.phoneNumber}}
                              </p>
                            </div>
                            <div class='col-3' >
                              <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                <i class='mr-1 fa fa-map-marker ' aria-hidden='true'></i> Location
                              </p>
                              <p class=' h6'>
                                {{item.latitude}}/{{item.longitude}}
                              </p>
                            </div>
                            <div class="col-3">

                              <b-button size="sm"  v-b-toggle="'accordion-'+ item.latitude" class="btn-col" variant="light"><i class="fa fa-chevron-down"></i></b-button>
                            </div>
                          </div>

                        </b-card-header>
                        <b-collapse :id="'accordion-'+item.latitude" accordion="my-accordion" role="tabpanel">
                          <b-card-body>
                            <div class='row p-2'>
                              <div class='col-4 pr-1' >
                                <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                  <i class='mr-1 fa fa-id-card-o ' aria-hidden='true'></i>    Address
                                </p>
                                <p class=' h6'>
                                  {{item.address}}
                                </p>
                              </div>
                              <div class='col-5 pr-1' >
                                <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                  <i class='mr-1 fa fa-envelope ' aria-hidden='true'></i> Email
                                </p>
                                <p class=' h6'>
                                  {{item.email}}
                                </p>
                              </div>
                              <div class='col-3 pl-0 pr-0' >
                                <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                  <i class=' fa fa-cube ' aria-hidden='true'></i> Blocks
                                </p>
                                <p class=' h6'>
                                  {{item.Blocks.length}}
                                </p>
                              </div>

                            </div>
                          </b-card-body>
                        </b-collapse>
                      </b-card>
                    </div>



                </section>
              </div>

            </div>
          </div>

        </div>
        <div class="col-8 flex-grow-1 flex-fill">
          <template>
            <div>
              <h1 class="mapTitle page-title">
                Google <span class="fw-semi-bold">Maps</span>
              </h1>
              <div class="mapContainer" v-if="show">

                <GmapMap
                    :center="center"
                    :zoom="14"
                    style="width: 100%; height: inherit"
                    v-for="(m, index) in coordinates"
                >
                  <GmapMarker
                      :key="index"

                      :position="m"
                      @click="center=m"
                      :label=label
                      :icon="m.markerOptions"
                  />
                  <!--        :position="{lat: -37.813179, lng: 144.950259}"-->

                </GmapMap>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>

  </div>


</template>

<script>
import GoogleMap from './../Maps/Google'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import Item from '../Accidents/Item'
import image  from './../../assets/label_icon.svg';
import axios from "axios";

export default {
  name: "HospitalsTrs",
  components: {
    GoogleMap,
    Item,
    Calendar,
    DatePicker
  },
  data() {
    return {
      label:{text:'232548466',color:'red' ,fontWeight: "bold"},
      coordinates:null,
      selectedDate: null,
      show:false,
      center:{
        lat: 36.35,
        lng: 6.6,
      },
      parentMessage: 'Parent',
      items: null,
      text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry\n' +
          '          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor\n' +
          '          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon\n' +
          '          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla\n' +
          '          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore\n' +
          '          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher\n' +
          '          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic\n' +
          '          synth nesciunt you probably haven\'t heard of them accusamus labore VHS.'


    }
  },
  // ,created(){
  //   const token = window.localStorage.getItem('token');
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   };
  //   axios.get('http://localhost:4002/Hospitals', config).then(res =>{
  //     console.log(res.data)
  //     this.items =res.data
  //     var pos=[];
  //     console.log(this.items)
  //     for(var i=0;i<=this.items.length-1;i++){
  //
  //       pos.push({lat:parseInt(this.items[i].latitude)
  //         ,lng:parseInt(this.items[i].longitude),label: 'Ahmedabad',
  //         markerOptions: {
  //           url: image,
  //           size: {width: 90, height: 90, f: 'px', b: 'px',},
  //           scaledSize: {width: 90, height: 45, f: 'px', b: 'px',},
  //           labelOrigin: new google.maps.Point(45, 20),}})
  //     }
  //     console.log(pos)
  //     this.coordinates = pos;
  //     this.show =true;
  //     this.hospitalsStore(res.data)
  //   }).catch(err => console.log(err))
  // },
  beforeMount: function () {
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('http://localhost:4002/Hospitals', config).then(res =>{
      console.log(res.data)
      this.items =res.data
      var pos=[];
      console.log(this.items)
      for(var i=0;i<=this.items.length-1;i++){

        pos.push({lat:parseInt(this.items[i].latitude)
          ,lng:parseInt(this.items[i].longitude),label: 'Ahmedabad',
          markerOptions: {
            url: image,
            size: {width: 90, height: 90, f: 'px', b: 'px',},
            scaledSize: {width: 90, height: 45, f: 'px', b: 'px',},
            labelOrigin: new google.maps.Point(45, 20),}})
      }
      console.log(pos)
      this.coordinates = pos;
      this.show =true;
      this.hospitalsStore(res.data)
    }).catch(err => console.log(err))
  }

}
</script>

<style lang="css" scoped>
.row {
  display: table;
}

[class*="col-"] {
  float: none;
  display: table-cell;
  vertical-align: top;
}
.card{
  border: none;
}
btn-secondary{
  color: grey!important;
  background-color: white!important;
}
btn-secondary :hover{
  color: white!important;
  background-color: grey!important;
}
.card-header{
  background-color: white;
}
.card-expansion {
  height: 480px;
}

.accordion{

  border-left:  solid 2px #5ccadb;
}
</style>
