<template>
  <div>
    <img class="foto" src="~/assets/kopekbanner.png">
    <hr>
    <h1>Çıkış Yapılıyor</h1>
  </div>
</template>

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
