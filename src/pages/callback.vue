<template>
  <div style="position: relative; min-height: 100vh;">
    <img class="foto" src="~/static/kopekbanner.png">
    <hr>
    <h1>Bilgiler İşleniyor</h1>
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
	head() {
		return {
			title: "Authorization...",
			titleTemplate: ""
		};
	}
};
</script>
