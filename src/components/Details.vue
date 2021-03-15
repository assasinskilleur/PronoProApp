<template>
  <layout page-title="Détails Pronostics" :page-default-back-link="backLink">
    <ion-img :src="prono?.image" alt="Image"></ion-img>
    <h2>{{ prono?.name }}</h2>
    <p>analyse : {{ prono?.analyse }}</p>
    <ion-grid>
      <ion-row>
        <ion-col><ion-card :color="prono?.res_prono === '1' ? 'medium' : ''"><ion-card-header>1</ion-card-header></ion-card></ion-col>
        <ion-col><ion-card :color="prono?.res_prono === 'N' ? 'medium' : ''"><ion-card-header>N</ion-card-header></ion-card></ion-col>
        <ion-col><ion-card :color="prono?.res_prono === '2' ? 'medium' : ''"><ion-card-header>2</ion-card-header></ion-card></ion-col>
      </ion-row>
    </ion-grid>
    <slot name="buttons" />
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonImg } from "@ionic/vue"
export default {
  name: "Details",
  components: {Layout, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonImg},
  props: ['backLink', 'prono'],
}
</script>
