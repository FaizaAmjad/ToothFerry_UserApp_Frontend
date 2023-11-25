<template>
<nav toggleable="lg" class="navbar navbar-expand-lg bg-body-tertiary navbar-light">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">
        <span class="app-name"> ToothFerry - <span class="tagline">PROTECTS YOUR TEETH!</span></span>
    </RouterLink>
    
    <div >
      <ul class="nav navbar-nav navbar-right" v-if="!user">
        <li class="nav-item">
          <RouterLink class="nav-link active " aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/login"><span class="glyphicon glyphicon-log-in"></span>Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/signup">Sign up</RouterLink>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-left" v-if="user">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="#">Features</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about">About Us</RouterLink>
        </li>
        <li class="nav-item">
          <a href="javascript:void(0)" @click="handleLogout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'nav-bar',
    handleLogout() {
      localStorage.removeItem('token');
      this.$store.dispatch('user', null)
      this.$router.push('/');
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>

<style scoped>

</style>