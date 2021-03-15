<template>
  <layout page-title="Ajout de competition" page-default-back-link="/admin/compet">
    <form @submit.prevent="SubmitForm()">
      <ion-item>
        <ion-label position="floating">Nom de la competition</ion-label>
        <ion-input type="text" v-model="competName"></ion-input>
      </ion-item>

      <ion-button type="submit" color="success">Valider</ion-button>
    </form>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
export default {
  name: "AddCompet",
  components: {Layout, IonInput, IonItem, IonLabel, IonButton},
  data() {
    return {
      competName: '',
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/compet/add');
    } else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    }
  },
  methods: {
    SubmitForm() {
      this.$store.dispatch('addCompet', this.competName);
      this.$router.replace('/admin/compet');
    }
  }
}
</script>

<style scoped>

</style>
