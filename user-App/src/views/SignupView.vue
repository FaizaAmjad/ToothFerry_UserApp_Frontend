<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <div>
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
                                v-model.trim="form.firstName"
                            />
                        </div>

                        <div class="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model.trim="form.lastName"
                            />
                        </div>

                        <div class="form-group">
                            <label>Social Security Number</label>
                            <input
                                type="number"
                                class="form-control"
                                v-model.trim="form.socialNumber"
                            />
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model.trim="form.email"
                            />
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                class="form-control"
                                v-model.trim="form.password"
                            />
                        </div>

                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                class="form-control"
                                v-model.trim="form.confirmPassword"
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
export default {
  name: 'signup-view',
  data() {
    return {
       form: {
        firstName: '',
        lastName: '',
        socialNumber: '',
        email: '',
        password: '',
        confirmPassword: ''

       }
    }
  },
  methods: {
    async onSignUp() {
        console.log('submitted' + this.email)
      /*const response = await axios.post('login', {
        firstName = this.firstName,
        lastName = this.lastName,
        socialNumber = this.socialNumber,
        email: this.email,
        password: this.password,
        confirmPassword = this.confirmPassword
      })

      
      localStorage.setItem('token', response.data.token);
      this.$store.dispatch('user', response.data.user);
      this.$router.push('/');*/
    },
    
  }
}
</script>
