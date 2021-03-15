<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom" v-if="isConnected()">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Accueil</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="compet" href="/admin/compet" v-if="isAdmin()">
          <ion-icon :icon="trophy" />
          <ion-label>Compet</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="type" href="/admin/type" v-if="isAdmin()">
          <ion-icon :icon="football" />
          <ion-label>Type</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="prono" href="/admin/prono" v-if="isAdmin()">
          <ion-icon :icon="statsChart" />
          <ion-label>Prono</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="image" href="/admin/image">
          <ion-icon :icon="image" />
          <ion-label>Image</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="account" href="/account">
          <ion-icon :icon="personCircle" />
          <ion-label>Compte</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/vue"
import { home, personCircle, trophy, football, statsChart, image } from 'ionicons/icons';
export default {
  name: "TabsPage",
  components: {
    IonLabel,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonPage
  },
  methods: {
    isConnected() {
      return this.$store.getters.user.connected;
    },
    isAdmin() {
      return this.$store.getters.user.user_type === 'admin';
    }
  },
  data() {
    return {
      home,
      personCircle,
      trophy,
      football,
      statsChart,
      image
    }
  }
}
</script>
