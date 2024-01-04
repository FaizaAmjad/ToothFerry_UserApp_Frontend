<template>
  <div id="app">
    <header>
      <NavBar />
    </header>

    <router-view />

    <footer style="padding-top: 100px">
      <WebFooter />
    </footer>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar.vue'
import WebFooter from './components/WebFooter.vue'
export default {
  components: {
    NavBar,
    WebFooter
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}

body {
  background: var(--main-bg) !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#app {
  text-align: center;
}

/* This part is to alter the theme color */
:root {
  --main-bg: #81b1de;
  --secondary-bg: #bbcde5;
  --footer-bg: #1c5d99;
  --button: #f8f4e3;
  --button-letter: #545863;
  --letter: #0d1821;
}
:root.dark {
  --main-bg: #355691;
  --secondary-bg: #bbcde5;
  --footer-bg: #354067;
  --button: #c6c5b9;
  --letter: white;
  --background-image-first: url('./assets/Without-Languages(LM).png');
  --background-image-second: url('./assets/starsBackground(LM).svg');
}

.navbar-light {
  background-color: #ffffff;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 5%;
}

.auth-inner {
  width: 80%;
  max-width: 450px;
  margin: auto;
  background: var(--secondary-bg);
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px;
  border-radius: 15px;
  transition: all 0.3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
.wrapper,
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 40px;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password a {
  text-align: center;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}

.schedule-table-container {
  max-width: 800px;
  margin: 0 auto;
}

img,
video {
  max-width: 100%;
  height: auto;
}

.container {
  width: 100%;
  max-width: 1200px; /* or any desired maximum width */
}

@media only screen and (max-width: 600px) {
  .auth-inner {
    width: 90%;
    padding: 20px;
  }
}
</style>
