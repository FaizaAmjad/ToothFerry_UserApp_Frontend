<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <img src="/assets/toothFerry.png" alt="toothFerry" width="30" height="24">
        <RouterLink class="navbar-brand" to="/">ToothFerry</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">About Us</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</header>

  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped>
</style>
