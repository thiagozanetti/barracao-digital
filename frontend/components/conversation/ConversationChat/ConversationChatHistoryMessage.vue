<template>
  <v-row class="chat-message">
    <v-col :class="colStyle">
      <v-expand-transition>
        <div
          v-show="show"
          :title="formatDate(message.timestamp)"
          class="message-box elevation-3"
          :class="messageStyle"
        >
          <div class="message-box__content">
            <v-avatar
              v-if="message.type === 'default'"
              :class="avatarClass"
              size="30"
              color="grey lighten-3"
            >
              <v-img :src="avatar"></v-img>
            </v-avatar>
            <v-avatar
              v-else-if="message.type === 'info'"
              :class="avatarClass"
              size="30"
              color="grey lighten-3"
            >
              <v-icon color="blue">{{
                message.icon || 'mdi-information'
              }}</v-icon>
            </v-avatar>
            <small class="message-boc__footer"></small>
            <span v-linkified>
              {{ message.text }}
            </span>
          </div>
        </div>
      </v-expand-transition>
    </v-col>
  </v-row>
</template>

<script>
import linkify from 'vue-linkify'
import { format } from 'date-fns'
import avatarUtil from '@/utils/avatar'

export default {
  name: 'ConversationChatHistoryMessage',
  directives: {
    linkified: linkify,
  },
  props: {
    doctor: {
      type: Object,
      required: true,
    },
    patient: {
      type: Object,
      required: true,
    },
    isDoctor: {
      type: Boolean,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    avatar: '',
    show: false,
  }),
  computed: {
    isMessageFromMe() {
      return this.isDoctor
        ? this.message.from === 'doctor'
        : this.message.from === 'patient'
    },
    messageStyle() {
      return this.isMessageFromMe
        ? 'right-message amber lighten-4'
        : 'left-message blue lighten-4'
    },
    avatarClass() {
      return this.isMessageFromMe ? 'right-avatar' : 'left-avatar'
    },
    colStyle() {
      return this.isMessageFromMe ? 'd-flex justify-end' : ''
    },
  },
  async mounted() {
    if (
      (this.isDoctor && !this.isMessageFromMe) ||
      (!this.isDoctor && this.isMessageFromMe)
    ) {
      this.avatar = await avatarUtil(this.patient.email || this.patient.ticket)
    }
    if (
      (!this.isDoctor && !this.isMessageFromMe) ||
      (this.isDoctor && this.isMessageFromMe)
    ) {
      // this.avatar = await avatarUtil(this.doctor.email || this.doctor.username)
      this.avatar = '/favicon.ico'
    }
  },
  created() {
    setTimeout(() => {
      this.show = true
    }, 100)
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return
      return format(timestamp, 'dd/MM/y hh:mm')
    },
  },
}
</script>

<style scoped>
.chat-message {
  display: contents;
}
.message-box {
  float: left;
  min-height: 30px;
  margin-left: 5px;
  border-radius: 8px;
  max-width: 70vw;
}
.message-box__content {
  float: left;
  padding: 5px 10px 5px 10px;
  word-wrap: break-word;
  max-width: 100%;
}
.right-message .message-box__content {
  float: right;
  text-align: right;
}
.message-box__footer {
  float: left;
  padding: 5px 10px 5px 10px;
  word-wrap: break-word;
  max-width: 100%;
}
.right-avatar {
  float: right;
  margin: 0 0 0 10px;
}
.left-avatar {
  margin: 0 10px 0 0;
}
</style>
