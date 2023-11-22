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
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<RouterView />

</template>

<script script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<style scoped>

</style>