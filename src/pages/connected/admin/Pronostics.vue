<template>
  <list-prono :pronostics="pronostics" nextlink="/admin/prono/details/">
    <template v-slot:actions-right>
      <ion-button router-link="/admin/prono/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <template v-slot:button>
      <ion-button color="primary">
        Voir
      </ion-button>
    </template>
  </list-prono>
</template>

<script>
import ListProno from "@/components/ListProno";
import {add} from "ionicons/icons";
import { IonButton, IonIcon } from '@ionic/vue';

export default {
  name: "Pronostics",
  components: {ListProno, IonButton, IonIcon},
  data() {
    return {
      add,
    }
  },
  ionViewWillEnter() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/prono');
    }else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    } else {
      this.$store.dispatch("getPronostics");
    }
  },
  computed: {
    pronostics() {
      return this.$store.getters.pronostics;
    }
  }
}
</script>
