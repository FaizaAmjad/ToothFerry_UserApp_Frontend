<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <b-navbar-brand to="/">
        <div class="d-flex align-items-center">
          <span class="cart-icon d-none d-lg-block d-xl-none">&#128722;</span>
        </div>
        <span class="app-name"> ToothFerry - <span class="tagline">PROTECTS FROM ROTTEN TOOTH!</span></span>
    </b-navbar-brand>
    <button class="navbar-toggler" type="button" data-coreui-toggle="collapse" data-coreui-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
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
          <RouterLink class="nav-link" to="#">Login</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<RouterView />

</template>

<script script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'


</script>

<style scoped>

.navbar {
    background-color: rgb(142, 197, 197);
}

.app-name {
  font-size: 24px; /* Adjust the size as needed */
  color: rgb(99, 99, 189);
  font-weight: bold; /* If you want it to be bold */
}

.tagline {
  font-size: 14px !important; /* Adjust the size as needed */
  color: rgb(99, 99, 189) ;
  display: inline; /* Place the tagline on a new line */
}
.nav-link {
  color: rgb(99, 99, 189) !important; /* Set link text color to white */
}
.nav-link:hover {
  text-decoration: underline !important; /* Remove underline on hover */
  color: rgb(26, 20, 138); /* Change link color on hover */
}
body{
  background-color: #def7dc !important;
}

</style>