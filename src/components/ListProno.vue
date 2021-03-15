<template>
  <layout page-title="Pronostics">
    <template v-slot:actions-right>
      <slot name="actions-right" />
    </template>
    <ion-list>
      <ion-item button v-for="prono in pronostics" :key="prono.id" :router-link="nextlink + prono.id">
        <ion-thumbnail class="img-prono">
          <ion-img :src="prono.image" alt="image"/>
        </ion-thumbnail>
        <ion-label>{{ prono.name }}</ion-label>
        <slot name="button"/>
      </ion-item>
    </ion-list>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import {IonItem, IonList, IonImg, IonLabel, IonThumbnail} from "@ionic/vue";

export default {
  name: "ListProno",
  components: {Layout, IonList, IonItem, IonImg, IonLabel, IonThumbnail},
  props: ['pronostics', 'nextlink'],
}
</script>

<style scoped>
.img-prono {
  width: 25% !important;
  height: 100% !important;
  max-width: 25% !important;
  max-height: 100% !important;
}
</style>
