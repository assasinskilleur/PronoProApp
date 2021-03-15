<template>
  <layout page-title="Compet">
    <template v-slot:actions-right>
      <ion-button router-link="/admin/compet/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <ion-list>
      <ion-item v-for="compet of compets" v-bind:key="compet.id">
        {{ compet.competition }}
        <ion-button slot="end" color="danger" @click="deleteCompet(compet)">
          <ion-icon :icon="trash"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import { IonButton, IonIcon, IonList, IonItem } from '@ionic/vue';
import { add, trash } from 'ionicons/icons';
export default {
name: "Compet",
  components: {Layout, IonButton, IonIcon, IonList, IonItem},
  data() {
    return {
      add,
      trash
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/compet');
    } else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    } else {
      this.$store.dispatch("getCompetitions");
    }
  },
  methods: {
    deleteCompet(compet) {
      this.$store.dispatch("deleteCompet", compet.id)
    }
  },
  computed: {
    compets() {
      return this.$store.getters.competitions;
    }
  }
}
</script>

<style scoped>

</style>
