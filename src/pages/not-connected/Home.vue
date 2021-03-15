<template>
  <layout page-title="Accueil">
    <br>
    <br>
    <ion-grid>
      <ion-row>
        <ion-col></ion-col>
        <ion-col size="10">
          <ion-select placeholder="Type" interface="alert" :interface-options="customOptions" v-model="selectedType">
            <ion-select-option v-for="type in types" :key="type.id" :value="type.id">{{
                type.libelle
              }}
            </ion-select-option>
          </ion-select>
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
    </ion-grid>
    <br>
    <br>
    <ion-button expand="block" :disabled="selectedType == -1" :router-link="'/pronostics/' + selectedType">Voir les pronostics</ion-button>
    <template v-slot:footer v-if="!isConnected()">
      <ion-button expand="block" color="success" :router-link="'/login?next=/'">Se connecter</ion-button>
    </template>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import {IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton} from "@ionic/vue";

export default {
  name: "Home",
  components: {
    Layout,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonButton
  },
  data() {
    const customOptions = {
      header: 'Type',
      subHeader: 'Selectionner le type de pronostique',
      message: 'Veuillez ne séléctionner que 1 type'
    };
    return {
      customOptions,
      selectedType: -1
    }
  },
  methods: {
    isConnected() {
      return this.$store.getters.user.connected;
    }
  },
  mounted() {
    this.$store.dispatch("getTypes")
  },
  computed: {
    types() {
      return this.$store.getters.types;
    }
  }
}
</script>
