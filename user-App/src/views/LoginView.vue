<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <div>
                        <h3>Login</h3>
                        <p>Welcome to login page!</p>
                        <hr />
                    </div>
                
                    <form @submit.prevent="onLogin()">
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
                        <div class="my-3">
                            <button type="submit" class="btn btn-primary">
                                Login
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
  name: 'login-view',
  data() {
    return {
        form: {
            email: '',
            password: ''
        }
    }
  },
  methods: {
    async onLogin() {
        console.log('Logged in' + this.email)
      /*const response = await axios.post('login', {
        email: this.email,
        password: this.password
      })

      
      localStorage.setItem('token', response.data.token);
      this.$store.dispatch('user', response.data.user);*/
      this.$router.push('/');
    },
    
  }
}
</script>


<style scoped>

</style>