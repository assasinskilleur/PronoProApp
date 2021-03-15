<template>
  <layout page-title="Utilisateur">
    <ion-card>
      <ion-img :src="user.image" alt="test"></ion-img>
      <ion-card-header>
        <ion-card-subtitle>Nom d'utilisateur :</ion-card-subtitle>
        <ion-card-title>{{ user.username }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button color="danger" expand="block" @click="logout()">Déconnexion</ion-button>
      </ion-card-content>
    </ion-card>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle } from '@ionic/vue'
export default {
name: "Account",
  components: {Layout, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader},
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/account');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', this.user);
      this.$router.replace('/');
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>
