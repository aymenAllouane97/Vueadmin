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
                      <b-card no-body class="mb-1 ">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                          <div class='row p-2'>
                            <div class='col-3 pr-1' >
                              <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                Name  <i class='l-1 fa fa-id-card-o ' aria-hidden='true'></i>
                              </p>
                              <p class=' h6'>
                                {{item.name}}
                              </p>
                            </div>
                            <div class='col-3 pr-1' >
                              <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                Phone <i class='l-1 fa fa-phone ' aria-hidden='true'></i>
                              </p>
                              <p class=' h6'>
                                {{item.phoneNumber}}
                              </p>
                            </div>
                            <div class='col-3' >
                              <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                Location <i class='l-1 fa fa-map-marker ' aria-hidden='true'></i>
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
                            <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                            <b-card-text>{{ text }}</b-card-text>
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
          <template v-if="renderComponent">
          <GoogleMap v-bind:items="items">
          </GoogleMap>
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
      renderComponent: true,
      dataShow:false,
      selectedDate: null,
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
  }
  ,created(){
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('http://localhost:4002/Hospitals', config).then(res =>{
      console.log(res.data)
      this.items =res.data
      this.hospitalsStore(res.data)
      this.dataShow=true;
    }).catch(err => console.log(err))
  },
  methods: {
    forceRerender () {
      // remove the my-component component from the DOM
      this.renderComponent = false;

      this. $nextTick (() => {
        // add my-component component in DOM
        this.renderComponent = true;
      });
    }
  }


}
</script>

<style lang="css" scoped>
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