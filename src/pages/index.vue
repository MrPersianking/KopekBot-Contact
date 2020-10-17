<template>
  <div id="app" style="position: relative; min-height: 100vh;">
    <div style="padding-bottom: 10rem;">
      <button style="margin: 10px;" class="button is-primary" @click="$auth.loggedIn ? logout() : $auth.loginWith('discord')"><i class="fab fa-discord" style="margin-right: 10px;"></i> {{ $auth.loggedIn ? "Çıkış Yap" : "Giriş Yap" }}</button>
      <img class="foto" src="~/static/kopekbanner.png">
      <hr>
      <botstatus class="container"></botstatus>
      <bugform></bugform>
    </div>
  </div>
</template>

<script>
import bugform from "~/components/bugform";
import botstatus from "~/components/botstatus";
export default {
  name: 'App',
  components: {
    bugform : bugform,
    botstatus :botstatus,
  },
  methods : {
    logout(){
      this.$auth.logout()
      location.reload()
    }
  }
}
</script>

<style>

.foto{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}
.container{
  margin:0 auto;
  max-width:1280px;
  width:90%
}

@media only screen and (min-width: 601px){.container{width:85%}}
@media only screen and (min-width: 993px){.container{width:70%}}
</style>
