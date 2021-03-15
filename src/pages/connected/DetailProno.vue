<template>
  <Details :back-link="`/pronostics/${typeId}`" :prono="pronostic">
    <template v-slot:buttons>
      <ion-button expand="block" class="ion-text-wrap">
        Résultat : {{ pronostic?.resultat}}
      </ion-button>
    </template>
  </Details>
</template>

<script>
import Details from "@/components/Details";
import { IonButton } from '@ionic/vue';
export default {
  name: "DetailProno",
  components: {Details, IonButton},
  data() {
    return {
      typeId: this.$route.params.typeid,
      pronoId: this.$route.params.id
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.typeId = currentRoute.params.typeid;
      this.pronoId = currentRoute.params.id;
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace(`/login?next=/pronostics/${this.typeId}/details/${this.pronoId}`);
    }
    if (this.$store.getters.pronostics == null) {
      this.$store.dispatch("getPronosticsByTypes", this.typeId);
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
