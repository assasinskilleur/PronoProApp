<template>
  <list-prono :pronostics="pronostics" :type-id="typeId" :nextlink="getRoute()">
    <template v-slot:button>
      <ion-button @click.prevent color="danger" v-if="!isConnected()">
        <ion-icon slot="icon-only" :icon="lockClosedOutline"></ion-icon>
      </ion-button>
      <ion-button color="success" v-if="isConnected()">
        <ion-icon slot="icon-only" :icon="lockOpenOutline"></ion-icon>
      </ion-button>
    </template>
  </list-prono>
</template>

<script>
import ListProno from "@/components/ListProno";
import { IonButton, IonIcon } from '@ionic/vue';
import {lockClosedOutline, lockOpenOutline} from "ionicons/icons";
export default {
  name: "Pronos",
  components: {ListProno, IonIcon, IonButton},
  data() {
    return {
      typeId: this.$route.params.id,
      lockClosedOutline,
      lockOpenOutline
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.typeId = currentRoute.params.id;
    }
  },
  methods: {
    isConnected() {
      return this.$store.getters.user.connected;
    },
    getRoute() {
      if (this.$store.getters.user.connected) {
        return '/pronostics/' + this.typeId + '/details/';
      }
      return '/login?next=/pronostics/' + this.typeId + '/details/';
    }
  },
  ionViewDidEnter() {
    this.$store.dispatch("getPronosticsByTypes", this.typeId);
  },
  computed: {
    pronostics() {
      return this.$store.getters.pronostics;
    }
  }
}
</script>
