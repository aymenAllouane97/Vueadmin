<template>
  <div class="center shadow-lg ">
    <div class="center">
      <vs-row>
        <vs-button
            @click="active=!active"
            success
            flat

        >
          <i class='fa fa-plus mr-1' ></i> Add
        </vs-button>
        <vs-button
            @click="active1=!active1"
            primary
            flat
            v-if="selected"
            class="ml-2"
        >
          <i class='fa fa-pencil-square mr-1' ></i> Edit
        </vs-button>
      </vs-row>


      <vs-dialog v-model="active">
        <template #header>
          <h4 class="not-margin">
            Add new <b>Ambulance</b>
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
                  type="password"
                  danger-text="The password does not meet the standards"
                  placeholder="Password "
                  val-icon-danger="clear"
                  v-model="agent.password"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.password.$error }"
                  border>
                <template #icon>
                  <i class='fa fa-lock'></i>
                </template>
              </vs-input>
              <div v-if="submitted && $v.agent.password.$error" class="invalid-feedback">
                <span v-if="!$v.agent.password.required"> Password is required</span>
                <span v-else-if="!$v.agent.password.minLength">Passwords must 8 chars</span>
              </div>
            </vs-col>
          </vs-row>
          <vs-row justify="center">
            <vs-col  w="10">
              <vs-input
                  class="mb-2"
                  type="password"
                  danger-text="The password does not meet the standards"
                  placeholder="Confirm password "
                  val-icon-danger="clear"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.confirmPassword.$error }"
                  v-model="agent.confirmPassword"
                  border>
                <template #icon>
                  <i class='fa fa-lock'></i>
                </template>
              </vs-input>
              <div v-if="submitted && $v.agent.confirmPassword.$error" class="invalid-feedback">
                <span v-if="!$v.agent.confirmPassword.required">Confirm Password is required</span>
                <span v-else-if="!$v.agent.confirmPassword.sameAsPassword">Passwords must match</span>
              </div>
            </vs-col>
          </vs-row>
          <vs-row justify="center">
            <vs-col  w="10">
              <vs-input
                  class="mb-2"
                  type="text"
                  danger-text="The password does not meet the standards"
                  placeholder="Ambulance ID  "
                  val-icon-danger="clear"
                  v-model="agent.matricule"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.matricule.$error }"
                  border >
                <template #icon>
                  <i class='fa fa-id-card'></i>
                </template>
              </vs-input>
              <div v-if="submitted && $v.agent.matricule.$error" class="invalid-feedback">
                <span v-if="!$v.agent.matricule.required"> Ambulance ID is required</span>
                <span v-else-if="!$v.agent.matricule.minLength">Ambulance ID must 6 chars</span>
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
      <vs-dialog v-model="active1">
        <template #header>
          <h4 class="not-margin">
            Edit <b>Ambulance</b>
          </h4>
        </template>
        <form  >
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <vs-row justify="center" v-if="selected">
            <vs-col  w="10">
              <vs-input
                  class="mb-2"
                  danger-text="The name is required"
                  placeholder="Name"
                  val-icon-success="done"
                  v-model="selected.name"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.name.$error }"
                  border >
                <template #icon>
                  <i class='fa fa-user'></i>
                </template>
              </vs-input>
              <div v-if="submitted && !$v.agent.name.required" class="invalid-feedback">Name is required</div>
            </vs-col>
          </vs-row>
          <vs-row justify="center" v-if="selected">
            <vs-col w="10">
              <vs-input
                  type="email"
                  class="mb-2"
                  danger-text="The entered data could not be verified"
                  placeholder="Email"
                  val-icon-warning="warning"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.email.$error }"
                  v-model="selected.email"
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
          <vs-row justify="center" v-if="selected">
            <vs-col  w="10">
              <vs-input
                  class="mb-2"
                  type="text"
                  danger-text="The password does not meet the standards"
                  placeholder="Ambulance ID  "
                  val-icon-danger="clear"
                  v-model="selected.matricule"
                  :class="{ 'form-control is-invalid': submitted && $v.agent.matricule.$error }"
                  border >
                <template #icon>
                  <i class='fa fa-id-card'></i>
                </template>
              </vs-input>
              <div v-if="submitted && $v.agent.matricule.$error" class="invalid-feedback">
                <span v-if="!$v.agent.matricule.required"> Ambulance ID is required</span>
                <span v-else-if="!$v.agent.matricule.minLength">Ambulance ID must 6 chars</span>
              </div>
            </vs-col>
          </vs-row>

          <vs-row justify="center" v-if="selected">
            <vs-col  w="10">
              <vs-input
                  class="mb-2"
                  danger-text="The password does not meet the standards"
                  placeholder="Phone Number "
                  val-icon-danger="clear"
                  v-model="selected.phoneNumber"
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
                <vs-button block @click="editAmbulance()">
                  <i class='fa fa-pencil-square mr-1' ></i> Edit
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
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox

            />
          </vs-th>
          <vs-th sort @click="ambulances = $vs.sortData($event ,ambulances, '_id')">
            Id
          </vs-th>
          <vs-th >
            Name
          </vs-th>
          <vs-th>
            Type
          </vs-th>
          <vs-th >
            Email
          </vs-th>
          <vs-th >
            Call Center
          </vs-th>
          <vs-th >
            Phone number
          </vs-th>
          <vs-th >
            Matricule
          </vs-th>
          <vs-th>
            Action
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage($vs.getSearch(ambulances, search), page, max)"
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
            {{ tr.ambulanceType }}
          </vs-td>
          <vs-td>
            {{ tr.email }}
          </vs-td>
          <vs-td>
            {{ tr.callCenterID }}
          </vs-td>
          <vs-td>
            {{ tr.phoneNumber }}
          </vs-td>
          <vs-td>
            {{ tr.matricule }}
          </vs-td>
          <vs-td>
            <vs-row>

              <vs-button border @click="removeAmbulance(tr)" danger>
                Remove Ambulance
              </vs-button>

            </vs-row>

          </vs-td>

        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(ambulances, search), max)" />
      </template>
    </vs-table>


  </div>
</template>
<script>
import { required,minLength,sameAs,email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "Ambulances",
  components:{

  },

  data:() => ({
    errorMessage:null,
    ambulances:null,
    agent:{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      phoneNumber:'',
      matricule:''
    },
    submitted: false,
    email: '',
    password: '',
    remember: false,
    editActive: false,
    edit: null,
    editProp: {},
    search: '',
    allCheck: false,
    page: 1,
    max: 5,
    active: 0,
    active1:0,
    selected: null,

  }),
  created(){
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log('sllm')
    axios.get('http://localhost:4002/ambulances', config).then(res =>{
      this.ambulances =res.data
      console.log(res.data)
      this.ambulanceStore(res.data)
    }).catch(err => console.log(err))
  },
  methods:{
    ...mapActions('manager', ['ambulancesSet']),
    ambulanceStore(ambulances){
      this.ambulancesSet(ambulances)
    },
    removeAmbulance(ambulance){
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.delete('http://localhost:4002/Ambulance/delete/'+ambulance._id,config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'danger',
          position:'top-right',
          title: 'Call center',
          text: `Ambulance deleted successfully`
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
    editAmbulance(){
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:this.selected
      };
      // console.log(config)
      axios.put('http://localhost:4002/Ambulance/update', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'Call center',
          text: `Ambulance edit successfully`
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
    submit() {
      console.log('submit!')
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:{name:this.agent.name,email:this.agent.email,password:this.agent.password,phoneNumber:this.agent.phoneNumber,matricule:this.agent.matricule}
      };

      axios.post('http://localhost:4002/register/Ambulance', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'Call center',
          text: `Ambulance created successfully`
        })
        console.log(res)
        setTimeout(function (){
          window.location.reload();
        },3000)
      })
          .catch(err => {if(err.status = 404){
            this.errorMessage =err.response.data
          }
          })

    },
  },
  validations: {
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
