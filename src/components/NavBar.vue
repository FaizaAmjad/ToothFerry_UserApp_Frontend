<template>
<nav toggleable="lg" class="navbar navbar-expand-lg bg-body-tertiary navbar-light">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">
        <span class="app-name"> ToothFerry - <span class="tagline">PROTECTS YOUR TEETH!</span></span>
    </RouterLink>
    
    <div >
      <ul class="nav navbar-nav navbar-right" v-if="!user">
        <b-nav-item-dropdown right>
          <!-- TODO: Check whether the user is logged in or not and display the information based on that -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="login">Login</b-dropdown-item>
          <b-dropdown-item href="signup">Sign-up</b-dropdown-item>
          <b-dropdown-item href="my-page">Account</b-dropdown-item>
        </b-nav-item-dropdown>
      </ul>
      <ul class="nav navbar-nav navbar-left" v-if="user">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/home">Home</RouterLink>
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
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      handleLogout() {
      localStorage.removeItem('token');
      this.$store.dispatch('user', null)
      this.$router.push('/');
    },
    }
  }
</script>

<style scoped>

</style>