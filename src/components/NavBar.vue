<template>
  <nav toggleable="lg" class="navbar navbar-expand-lg bg-body-tertiary navbar-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <span class="app-name">
          ToothFerry - <span class="tagline">PROTECTS YOUR TEETH!</span></span
        >
      </RouterLink>

      <div>
        <ul class="nav navbar-nav navbar-right" v-if="!user">
          <b-nav-item-dropdown right>
            <!-- TODO: Check whether the user is logged in or not and display the information based on that -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="login">Login</b-dropdown-item>
            <b-dropdown-item href="signup">Sign-up</b-dropdown-item>
            <!--<b-dropdown-item href="my-page">Account</b-dropdown-item>-->
          </b-nav-item-dropdown>
        </ul>

        <ul class="nav navbar-nav navbar-left" v-if="user">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/home">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/my-page">Profile</RouterLink>
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
import { mapGetters, useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'nav-bar',
  async mounted() {
    const router = useRouter()
    this.user = localStorage.getItem('token') != null
   /*  if (this.user) {
      router.push('/home')
    } else if (!this.user) {
      router.push('/login')
    } */
  },
  data: function () {
    return {
      user: null
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const handleLogout = () => {
      localStorage.removeItem('token')
      store.dispatch('user', null)
      this.user = null
      router.push('/login')
    }

    return { handleLogout }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped></style>
