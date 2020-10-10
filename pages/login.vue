
<template>
  <div>
    <img class="foto" src="~/assets/kopekbanner.png">
    <hr>
    <h1>Yönlendiriliyor</h1>
  </div>
</template>

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
