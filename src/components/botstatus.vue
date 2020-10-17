<template>
    <div class="box" :style="{backgroundColor : color}">
            <strong style="color: #ffffff;">Bot Durumu : {{ this.durum }}</strong>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "botstatus",
        data() {
          return {
              durum : "Yükleniyor ...",
              color: "gray",
              statusPage: "https://kopekbot.statuspage.io/"
          }
        },
        created() {
            axios.get("https://q8wvhwj7prwf.statuspage.io/api/v2/status.json")
            .then(response =>{
                this.durum = response.data.status.description
                switch (response.data.status.indicator) {
                    case "none":
                        this.durum = "Her şey olması gerektiği gibi."
                        this.color ="#43B581"
                        break;
                    case "minor":
                        this.durum = "Kısmen bozulmuş."
                        this.color ="#F1C40F"
                        break;
                    case "major":
                        this.durum = "Kısmen çalışmıyor."
                        this.color ="#E67E22"
                        break;
                    case "critcal":
                        this.durum = "Komple bozulmuş."
                        this.color ="#E74C3C"
                        break;
                    case "maintenance":
                        this.durum = "Bakımda."
                        this.color ="#3498DB"
                        break;
                }
            })
        },
        methods: {

        }
    }
</script>

<style>
</style>