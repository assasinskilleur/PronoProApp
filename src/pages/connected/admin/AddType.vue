<template>
  <layout page-title="Ajout de type de sport" page-default-back-link="/admin/compet">
    <form @submit.prevent="SubmitForm()">
      <ion-item>
        <ion-label position="floating">Nom du type de sport</ion-label>
        <ion-input type="text" v-model="typeName"></ion-input>
      </ion-item>

      <ion-button type="submit" color="success">Valider</ion-button>
    </form>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
export default {
  name: "AddType",
  components: {Layout, IonInput, IonItem, IonLabel, IonButton},
  data() {
    return {
      typeName: '',
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/type/add');
    } else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    }
  },
  methods: {
    SubmitForm() {
      this.$store.dispatch('addType', this.typeName);
      this.$router.replace('/admin/type');
    }
  }
}
</script>

<style scoped>

</style>
