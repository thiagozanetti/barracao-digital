<template>
  <v-card elevation="0">
    <v-card-title>O atendimento foi finalizado.</v-card-title>

    <v-card-text>
      <v-list elevation="1">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ doctorName }}
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle-1 mb-4">
              <v-icon>mdi-map</v-icon>
              <span>{{ facilityName }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <b>CRM:</b>
              <span>{{ doctorCrm || '-' }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <b>Estado:</b>
              <span>{{ doctorState || '-' }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card v-if="doctorMessage" class="my-4">
        <v-card-title class="text-body-2">
          Confira o feedback do seu atendimento:
        </v-card-title>
        <v-card-text class="text-left subtitle-1">
          <div v-linkified v-text="doctorMessage" />
        </v-card-text>
      </v-card>

      <v-card class="my-4">
        <v-card-text class="text-center subtitle-1">
          <span class="subtitle-1" v-text="ratingTitle">
            Avalie o seu atendimento:
          </span>
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            length="5"
            :readonly="!!patientFeedback || isLoading"
            hover
          ></v-rating>
          <v-btn
            class="mt-4"
            color="primary"
            :loading="isLoading"
            :disabled="!!patientFeedback || isLoading"
            @click="ratingSubmitted"
          >
            Enviar
          </v-btn>
        </v-card-text>
        <v-card-subtitle>
          Quer ajudar a entender como o COVID-19 afeta as pessoas, como diminuir
          os riscos e maximizar as chances de recuperação? O Barracão Digital é
          parceiro da pesquisa online Beat19, um movimento mundial para combater
          o coronavírus. Clique na imagem abaixo para acessar o site e
          participar.
          <a href="https://brasil.beat19.org/" target="_blank">
            <img src="~/assets/beat19.png" width="100%" alt="Beat19.org" />
          </a>
        </v-card-subtitle>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import linkify from 'vue-linkify'

export default {
  name: 'PatientFinished',
  directives: {
    linkified: linkify,
  },
  props: {
    doctorName: {
      type: String,
      required: true,
    },
    doctorCrm: {
      type: String,
      required: true,
    },
    doctorState: {
      type: String,
      required: true,
    },
    doctorMessage: {
      type: String,
      required: false,
      default: () => '',
    },
    facilityName: {
      type: String,
      required: true,
    },
    patientFeedback: {
      type: Number,
      required: false,
      default: 0,
    },
    clicked: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    isLoading: false,
    rating: 0,
  }),
  computed: {
    ratingTitle() {
      return this.patientFeedback
        ? 'Você avaliou seu atendimento como:'
        : 'Avalie o seu atendimento:'
    },
  },
  mounted() {
    this.rating = this.patientFeedback
  },
  methods: {
    ratingSubmitted() {
      this.isLoading = true
      this.clicked(this.rating).finally(() => {
        this.isLoading = false
      })
    },
  },
}
</script>
