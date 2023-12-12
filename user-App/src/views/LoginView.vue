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
                            <label>SSN</label>
                            <input
                                type="text"
                                minlength="10"
                                maxlength="11"
                                class="form-control"
                                placeholder="987654-4321"
                                v-model.trim="form.SSN"
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
import axios from 'axios'
import Error from '../components/Error.vue'

export default {
  name: 'login-view',
  components: {
    Error
  },
  data() {
    return {
        form: {
            SSN: '',
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
            const response = await axios.post('users/login', {
                SSN: this.form.SSN,
                email: this.form.email,
                password: this.form.password
            })
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('user', this.form.SSN);
                this.$store.dispatch('fetchClinics')
                this.$router.push('/home');
            }else if (response.status === 400 || response.status === 403) {
                this.error = 'Invalid email/password.'
            }
        } catch (error) {
            this.error = 'Something went wrong.'
            this.$router.push('/login');
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