<template>
    <div id="app">
        <header>
            <NavBar/>
        </header>
        <router-view/>

        <WebFooter/>
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

body {
    background: #81b1de !important;
    min-height: 100VH;
    display: flex;
    font-weight: 400;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
}

#app {
    text-align: center;
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