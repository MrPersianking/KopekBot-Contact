<template>
    <main class="container">
        <div v-for="uyari in uyari" :key="uyari"  id="uyari" class="notification is-danger">
            <button @click="uyarisil()" class="delete"></button>
            <p>En az <strong>bir</strong> tane adım olmalı.</p>
        </div>
        <div id="mesajkutusu" v-if="isBug == 'Bug'">
            <article class="message is-danger">
                <div class="message-header">
                    <p>Uyarı</p>
                    <button class="delete" aria-label="delete" @click='gizle("mesajkutusu")'></button>
                </div>
                <div class="message-body">
                    <strong>Hata göndermeden önce yapmanız gerekenler:</strong>
                    <p>1- <strong>Hata</strong>nızın daha önce raporlanmadığını <a href="https://trello.com/b/BRibixHw/k%C3%B6pek-bot">Trello</a> adresimizden kontrol edin.</p>
                    <p>2- <strong>Hata</strong>nızın fotoğraflarını alın.</p>
                    <p>3- <strong>Hata</strong>nızın yeniden üretilebilir olduğundan emin olun.</p>
                    <br>
                    <strong>Bunları yaptıysanız <strong>hata</strong>nızın raporlamaktan çekinmeyin.</strong>
                </div>
            </article>
            <br>
        </div>
        <div id="form">
            <div class="username">
                <label for="Discord"> Discord Kullanıcı Adı: </label><br><input class="input" type="text" id="Discord" name="username-discord" style="width: 500px" v-bind:value="user" disabled>
            </div>
            <div class="control">
                <label class="radio">
                    <input type="radio" name="answer" value="Bug" v-model="isBug">
                    Hata
                </label>
                <label class="radio">
                    <input type="radio" name="answer" value="Oneri" v-model="isBug">
                    Öneri
                </label>

                <!-- Bug İşaretlindiğinde Çıkacak Bölüm -->
                <div v-if="isBug == 'Bug'" id="bug" class="container">
                    <label for="baslikbug">Hata nın kısa açıklaması: </label><br><input class="input" type="text" placeholder="Başlık" id="baslikbug" style="width: 500px">
                    <br>
                    <br>
                    <p>Hata nın Adımları: <button @click="adim += 1" class="button is-success is-small">Ekle</button><button @click="sil" class="button is-danger is-small">Sil</button></p>
                    <input v-for="adim in adim" :id="'adim'+ adim" :key="adim" class="input" type="text"  :placeholder="adim + '. Adım'"  name="1" style="width: 500px">
                    <br>
                    <br>
                    <label for="gereken">Normalde olması gereken: </label><br><textarea class="textarea" type="text" placeholder="Normalde olması gereken" id="gereken" style="width: 500px"></textarea>
                    <br>
                    <br>
                    <label for="olan">Şu anda olan: </label><br><textarea class="textarea" type="text" placeholder="Şu anda olan" id="olan" style="width: 500px"></textarea>
                    <br>
                    <p class="control">
                        <a @click="gonderbug"  class="button is-primary">
                            Gönder
                        </a>
                    </p>
                </div>

                <!-- Öneri İşaretlindiğinde Çıkacak Bölüm -->

                <div v-if="isBug == 'Oneri'" id="oneri" class="container">
                    <label for="baslık">Başlık: </label><br><input class="input" type="text" placeholder="Başlık" id="baslık" style="width: 500px">
                    <br>
                    <label for="desc">Açıklama: <textarea class="textarea" placeholder="Açıklama" id="desc"></textarea></label>
                    <br>
                    <p class="control">
                        <a @click="gonderoner" class="button is-primary">
                            Gönder
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import axios from "axios";
    export default {
        name: "bugform",
        data(){
            return {
                isBug : "Bug",
                adim : 1,
                uyari : 0,
                user : "Lütfen Giriş Yapınız"
            }
        },
        methods : {
            gizle(input){
                var element = document.getElementById(input);
                element.parentNode.removeChild(element);
            },
            sil(){
                if (this.adim > 1){
                    this.adim -= 1
                }else {
                    this.uyari += 1
                }
            },
            gonderbug(){
                let steps = [];
                for (let i = 1; this.adim + 1 > i; i++) {
                    steps[i] = "\n" + i + ". Adım : " + document.getElementById("adim" + i).value + "\n"
                }
                let stepsjoined = steps.join("")
                let baslık = document.getElementById("baslikbug").value;
                let gereken = document.getElementById("gereken").value;
                let olan = document.getElementById("olan").value;
                axios.post("https://canary.discordapp.com/api/webhooks/730077368861065288/MSMwGpO1GB8-WIoCs4-OyPWaSOT9ub65rpaLrqYyTmd5R9N6AKmnpt5ttsfxKjHJjtDU",{
                    'embeds': [
                        {
                            'title': 'Yeni ' + this.isBug,
                            'description': '**Başlık :** '+ baslık +'\n\n**Yeniden Üretme Adımları:' + stepsjoined + '**\n\n**Normalde olması gereken:** '+ gereken +'\n\n**Şu anda olan:** '+ olan,
                            'color': 14421486,
                            'footer': {
                                'text': 'Discord Username : ' + this.user +   '  ID : ' +  this.$auth.user.id
                            }
                        }]
                })
            },
            gonderoner(){
                let baslık = document.getElementById("baslık").value;
                let acıklama = document.getElementById("desc").value;
                axios.post("WEBHOOKURL",{ //TODO: CHANGE THİS
                    'embeds': [
                        {
                            'title': 'Yeni ' + this.isBug,
                            'description': '**Başlık :** '+ baslık +'\n\n**Açıklama:** ' + acıklama,
                            'color': 14421486,
                            'footer': {
                                'text': 'Discord Username : ' + this.user +   '  ID : ' +  this.$auth.user.id
                            }
                        }]
                })
            },
            uyarisil(){
                if (this.uyari > 0){
                    this.uyari -= 1
                }
            }
        },
        mounted(){
            if(this.$auth.loggedIn){
               this.user = this.$auth.user.username + "#" + this.$auth.user.discriminator
            }
        }
    }
</script>

<style>
    #form{
        text-align: center;
        justify-items: center;
    }
    .container{
        margin:0 auto;
        max-width:1280px;
        width:90%
    }
    @media only screen and (min-width: 601px){.container{width:85%}}
    @media only screen and (min-width: 993px){.container{width:70%}}
</style>
