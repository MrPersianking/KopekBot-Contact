
<template>
  <div style="position: relative; min-height: 100vh;">
    <img class="foto" src="~/static/kopekbanner.png" alt="">
    <hr>
    <h1>Yönlendiriliyor</h1>
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
	mounted() {
		if (this.$auth.loggedIn) {
			this.$router.push("/");
			return;
		}
		this.$auth.login("discord");
	},
	head() {
		return {
			title: "Authorization",
			titleTemplate: ""
		};
	}
};
</script>
