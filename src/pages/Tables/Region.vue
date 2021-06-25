<template>
  <div class="center shadow-lg ">
    <div class="center">
      <vs-button
          @click="active=!active"
          success
          flat

      >
        <i class='fa fa-plus mr-1' ></i> Add
      </vs-button>
      <vs-dialog v-model="active">
        <template #header>
          <h4 class="not-margin">
            Add new <b>Region</b>
          </h4>
        </template>
        <form  >
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <vs-row justify="center">
            <vs-col  w="10">
              <vs-input
                  class="mb-2"
                  danger-text="The name is required"
                  placeholder="Name"
                  val-icon-success="done"
                  v-model="agent.name"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.name.$error }"
                  border >
                <template #icon>
                  <i class='fa fa-user'></i>
                </template>
              </vs-input>
              <div v-if="submitted && !$v.agent.name.required" class="invalid-feedback">Name is required</div>
            </vs-col>
          </vs-row>
          <vs-row justify="center">
            <vs-col w="10">
              <vue-multi-select
                  v-model="Selected"
                  :options="options"
                  :filters="filters"
                  :btnLabel="btnLabel"
                  search
                  :class="{ 'form-control is-invalid': submitted && $v.Selected.$error }"
                  historyButton
                  :searchPlaceholder="Search"
                  :selectOptions="wilayas" />
              <div v-if="submitted && $v.Selected.$error" class="invalid-feedback">
                <span v-if="!$v.Selected.required">Wilayas is required</span>

              </div>
            </vs-col>
          </vs-row>



        </form>


        <template #footer>
          <div class="footer-dialog">
            <vs-row>
              <vs-col offset="2" w="8">
                <vs-button block @click="submit()">
                  <i class='fa fa-plus mr-1' ></i> Add
                </vs-button>
              </vs-col>
            </vs-row>
          </div>
        </template>
      </vs-dialog>
    </div>
    <vs-table
        v-model="selected"
    >
      <template #header>
        <vs-input v-model="search1" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
                :indeterminate="selected.length == regions.length" v-model="allCheck"
                @change="selected = $vs.checkAll(selected, regions)"
            />
          </vs-th>
          <vs-th sort @click="regions = $vs.sortData($event ,regions, '_id')">
            Id
          </vs-th>
          <vs-th >
            Name
          </vs-th>
          <vs-th>
            Wilayas
          </vs-th>
          <vs-th>
            Action
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage($vs.getSearch(regions, search1), page, max)"
            :data="tr"
            :is-selected="!!selected.includes(tr)"
            not-click-selected
            open-expand-only-td
        >
          <vs-td checkbox>
            <vs-checkbox :val="tr" v-model="selected" />
          </vs-td>
          <vs-td >
            {{ tr._id }}
          </vs-td>
          <vs-td>
            {{ tr.regionName }}
          </vs-td>
          <vs-td class="d-flex pt-4">
            <div v-for="wilaya in tr.wilayas" :key="index">
              {{ wilaya }} ,
            </div>

          </vs-td>
          <vs-td>
            <vs-row>
              <vs-button border danger>
                Remove
              </vs-button>
            </vs-row>

          </vs-td>

        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(regions, search1), max)" />
      </template>
    </vs-table>


  </div>
</template>
<script>
import { required,minLength,sameAs,email } from 'vuelidate/lib/validators'
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';

import { mapState, mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "Regions",
  components: { vueMultiSelect, },

  data:() => ({
    search: 'Search things',
    search1:'',
    btnLabel: values => `Selected wilayas (${values.length})`,
    errorMessage:null,
    regions:null,
    agent:{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      phoneNumber:'',
      matricule:''
    },
    submitted: false,
    Selected:[],
    wilayas:[],
    remember: false,
    editActive: false,
    edit: null,
    editProp: {},
    allCheck: false,
    page: 1,
    max: 5,
    active: 0,
    selected: [],
    filters: [{
      nameAll: 'select <= 5',
      nameNotAll: 'Deselect <= 5',
      func(elem) {
        return elem.name <= 5;
      },
    }, {
      nameAll: 'Select contains 2',
      nameNotAll: 'Deselect contains 2',
      func(elem) {
        return elem.name.indexOf('2') !== -1;
      },
    }],
    options: {
      multi: true,
    },
  }),
  created(){
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log('sllm')
    axios.get('http://localhost:4002/Regions', config).then(res =>{
      this.regions =res.data.regions
      res.data.wilayas.forEach(element =>{
        this.wilayas.push({name:element.name,id:element.id})
      })
      console.log(res.data)
      //this.regions(res.data)
    }).catch(err => console.log(err))
  },
  methods:{
    ...mapActions('manager', ['ambulancesSet']),
    ambulanceStore(ambulances){
      this.ambulancesSet(ambulances)
    },
    submit() {
      console.log('submit!')
      console.log(this.Selected)
      var SendedWilayas =[]
      this.Selected.forEach(element =>{
        SendedWilayas.push(element.id)
      })
      console.log(SendedWilayas)
      this.submitted = true;

      // stop here if form is invalid
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:{regionName:this.agent.name,wilayas:SendedWilayas}
      };

      axios.post('http://localhost:4002/Region/Store', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'Admin',
          text: `Region created successfully`
        })
        console.log(res)
        // setTimeout(function (){
        //   window.location.reload();
        // },3000)
      })
          .catch(err => {if(err.status = 404){
            this.errorMessage =err.response.data
          }
          })

    },
  },
  validations: {
    Selected: {
      required
    },
    agent:{
      name: {
        required,
        minLength: minLength(2)
      },
      phoneNumber: {
        required,
        minLength: minLength(8)
      },
      email: {
        required,email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      matricule:{
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs('password')
      },
    }
  },
}
</script>
<style scoped>
.form-group__message{
  display: none;
  font-size: .95rem;
  color: #CC3333;
  margin-left: 10em;
  margin-bottom: 12px;
}
.form-group--error+.form-group__message {
  display: block;
  color: #CC3333;
}

.form-group--error input, .form-group--error input:focus, .form-group--error input:hover, .form-group--error textarea {
  border-color: #CC3333;
}
</style>
