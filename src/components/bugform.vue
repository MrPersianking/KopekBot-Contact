<template>
    <main class="container">
        <div v-for="uyari in uyari" :key="uyari"  id="uyari" class="notification is-danger">
            <button @click="uyarisil()" class="delete"></button>
            <p>En az <strong>bir</strong> tane adım olmalı.</p>
        </div>
      <div class="modal" :class="{ 'is-active': this.submitStatus === 'SUBMIT' || this.submitStatus === 'ERROR'}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ title }}</p>
            <button class="delete" aria-label="close" @click="submitStatus = ''"></button>
          </header>
          <section class="modal-card-body">
            <div v-if="submitStatus === 'SUBMIT'">
              Gönderiniz başarıyla gönderildi!
            </div>
            <div v-if="submitStatus === 'ERROR'">
              Gönderiniz gönderilemedi lütfen daha sonra deneyin!
              <br>
              Hata Kodu: {{ this.error }}
            </div>
          </section>
          <footer class="modal-card-foot">
            <p>
              Designed by <strong>ShockTr</strong>, created with <strong><a href="https://bulma.io/?utm_source=borakayik">Bulma</a></strong> and ❤️
            </p>
            <p>
              Discord Adresim: Shock#1000 (301374055867613184)
            </p>
          </footer>
        </div>
      </div>
        <div id="mesajkutusu" v-if="isBug === 'Bug'">
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
                <label class="radio"><input type="radio" name="answer" value="Bug" v-model="isBug">Hata</label>
                <label class="radio"><input type="radio" name="answer" value="Oneri" v-model="isBug">Öneri</label>
            </div>
                <!-- Bug İşaretlindiğinde Çıkacak Bölüm -->
                <div v-if="isBug === 'Bug'" id="bug" class="container">
                    <label for="baslikbug">Hata nın kısa açıklaması: </label><br><input class="input" type="text" v-model.trim="baslikbug" placeholder="Başlık" id="baslikbug" style="width: 500px">
                    <br>
                    <br>
                    <p>Hata nın Adımları: <button style="margin-right: 5px" @click="adim += 1" class="button is-success is-small">Ekle</button><button @click="sil" class="button is-danger is-small">Sil</button></p>
                    <input  v-for="adim in adim" :id="'adim'+ adim" :key="adim" class="input" type="text"  :placeholder="adim + '. Adım'"  name="1" style="width: 500px">
                    <br>
                    <br>
                    <label for="gereken">Normalde olması gereken: </label><br><textarea class="textarea" type="text" v-model.trim="gereken" placeholder="Normalde olması gereken" id="gereken" style="width: 500px"></textarea>
                    <br>
                    <br>
                    <label for="olan">Şu anda olan: </label><br><textarea class="textarea" type="text" v-model.trim="olan" placeholder="Şu anda olan" id="olan" style="width: 500px"></textarea>
                    <br>
                    <p class="control">
                        <a @click="gonderbug"  class="button is-primary" :class="{ 'is-danger': this.$v.$invalid }" :disabled="this.$v.$invalid || submitStatus === 'PENDING' || submitStatus === 'ERROR'">
                            Gönder
                        </a>
                  </p>
                  <div style="margin-top: 20px" class="notification is-danger" v-if="this.$v.$invalid">Lütfen bütün bölümleri doldurun</div>
                </div>

                <!-- Öneri İşaretlindiğinde Çıkacak Bölüm -->

                <div v-if="isBug === 'Oneri'" id="oneri" class="container">
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
    </main>
</template>

<script>
    import axios from "axios";
    import {required} from 'vuelidate/lib/validators';
    export default {
        name: "bugform",
        data(){
            return {
              isBug : "Bug",
              adim : 1,
              uyari : 0,
              user : "Lütfen Giriş Yapınız",
              baslikbug: "",
              gereken: "",
              olan:"",
              submitStatus: "",
              error: "",
              title: "Teşekkürler..."
            }
        },
      validations: {
        baslikbug: {
          required
        },
        gereken: {
          required
        },
        olan: {
          required
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
                    this.uyari = 1
                }
            },
            gonderbug(){
                this.$v.$touch()
                if (!this.$v.$invalid) {
                  this.submitStatus = 'PENDING'
                  let steps = [];
                  for (let i = 1; this.adim + 1 > i; i++) {
                    steps[i] = "\n" + i + ". Adım : " + document.getElementById("adim" + i).value + "\n"
                  }
                  axios.post("https://canary.discordapp.com/api/webhooks/764553541213618210/zP6qMAp3yv7GP14z7-mZauePTVgjqSpkQq7VawB8D9eBmzxP53uQpD4uYJKak0xJSNbc",{
                    'embeds': [
                      {
                        'title': 'Yeni ' + this.isBug,
                        'description': '**Başlık :** '+ this.baslikbug +'\n\n**Yeniden Üretme Adımları:' + steps.join("") + '**\n\n**Normalde olması gereken:** '+ this.gereken +'\n\n**Şu anda olan:** '+ this.olan,
                        'color': 14421486,
                        'footer': {
                          'text': 'Discord Username : ' + this.user +   '  ID : ' +  this.$auth.user.id
                        }
                      }]
                  })
                  .catch(err => {
                    this.title = "🤔 Bir hata oluştu..."
                    this.submitStatus = "ERROR"
                    throw new Error(this.error = err.message)
                  })
                  .then(() => {
                    this.submitStatus = 'SUBMIT'
                  })
                }
            },
            gonderoner(){
              this.submitStatus = 'PENDING'
              let baslık = document.getElementById("baslık").value;
              let acıklama = document.getElementById("desc").value;
              axios.post("https://canary.discordapp.com/api/webhooks/764553541213618210/zP6qMAp3yv7GP14z7-mZauePTVgjqSpkQq7VawB8D9eBmzxP53uQpD4uYJKak0xJSNbc",{
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
                .catch(err => {
                  this.title = "🤔 Bir hata oluştu..."
                  this.submitStatus = "ERROR"
                  throw new Error(this.error = err.message)
                })
                .then(() => {
                  this.submitStatus = 'SUBMIT'
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
            }else{
              this.$auth.loginWith('discord')
            }
        },
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
    .control{
      margin-top: 10px;
    }
    @media only screen and (min-width: 601px){.container{width:85%}}
    @media only screen and (min-width: 993px){.container{width:70%}}
</style>
