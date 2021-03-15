<template>
  <prono-form type-form="Ajouter" :icon="checkmark" @form-submit="addProno($event)"></prono-form>
</template>

<script>
import PronoForm from "@/components/PronoForm";
import { checkmark } from 'ionicons/icons'
export default {
name: "AddProno",
  components: {PronoForm},
  data() {
    return {
      checkmark
    }
  },
  mounted() {
    if (!this.$store.getters.user.connected) {
      this.$router.replace('/login?next=/admin/prono/add');
    }else if (this.$store.getters.user.user_type !== 'admin') {
      this.$router.replace('/');
    }
  },
  methods: {
    addProno(body) {
      this.$store.dispatch("addProno", body);
      this.$router.replace("/admin/prono");
    }
  }
}
</script>

<style scoped>

</style>
