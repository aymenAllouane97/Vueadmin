
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
            Add new <b>Agent</b>
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
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
                :indeterminate="selected.length == users.length" v-model="allCheck"
                @change="selected = $vs.checkAll(selected, users)"
            />
          </vs-th>
          <vs-th sort @click="users = $vs.sortData($event ,users, '_id')">
            Id
          </vs-th>
          <vs-th>
            image
          </vs-th>
          <vs-th >
            Name
          </vs-th>
          <vs-th >
            Email
          </vs-th>
          <vs-th >
            Birthday
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
            v-for="(tr, i) in $vs.getPage($vs.getSearch(users, search), page, max)"
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
            <vs-avatar>
              <img :src="tr.image" :alt="tr.name">
            </vs-avatar>
          </vs-td>
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.email }}
          </vs-td>
          <vs-td>
            {{ tr.birthday }}
          </vs-td>
          <vs-td>
            {{ tr.phoneNumber }}
          </vs-td>
          <vs-td>
            {{ tr.address }}
          </vs-td>
          <vs-td>
            <vs-row>
              <vs-button flat icon>
                Grant to manager
              </vs-button>
              <vs-button border danger>
                Ban User
              </vs-button>
            </vs-row>

          </vs-td>

        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(users, search), max)" />
      </template>
    </vs-table>

    <vs-dialog v-model="editActive">
      <template #header>
        Change Prop {{ editProp }}
      </template>
      <vs-input @keypress.enter="editActive = false" v-if="editProp == 'email'" v-model="edit[editProp]" />
      <vs-select @change="editActive = false" block v-if="editProp == 'name'" placeholder="Select" v-model="edit[editProp]">
        <vs-option label="Vuesax" value="Vuesax">
          Vuesax
        </vs-option>
        <vs-option label="Vue" value="Vuejs">
          Vue
        </vs-option>
        <vs-option label="Javascript" value="Javascript">
          Javascript
        </vs-option>
        <vs-option disabled label="Sass" value="Sass">
          Sass
        </vs-option>
        <vs-option label="Typescript" value="Typescript">
          Typescript
        </vs-option>
        <vs-option label="Webpack" value="Webpack">
          Webpack
        </vs-option>
        <vs-option label="Nodejs" value="Nodejs">
          Nodejs
        </vs-option>
      </vs-select>
    </vs-dialog>
  </div>
</template>

<script>
import { required,minLength,sameAs,email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "Users",
  components:{

  },

  data:() => ({
    errorMessage:null,
    users:null,
    agent:{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
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
    selected: [],

  }),
  created(){
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('http://localhost:4002/users', config).then(res =>{ this.users =res.data
      }).catch(err => console.log(err))
  },
  methods:{
    ...mapActions('manager', ['agentsSet']),
    agentStore(agents){
      this.agentsSet(agents)
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
        body:{name:this.agent.name,email:this.agent.email,password:this.agent.password}
      };

      axios.post('http://localhost:4002/register/agent', config).then(res =>{
        this.$vs.notification({
          progress: 'auto',
          color:'success',
          position:'top-right',
          title: 'agent',
          text: `agent created successfully`
        })
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
      email: {
        required,email
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

<!--<style lang="stylus" scoped>-->
<!--getColor(vsColor, alpha = 1)-->
<!--unquote("rgba(var(&#45;&#45;vs-"+vsColor+"), "+alpha+")")-->
<!--getVar(var)-->
<!--unquote("var(&#45;&#45;vs-"+var+")")-->
<!--.not-margin-->
<!--  margin 0px-->
<!--  font-weight normal-->
<!--  padding 10px-->
<!--.con-form-->
<!--  width 100%-->
<!--  .flex-->
<!--    display flex-->
<!--    align-items center-->
<!--    justify-content space-between-->
<!--    a-->
<!--      font-size .8rem-->
<!--      opacity .7-->
<!--      &:hover-->
<!--        opacity 1-->
<!--  .vs-checkbox-label-->
<!--    font-size .8rem-->
<!--  .vs-input-content-->
<!--    margin 10px 0px-->
<!--    width calc(100%)-->
<!--    .vs-input-->
<!--      width 100%-->
<!--.footer-dialog-->
<!--  display flex-->
<!--  align-items center-->
<!--  justify-content center-->
<!--  flex-direction column-->
<!--  width calc(100%)-->
<!--  .new-->
<!--    margin 0px-->
<!--    margin-top 20px-->
<!--    padding: 0px-->
<!--    font-size .7rem-->
<!--    a-->
<!--      color getColor('primary') !important-->
<!--      margin-left 6px-->
<!--      &:hover-->
<!--        text-decoration underline-->
<!--  .vs-button-->
<!--    margin 0px-->
<!--</style>-->
