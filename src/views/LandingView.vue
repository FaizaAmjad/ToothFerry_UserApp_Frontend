<template>
  <div class="min-vh-100 container-fluid p-0 m-0">
    <img src="../assets/Tooth-Ferry.jpg" class="img-fluid" alt="Responsive image" />
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Hide overflow to prevent scrolling */
}

.container-fluid {
  background-color: #214471;
  text-align: center;
  text-shadow: 4px 4px 8px rgb(255, 255, 255);
  padding: 1%;
  height: 100vh;
  overflow: hidden; /* Hide overflow to prevent scrolling */
}

.min-vh-100 {
  opacity: 0.9;
}

img.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden; /* Hide overflow to prevent scrolling */
}
</style>
