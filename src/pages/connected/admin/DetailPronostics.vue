<template>
  <Details :prono="pronostic">
    <template v-slot:buttons>
      <ion-button color="warning" expand="block" :router-link="'/admin/prono/edit/' + pronoId">
        Modifier
      </ion-button>
      <ion-button color="danger" expand="block" @click="deletePronostic()">
        Supprimer
      </ion-button>
    </template>
  </Details>
</template>

<script>
import Details from "@/components/Details";
import { IonButton } from '@ionic/vue';
export default {
  name: "DetailPronostics",
  components: {Details, IonButton},
  data() {
    return {
      pronoId: this.$route.params.id
    }
  },
  methods: {
    deletePronostic() {
      this.$store.dispatch('deletePronostic', this.pronoId);
      this.$router.replace('/admin/prono');
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.pronoId = currentRoute.params.id;
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/prono/details/' + this.pronoId);
    }else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    } else {
      this.$store.dispatch("getPronostics");
    }
  },
  computed: {
    pronostic() {
      return this.$store.getters.pronostic(this.pronoId);
    }
  }
}
</script>

<style scoped>

</style>
