<template>
  <div class="center shadow-lg ">
    <div class="center">

      <vs-row>
        <vs-button
            @click="active=!active"
            success
            flat

        >
          <i class='fa fa-plus mr-1' ></i> Add Manager
        </vs-button>


        <vs-dialog v-model="active">
          <template #header>
            <h4 class="not-margin">
              Add new <b>Call center manger</b>
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
                    class="mb-2 w-100"
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
              <vs-col w="10">
                <vue-multi-select
                    v-model="Selected"
                    :options="options"
                    :filters="filters"
                    :btnLabel="btnLabel"
                    search
                     historyButton
                    :searchPlaceholder="search1"
                    :selectOptions="callCenters" />
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
        <vs-button border v-if="selected.length != 0" @click="remove()" danger>
          Remove Manager
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
                  :indeterminate="selected.length == managers.length" v-model="allCheck"
                  @change="selected = $vs.checkAll(selected, managers)"
              />
            </vs-th>
            <vs-th sort @click="managers = $vs.sortData($event ,managers, '_id')">
              Id
            </vs-th>
            <vs-th>
              Image
            </vs-th>
            <vs-th >
              Name
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
              Address
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
              :key="i"
              v-for="(tr, i) in $vs.getPage($vs.getSearch(managers, search), page, max)"
              :data="tr"

              :is-selected="!!selected.includes(tr)"
              not-click-selected
              open-expand-only-td
          >
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="selected" />
            </vs-td>
            <vs-td >
              {{ tr.manager._id }}
            </vs-td>
            <vs-td>
              <vs-avatar>
                <img :src="tr.manager.user.image" :alt="tr.name">
              </vs-avatar>
            </vs-td>
            <vs-td>
              {{ tr.manager.user.name }}
            </vs-td>
            <vs-td>
              {{ tr.manager.user.email }}
            </vs-td>
            <vs-td>
              {{ tr.callCenter.name }}
            </vs-td>
            <vs-td>
              {{ tr.manager.user.phoneNumber }}
            </vs-td>
            <vs-td>
              {{ tr.manager.user.address }}
            </vs-td>



          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(managers, search), max)" />
        </template>
      </vs-table>
    </div>


  </div>
</template>
<script>
import { required,minLength,sameAs,email } from 'vuelidate/lib/validators'
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';
import { mapState, mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "Managers",
  components:{
    vueMultiSelect
  },

  data:() => ({

    errorMessage:null,
    managers:null,
    callCenters:null,
    Selected:null,
    agent:{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      phoneNumber:'',
      address:'',
    },
    submitted: false,
    submitted2: false,
    email: '',
    password: '',
    remember: false,
    editActive: false,
    edit: null,
    editProp: {},
    search2: 'Search things',
    search:'',
    search1:'',
    btnLabel: values => `Selected Call Center (${values.length})`,
    allCheck: false,
    allCheck1: false,
    page: 1,
    max: 5,
    active: 0,
    active2:0,
    selected: [],
    selected1: null,

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
      multi: false,
    },
  }),
  created(){
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('http://localhost:4002/managers', config).then(res =>{

      this.managers =res.data.managers
      this.callCenters= res.data.callCenters;
      console.log(this.callCenters)
    }).catch(err => console.log(err))
  },
  methods:{
    ...mapActions('manager', ['hospitalsSet']),
    hospitalsStore(hospitals){
      this.hospitalsSet(hospitals)
    },
    remove(){
       console.log(this.selected)
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:this.selected
      };
      console.log(config)
      axios.post('http://localhost:4002/delete/managers', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'danger',
          position:'top-right',
          title: 'Admin',
          text: `Managers deleted successfully`
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
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body:{name:this.agent.name,email:this.agent.email,callCenterID:this.Selected[0]._id,password:this.agent.password,phoneNumber:this.agent.phoneNumber,address:this.agent.address}
      };
     console.log(config)
      axios.post('http://localhost:4002/register/manager', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'Admin',
          text: `Manager created successfully`
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
      address:{
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(8)
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
