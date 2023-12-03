<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <div>
                        <Error v-if="error" :error="error"></Error>
                        <h3>Sign UP</h3>
                        <p>Welcom to sign up page!</p>
                        <hr />
                    </div>
                
                    <form @submit.prevent="onSignUp()">
                        <div class="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                class="form-control"
                                prepend-icon="ni ni-hat-3"
                                placeholder="Jenny"
                                v-model.trim="form.firstName"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Kim"
                                v-model.trim="form.lastName"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label>SSN</label>
                            <input
                                type="text"
                                minlength="10"
                                maxlength="11"
                                class="form-control"
                                placeholder="987654-4321"
                                v-model.trim="form.socialNumber"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                class="form-control"
                                placeholder="jenny.kim@email.com"
                                v-model.trim="form.email"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                class="form-control"
                                placeholder="*******"
                                v-model.trim="form.password"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                class="form-control"
                                placeholder="*******"
                                v-model.trim="form.confirmPassword"
                                required
                            />
                        </div>

                        <div class="my-3">
                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import Error from '../components/Error.vue'

export default {
  name: 'signup-view',
  components: {
    Error
  },
  data() {
    return {
       form: {
        firstName: '',
        lastName: '',
        socialNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''

       }
    }
  },
  methods: {
    async onSignUp() {
        try {
            console.log(' submitted ' + this.form.email)
            /*const response = await axios.post('signup', {
                firstName = this.form.firstName,
                lastName = this.form.lastName,
                socialNumber = this.form.socialNumber,
                email: this.form.email,
                password: this.form.password,
                confirmPassword = this.form.confirmPassword
            })

            
            localStorage.setItem('token', response.data.token);
            this.$store.dispatch('user', response.data.user);*/
            this.$router.push('/login');
        } catch (error) {
            this.error = 'En error occured.'
        }
    
    },
    
  }
}
</script>
<style scoped>
button {
    background-color: var(--button);
    color: var(--button-letter);
    border: none;
    
}
</style>