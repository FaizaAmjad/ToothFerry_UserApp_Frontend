<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <div>
                        <Error v-if="error" :error="error"></Error>
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
import Error from '../components/Error.vue'

export default {
  name: 'login-view',
  components: {
    Error
  },
  data() {
    return {
        form: {
            email: '',
            password: '',
            error: ''
        }
    }
  },
  methods: {
    async onLogin() {
        try {
            console.log('Logged in' + this.form.email)
            /*const response = await axios.post('login', {
                email: this.email,
                password: this.password
            })

            localStorage.setItem('token', response.data.token);
            this.$store.dispatch('user', response.data.user);*/
            this.$router.push('/');
        } catch (error) {
            this.error = 'Invalid email/password.'
        }
    },
  }
}
</script>


<style scoped>

</style>