<template>
  <div style="position: relative; min-height: 100vh;">
    <img class="foto" src="~/static/kopekbanner.png">
    <hr>
    <h1 style="text-align: center">Çıkış Yapılıyor</h1>
  </div>
</template>

<style>
.foto{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}
</style>

<script>
export default {
	created() {
		this.$auth.logout();
		this.$router.push("/");
	},
	head() {
		return {
			title: "Logout",
			titleTemplate: ""
		};
	}
};
</script>
