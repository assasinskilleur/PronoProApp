<template>
  <prono-form type-form="Modifier" :prono="pronostic" :icon="checkmark" @form-submit="editProno($event)"></prono-form>
</template>

<script>
import PronoForm from "@/components/PronoForm";
import { checkmark } from 'ionicons/icons'
export default {
name: "EditProno",
  components: {PronoForm},
  data() {
    return {
      checkmark,
      pronoId: this.$route.params.id
    }
  },
  methods: {
    editProno(body) {
      const newBody = {
        id: this.pronoId,
        body: body
      }
      this.$store.dispatch("editProno", newBody);
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
      this.$router.replace('/login?next=/admin/prono/edit/' + this.pronoId);
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
