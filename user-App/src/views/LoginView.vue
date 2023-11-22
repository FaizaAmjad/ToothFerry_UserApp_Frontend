<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="box">
                <div>
                    <h3>Login</h3>
                    <p>Welcom to login page!</p>
                    <hr />
                </div>
             
                <form @submit.prevent="onLogin()">
                    <div class="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model.trim="email"
                        />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model.trim="password"
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
</template>

<script>

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
    onLogin() {
      
    },
    
  }
}
</script>


<style scoped>
.box{
    max-width: 1000px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid #3e6499 !important;
    padding: 30px;
    border-radius: 5px;
  }
</style>