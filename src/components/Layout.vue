<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-right"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-text-center">
      <slot />
    </ion-content>
    <ion-footer class="ion-padding ion-text-center">
      <slot name="footer" />
    </ion-footer>
  </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonFooter} from "@ionic/vue";

export default {
  props: ['pageTitle', 'pageDefaultBackLink'],
  name: "Layout",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonFooter
  }
}
</script>
