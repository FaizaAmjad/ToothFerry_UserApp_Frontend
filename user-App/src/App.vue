<template>
    <div id="app">
        <header>
            <NavBar/>
        </header>
        
        <router-view/>

        <footer>
            <WebFooter/>
        </footer>
        
    </div>
</template>

<script>
    //import axios from 'axios'
    import "bootstrap/dist/css/bootstrap.min.css"
    import NavBar from './components/NavBar.vue'
    import WebFooter from "./components/WebFooter.vue"

    export default {
        components: {
            NavBar,
            WebFooter,
        },
       // async created() {
         //   const response = await axios.get('user');
           // this.$store.dispatch('user', response.data);
        //}
    }
    

</script>

<style>

* {
    box-sizing: border-box;
}



body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
}

#app {
    text-align: center;
}

/* This part is to alter the theme color */
:root {
  --account-bg: #81b1de;
  --button: #1870d5;
  --letter: white;
  --background-image-first: url('./assets/Without-Languages.png');
  --background-image-second: url('./assets/starsBackground.svg');

}
:root.dark {
  --account-bg: #051650;
  --button: #ffb347;
  --letter: black;
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
    padding: 40px;
    
}

.auth-inner {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34,35,58,0.2);
    padding: 40px;
    border-radius: 15px;
    transition: all .3s;
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

</style>