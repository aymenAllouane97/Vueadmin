<template>
  <div class="center shadow-lg ">
    <div class="center">

      <vs-row>
        <vs-button
            @click="active=!active"
            success
            flat

        >
          <i class='fa fa-plus mr-1' ></i> Add Hospital
        </vs-button>
        <vs-button
            v-if="selected"
            @click="active2=!active2"
            success
            flat
        >
          <i class='fa fa-plus mr-1' ></i> Add Service
        </vs-button>
        <vs-dialog v-model="active2">
          <template #header>
            <h4 class="not-margin">
              Add new <b>Service</b>
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
                    v-model="block.name"
                    :class="{ 'form-control is-invalid': submitted2 && $v.block.name.$error }"
                    border >
                  <template #icon>
                    <i class='fa fa-user'></i>
                  </template>
                </vs-input>
                <div v-if="submitted2 && !$v.block.name.required" class="invalid-feedback">Name is required</div>
                <div v-if="submitted2 && !$v.block.name.minLength" class="invalid-feedback">Name is must have 4 chars</div>
              </vs-col>
            </vs-row>
            <vs-row justify="center">
              <vs-col  w="10">
                <vs-input
                    class="mb-2"
                    type="number"
                    danger-text="The password does not meet the standards"
                    placeholder="Capacity "
                    val-icon-danger="clear"
                    v-model="block.capacity"
                    :class="{ 'form-control is-invalid': submitted2 && $v.block.capacity.$error }"
                    border>
                  <template #icon>
                    <i class='fa fa-bar-chart'></i>
                  </template>
                </vs-input>
                <div v-if="submitted2 && $v.block.capacity.$error" class="invalid-feedback">
                  <span v-if="!$v.block.capacity.required"> Capacity is required</span>

                </div>
              </vs-col>
            </vs-row>
          </form>
          <template #footer>
            <div class="footer-dialog">
              <vs-row>
                <vs-col offset="2" w="8">
                  <vs-button block @click="storeBlock( )">
                    <i class='fa fa-plus mr-1' ></i> Add
                  </vs-button>
                </vs-col>
              </vs-row>
            </div>
          </template>
        </vs-dialog>
        <vs-dialog v-model="active">
          <template #header>
            <h4 class="not-margin">
              Add new <b>Hospital</b>
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
                <vs-input
                    type="email"
                    class="mb-2"
                    danger-text="The entered data could not be verified"
                    placeholder="Email"
                    val-icon-warning="warning"
                    :class="{ 'form-control is-invalid': submitted && $v.agent.email.$error }"
                    v-model="agent.email"
                    border>
                  <template #icon>
                    <i class='fa fa-envelope'></i>
                  </template>
                </vs-input>
                <div v-if="submitted && $v.agent.email.$error" class="invalid-feedback">
                  <span v-if="!$v.agent.email.required">Email is required</span>
                  <span v-if="!$v.agent.email.email">Email is invalid</span>
                </div>
              </vs-col>
            </vs-row>
            <vs-row justify="center">
              <vs-col  w="10">
                <vs-input
                    class="mb-2"
                    type="number"
                    danger-text="The password does not meet the standards"
                    placeholder="Latitude "
                    val-icon-danger="clear"
                    v-model="agent.latitude"
                    :class="{ 'form-control is-invalid': submitted && $v.agent.latitude.$error }"
                    border>
                  <template #icon>
                    <i class='fa fa-map-marker'></i>
                  </template>
                </vs-input>
                <div v-if="submitted && $v.agent.latitude.$error" class="invalid-feedback">
                  <span v-if="!$v.agent.latitude.required"> Latitude is required</span>

                </div>
              </vs-col>
            </vs-row>
            <vs-row justify="center">
              <vs-col  w="10">
                <vs-input
                    class="mb-2"
                    type="number"
                    danger-text="The password does not meet the standards"
                    placeholder=" longitude "
                    val-icon-danger="clear"
                    :class="{ 'form-control is-invalid': submitted && $v.agent.longitude.$error }"
                    v-model="agent.longitude"
                    border>
                  <template #icon>
                    <i class='fa fa-map-marker'></i>
                  </template>
                </vs-input>
                <div v-if="submitted && $v.agent.longitude.$error" class="invalid-feedback">
                  <span v-if="!$v.agent.longitude.required">Longitude is required</span>
                </div>
              </vs-col>
            </vs-row>
            <vs-row justify="center">
              <vs-col  w="10">
                <vs-input
                    class="mb-2"
                    type="text"
                    danger-text="The password does not meet the standards"
                    placeholder=" Address  "
                    val-icon-danger="clear"
                    v-model="agent.address"
                    :class="{ 'form-control is-invalid': submitted && $v.agent.address.$error }"
                    border >
                  <template #icon>
                    <i class='fa fa-id-card'></i>
                  </template>
                </vs-input>
                <div v-if="submitted && $v.agent.address.$error" class="invalid-feedback">
                  <span v-if="!$v.agent.address.required"> Address is required</span>
                  <span v-else-if="!$v.agent.address.minLength"> Address must 6 chars</span>
                </div>
              </vs-col>
            </vs-row>

            <vs-row justify="center">
              <vs-col  w="10">
                <vs-input
                    class="mb-2"
                    danger-text="The password does not meet the standards"
                    placeholder="Phone Number "
                    val-icon-danger="clear"
                    v-model="agent.phoneNumber"
                    :class="{ 'form-control is-invalid': submitted && $v.agent.phoneNumber.$error }"
                    border>
                  <template #icon>
                    <i class='fa fa-phone'></i>
                  </template>
                </vs-input>
                <div v-if="submitted && $v.agent.phoneNumber.$error" class="invalid-feedback">
                  <span v-if="!$v.agent.phoneNumber.required"> Phone number is required</span>
                  <span v-else-if="!$v.agent.phoneNumber.minLength">Phone number must 8 chars</span>
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
        <vs-button border v-if="selected" danger>
          Remove Hospital
        </vs-button>
        <vs-button  v-if="selected1"
                   primary
                   flat
        >
          <i class='fa fa-pencil-square mr-1' ></i>Edit Block
        </vs-button>
        <vs-button border v-if="selected1" danger>
          Remove Block
        </vs-button>
      </vs-row>

    </div>
    <div class="center">
      <vs-table
        v-model="selected"
    >
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox

            />
          </vs-th>
          <vs-th sort @click="hospitals = $vs.sortData($event ,hospitals, '_id')">
            Id
          </vs-th>
          <vs-th >
            Name
          </vs-th>
          <vs-th >
            Email
          </vs-th>
          <vs-th>
            Latitude
          </vs-th>
          <vs-th>
            Longitude
          </vs-th>
          <vs-th >
            Call Center
          </vs-th>
          <vs-th >
            Phone number
          </vs-th>
          <vs-th >
            Address
          </vs-th>
          <vs-th>
            Action
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage($vs.getSearch(hospitals, search), page, max)"
            :data="tr"
            :is-selected="selected == tr"
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
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.email }}
          </vs-td>
          <vs-td>
            {{ tr.latitude }}
          </vs-td>
          <vs-td>
            {{ tr.longitude }}
          </vs-td>
          <vs-td>
            {{ tr.callCenterID }}
          </vs-td>
          <vs-td>
            {{ tr.phoneNumber }}
          </vs-td>
          <vs-td>
            {{ tr.address }}
          </vs-td>
          <vs-td>
          </vs-td>
          <template #expand>
            <div class="con-content">
              <div class="center"
                   :key="j"
                   v-for="(tr1, j) in tr.Blocks"
                   :data="tr1"
                   :is-selected="selected1 == tr1">
                <vs-row justify="" class=" pt-2 "  :w="12">
                  <vs-col :w="1" checkbox>
                    <vs-checkbox :val="tr1" v-model="selected1" />
                  </vs-col>
                  <vs-col :w="3">
                    {{ tr1._id }}
                  </vs-col>
                  <vs-col :w="3">
                    {{tr1.name}}
                  </vs-col>
                  <vs-col :w="2">
                    {{ tr1.capacity }}
                  </vs-col>
                  <vs-col :w="3">
                    {{ tr1.name }}
                  </vs-col>
                </vs-row>

              </div>
            </div>
          </template>

        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(hospitals, search), max)" />
      </template>
    </vs-table>
    </div>


  </div>
</template>
<script>
import { required,minLength,sameAs,email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "Hospitals",
  components:{

  },

  data:() => ({

    errorMessage:null,
    hospitals:null,
    agent:{
      name:'',
      email:'',
      latitude:'',
      longitude:'',
      phoneNumber:'',
      address:'',
    },
    block:{
      name:'',
      capacity:''
    },
    submitted: false,
    submitted2: false,
    email: '',
    password: '',
    remember: false,
    editActive: false,
    edit: null,
    editProp: {},
    search: '',
    search1:'',
    allCheck: false,
    allCheck1: false,
    page: 1,
    max: 5,
    active: 0,
    active2:0,
    selected: null,
    selected1: null,

  }),
  created(){
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('http://localhost:4002/Hospitals', config).then(res =>{
      console.log(res.data)
      this.hospitals =res.data
      this.hospitalsStore(res.data)
    }).catch(err => console.log(err))
  },
  methods:{
    ...mapActions('manager', ['hospitalsSet']),
    storeBlock(){

      console.log('submit2!')
      this.submitted2 = true;
      console.log(this.selected)
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` },
      //   body:{name:this.block.name,capacity:this.block.capacity,hospitalID:id}
      // };
      // console.log(config)
      // stop here if form is invalid
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:{name:this.block.name,capacity:this.block.capacity,hospitalID:this.selected._id}
      };
     // console.log(config)
      axios.post('http://localhost:4002/Blocks/Store', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'Call center',
          text: `Block created successfully`
        })
        console.log(res)
        setTimeout(function (){
          window.location.reload();
        },3000)
      })
          .catch(err => {
            console.log(err);
            if(err.status = 404){

              this.errorMessage =err.response.data
            }
          })
    },
    hospitalsStore(hospitals){
      this.hospitalsSet(hospitals)
    },
    submit() {
      console.log('submit!')
      this.submitted = true;

      // stop here if form is invalid
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:{name:this.agent.name,email:this.agent.email,latitude:this.agent.latitude,longitude:this.agent.longitude,phoneNumber:this.agent.phoneNumber,address:this.agent.address}
      };

      axios.post('http://localhost:4002/Hospitals/Store', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'Call center',
          text: `Hospital created successfully`
        })
        console.log(res)
        setTimeout(function (){
          window.location.reload();
        },3000)
      })
          .catch(err => {
            console.log(err);
            if(err.status = 404){

            this.errorMessage =err.response.data
          }
          })

    },
  },
  validations: {
    block:{
      name:{
        required,
        minLength: minLength(4)
      },
      capacity:{
        required
      }
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
      latitude: {
        required
      },
      address:{
        required,
        minLength: minLength(4)
      },
      longitude: {
        required,

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