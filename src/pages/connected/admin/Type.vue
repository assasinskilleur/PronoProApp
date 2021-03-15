<template>
  <layout page-title="Type">
    <template v-slot:actions-right>
      <ion-button router-link="/admin/type/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <ion-list>
      <ion-item v-for="type of types" v-bind:key="type.id">
        {{ type.libelle }}
        <ion-button slot="end" color="danger" @click="deleteType(type)">
          <ion-icon slot="icon-only" :icon="trash"></ion-icon>
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
name: "Type",
  components: {Layout, IonButton, IonIcon, IonList, IonItem},
  data() {
    return {
      add,
      trash
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/type');
    }else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    } else {
      this.$store.dispatch('getTypes');
    }
  },
  methods: {
    deleteType(type) {
      this.$store.dispatch("deleteType", type.id)
    }
  },
  computed: {
    types() {
      return this.$store.getters.types;
    }
  }
}
</script>

<style scoped>

</style>
