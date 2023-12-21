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

          <div class="alert alert-danger" v-if="!!error">{{ error }}</div>
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
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from '../apis/users'
export default {
  name: 'login-view',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    async onLogin() {
      try {
        console.log('Logged in' + this.form.email)

        const token = await login(undefined, this.form.email, this.form.password)
        localStorage.setItem('token', token)

        const userDetails = await getUserInfo()
        this.$store.dispatch('user', userDetails)
        this.$store.dispatch('fetchClinics')
        this.$router.push('/home')
      } catch (error) {
        this.error = 'Invalid email/password.'
      }
    }
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
