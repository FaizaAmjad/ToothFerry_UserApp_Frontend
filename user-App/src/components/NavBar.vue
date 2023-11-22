<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">
        <div class="d-flex align-items-center">
          <span class="cart-icon d-none d-lg-block d-xl-none">&#128722;</span>
        </div>
        <span class="app-name"> ToothFerry - <span class="tagline">PROTECTS YOUR TEETH!</span></span>
    </RouterLink>
    <button class="navbar-toggler" type="button" data-coreui-toggle="collapse" data-coreui-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" v-if="!user">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="#">Sign up</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav" v-if="user">
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