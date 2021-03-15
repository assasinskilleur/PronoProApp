<template>
  <layout page-title="Login">
    <form @submit.prevent="submitForm">
      <ion-list>
        <ion-item lines="none"><h2>Connectez-vous</h2></ion-item>
        <ion-item lines="none"><ion-label position="floating">Nom d'utilisateur</ion-label><ion-input clear-input="true" type="text" v-model="username"></ion-input></ion-item>
        <ion-item lines="none"><ion-label position="floating">Mot de passe</ion-label><ion-input clear-input="true" type="password" v-model="password"></ion-input></ion-item>
        <ion-item lines="none"><ion-button size="default" color="success" type="submit">Connexion</ion-button></ion-item>
      </ion-list>
    </form>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import {
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  loadingController, alertController,
} from "@ionic/vue";
import axios from "axios";
export default {
name: "Login",
  components: { Layout, IonList, IonLabel, IonInput, IonItem, IonButton },
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async submitForm() {
      console.log(this.$route.query);
      const user = {
        username: this.username,
        password: this.password,
      };
      const loading = await loadingController.create({
        message: "Veuillez patienter...",
      })
      await loading.present();
      axios.post('http://raxk1131.odns.fr/login', user).then(async (res) => {
        axios.get("https://pronos-image-merger.herokuapp.com/api/image/rank/" + res.data.user_type).then(async (result) => {
          await loading.dismiss();
          this.$store.dispatch('login', Object.assign({ username: this.username, image: result.data }, res.data));
          await this.$router.replace(this.$route.query.next);
        })
      }).catch(async (err) => {
        await loading.dismiss();
        const alert = await alertController.create({
          header: "Error !",
          message: err.message,
          buttons: [{
            text: 'Ok',
            cssClass: 'danger'
          }]
        });
        await alert.present();
      });
    }
  }
}
</script>

<style scoped>

</style>
