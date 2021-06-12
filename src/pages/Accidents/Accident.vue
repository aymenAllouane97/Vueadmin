<template>
<div>
  <div class="">
  <div class="row">
      <div class="col-4  pr-0">
        <div class="card bg-white mr-0">
          <div class="card-body">

              <div class="container">
                <v-calendar></v-calendar>
                <v-date-picker v-model='selectedDate' />
                <div class="row" >
                  <div class="col-4">
                    <div class="row">
                      <div class="col-4" style="padding-right: 0px;">
                        <i class="p-1 rounded fa fa-podcast new" aria-hidden="true"></i>
                      </div>
                      <div class="col-8" style="padding-left: 0px;">
                        <p style="margin-bottom: 0.1rem;font-size: 11px;" class="text-secondary">
                          New
                        </p>
                        <p class="font-weight-bold h5">
                          23
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="row">
                      <div class="col-4" style="padding-right: 0px;">
                        <i class="p-1 rounded fa fa-pie-chart proceeding" aria-hidden="true"></i>
                      </div>
                      <div class="col-8" style="padding-left: 0px;">
                        <p style="margin-bottom: 0.1rem;font-size: 11px;" class="text-secondary">
                          Proceeding
                        </p>
                        <p class="font-weight-bold h5">
                          23
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="row">
                      <div class="col-4" style="padding-right: 0px;">
                        <i class="p-1 rounded fa fa-check-square-o complete" aria-hidden="true"></i>
                      </div>
                      <div class="col-8" style="padding-left: 0px;">
                        <p style="margin-bottom: 0.1rem;font-size: 11px;" class="text-secondary">
                          Completed
                        </p>
                        <p class="font-weight-bold h5">
                          23
                        </p>
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              <div class="row justify-content-center">
                <section>
                  <b-tabs>
                    <b-tab title="All" active>
                      <Widget v-for="item in items" :key="item.message"
                          class="m-0 mb-2 pt-1 pb-1"
                            title= " <div class='row'>
                                     <div class='col-3 pr-1' >
                                        <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                          New
                                        </p>
                                       <p class=' h6'>
                                        2325484
                                       </p>
                                     </div>
                                     <div class='col-5 pr-1' >
                                        <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                          Time of occurrence <i class='l-1 fa fa-calendar-o ' aria-hidden='true'></i>
                                        </p>
                                       <p class=' h6'>
                                       10.07.15:15
                                       </p>
                                     </div>
                                     <div class='col-4' >
                                        <p style='margin-bottom: 0.1rem;font-size: 11px;' class='text-secondary'>
                                          Location <i class='l-1 fa fa-map-marker ' aria-hidden='true'></i>
                                        </p>
                                       <p class=' h6'>
                                        2325484
                                       </p>
                                     </div>
                                    </div>
            "
                          customHeader collapse
                      >
                      </Widget>
                    </b-tab>
                    <b-tab title="New" >
                    </b-tab>
                    <b-tab title="Proceeding" >
                    </b-tab>
                    <b-tab title="Completed" >
                    </b-tab>
                  </b-tabs>
                </section>
              </div>

          </div>
        </div>

      </div>
      <div class="col-8 flex-grow-1 flex-fill">
        <GoogleMap>
      </GoogleMap>
      </div>
    </div>
  </div>

</div>


</template>

<script>
import GoogleMap from './../Maps/Google'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import Item from './Item'

export default {
  name: "Accident",
  components: {
    GoogleMap,
    Item,
    Calendar,
    DatePicker
  },
  data() {
    return {
      selectedDate: null,
      parentMessage: 'Parent',
      items: [
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Bar'}
      ]
    }
  }

}
</script>

<style scoped>
  .new{
    color:#7ab8be;
    background-color: #c7f3fa;
  }
  .proceeding{
    background-color: #ffc5c2;
    color: #c66362;
  }
  .complete{
    background-color: #daf6cb;
    color: #9ec888;
  }
  .nav-tabs > .nav-item .nav-link.active, .nav-tabs > .nav-item .nav-link.active:hover, .nav-tabs > .nav-item .nav-link.active:focus {
    color:white!important;
    background-color: red!important;
  }
  .tab-pane{
    padding-left: 0px !important;
    padding-right: 0px !important;

  }
  .widget{
    border-left:  solid 2px #5ccadb;
  }
  .title{
    padding-top: 0.25rem!important;

  }
</style>