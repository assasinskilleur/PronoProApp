<template>
  <layout :page-title="`${typeForm} pronostic`" page-default-back-link="/admin/prono">
    <form @submit.prevent="submitForm()">
      <ion-item>
        <ion-label position="floating">Titre</ion-label>
        <ion-input type="text" v-model="titre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Type</ion-label>
        <ion-select v-model="typeId">
          <ion-select-option v-for="type in types" :key="type.id" :value="type.id">{{
              type.libelle
            }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Compet</ion-label>
        <ion-select v-model="competId" :value="competId">
          <ion-select-option v-for="compet in compets" :key="compet.id" :value="compet.id">{{
              compet.competition
            }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Cote</ion-label>
        <ion-input inputmode="decimal" v-model="cote"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Analyse</ion-label>
        <ion-textarea v-model="analyse" :value="analyse"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Résultat</ion-label>
        <ion-textarea v-model="resultat" :value="resultat"></ion-textarea>
      </ion-item>
      <ion-segment v-model="res_prono">
        <ion-segment-button value="1">
          <ion-label>1</ion-label>
        </ion-segment-button>
        <ion-segment-button value="N">
          <ion-label>N</ion-label>
        </ion-segment-button>
        <ion-segment-button value="2">
          <ion-label>2</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-button expand="block" type="submit">
        <ion-icon slot="start" :icon="icon"></ion-icon>
        {{ typeForm }}
      </ion-button>
    </form>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import {
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonSegment,
  IonSegmentButton,
  IonTextarea
} from '@ionic/vue';

export default {
  name: "PronoForm",
  components: {
    Layout,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonTextarea
  },
  props: ['typeForm', 'icon', 'prono'],
  data() {
    return {
      titre: this.prono?.name ?? '',
      typeId: this.prono?.typeId ?? '',
      competId: this.prono?.competitionId ?? '',
      cote: this.prono?.cote ?? '',
      analyse: this.prono?.analyse ?? '',
      res_prono: this.prono?.res_prono ?? '',
      resultat: this.prono?.resultat ?? ''
    }
  },
  mounted() {
    this.$store.dispatch('getTypes');
    this.$store.dispatch('getCompetitions');
  },
  watch: {
    prono() {
      this.titre = this.prono?.name ?? '';
      this.typeId = this.prono?.typeId ?? '';
      this.competId = this.prono?.competitionId ?? '';
      this.cote = this.prono?.cote ?? '';
      this.analyse = this.prono?.analyse ?? '';
      this.res_prono = this.prono?.res_prono ?? '';
      this.resultat = this.prono?.resultat ?? 'N/A';
    }
  },
  computed: {
    compets() {
      return this.$store.getters.competitions;
    },
    types() {
      console.log(this.$store.getters.types);
      return this.$store.getters.types;
    }
  },
  methods: {
    submitForm() {
      const body = {
        name: this.titre,
        typeId: this.typeId,
        competitionId: this.competId,
        cote: this.cote,
        analyse: this.analyse,
        res_prono: this.res_prono,
        resultat: this.resultat
      }
      this.$emit('form-submit', body);
    },
    changeType(evt) {
    // @ionChange="changeType($event)" value="1"
      console.log(evt);
      console.log(this.typeId)
      this.typeId = evt.detail.value;
    }
  }
}
</script>
