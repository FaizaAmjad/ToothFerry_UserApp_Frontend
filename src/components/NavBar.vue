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
            <b-dropdown-item href="/login">Login</b-dropdown-item>
            <b-dropdown-item href="/signup">Sign-up</b-dropdown-item>
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
            <RouterLink class="nav-link" to="/clinic">Cinic</RouterLink>
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
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { getUserInfo } from '../apis/users'
import { disConnect } from '../ws'
export default {
  name: 'nav-bar',

  setup() {
    onMounted(() => {
      //const store = useStore()
      const router = useRouter()
      const route = useRoute()

      defineUser().then(() => {
        const token = localStorage.getItem('token')
        if (token && ['/', '/login', '/signup'].includes(route.path)) {
          router.push('/home')
        } else if (!token && !['/', '/login', '/signup'].includes(route.path)) {
          router.push('/login')
        }
      })
      /*  .catch(() => {
          router.push('/login')
        }) */
    })
    const store = useStore()
    const router = useRouter()
    const handleLogout = () => {
      localStorage.removeItem('token')
      disConnect()
      store.dispatch('user', null)
      router.push('/login')
    }

    const defineUser = async () => {
      const userDetails = await getUserInfo()
      return store.dispatch('user', userDetails)
    }

    return { handleLogout }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped></style>
