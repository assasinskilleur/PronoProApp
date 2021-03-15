<template>
  <layout page-title="Ajout d'image">
    <ion-item>
      <ion-label position="floating">URL d'une image</ion-label>
      <ion-input type="url" v-model="imageUrl"></ion-input>
    </ion-item>
    <ion-button color="success" expand="block" :disabled="imageUrl === ''" @click="addImage()">Valider</ion-button>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import axios from "axios";
import {alertController, loadingController} from "@ionic/vue";
import {IonInput, IonButton, IonLabel, IonItem} from '@ionic/vue';
export default {
name: "AddImage",
  components: {Layout, IonInput, IonButton, IonLabel, IonItem},
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    async addImage() {
      const loading = await loadingController.create({
        message: "Veuillez patienter...",
      })
      await loading.present();
      axios.post('https://pronos-image-merger.herokuapp.com/api/image/save', { image: this.imageUrl }).then(async () => {
        await loading.dismiss();
        this.imageUrl = '';
      }).catch(async (err) => {
        await loading.dismiss();
        let alert = await alertController.create({
          message: err.message,
          header: 'Error',
          subHeader: err.response.data.message,
          buttons: ['Ok']
        });
        await alert.present();
      });
    }
  }

}
</script>

<style scoped>

</style>
