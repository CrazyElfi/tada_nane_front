<template>
  <v-col cols="8">
    <v-container>
      <div class="chat-header d-flex justify-space-between align-center">
        <h4 class="pa-3">{{ nameRoom }}</h4>
        <v-btn
            class="ma-2"
            color="darkblue"
            icon
            x-small
            @click="closeRooms()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="chat-messages-wrapper">
        <div  v-for="(item, index) in history" :key="index"  class="message mt-4">
          <message-component
              :message = item
          />
          <v-divider v-if="index !== (history.length - 1)" class="mt-4"></v-divider>
        </div>
        <div id="hidden-block"></div>
      </div>

      <v-row class="d-flex align-center mt-3 mb-3">
        <v-col cols="10">
          <input
              v-model="message"
              class="input pa-1"
              type="text"
              placeholder="Type your message"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="sendMessage(message)"
          >
            Send
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import moment from "moment";
import Api  from "@/api/api"
import MessageComponent from "@/components/ui/MessageComponent";
import {mapActions} from "vuex";

export default {
  name: "ChatComponent",
  components: {
    "message-component": MessageComponent
  },

  data: () => ({
    isShowChat: false,
    message: '',
    ws: null,
    newRoomName: ''
  }),
  computed: {
    history() {
      return this.$store.state.roomHistory
    },
    nameRoom() {
      return this.$store.state.roomName
    },
    username() {
      return this.$store.state.username
    }
  },

  async mounted() {
    await this.fetchRoomHistory();
    this.scrollToLastMessage();
    Api.connectWebsocket(this.username);
  },
  methods: {
    moment,

    async closeRooms() {
      await this.$store.commit('updateRoomHistory', null)
      await this.$store.commit('updateRoomName', null)
    },

    async sendMessage(msg) {
      let message = {
        "room": this.nameRoom,
        "text": msg,
      }

      if (msg !== "") {
        Api.sendMessageToWebsocket(message)
        this.message = ""; // есть ли сценарий обезопасить себя от удаления сообщения если в сокете будет ошибка?
        await this.fetchRoomsList();
      }

      await this.fetchRoomHistory();
    },

    scrollToLastMessage() {
      const hiddenElem = document.getElementById('hidden-block')
      hiddenElem.scrollIntoView({block: "end"});
    },

    ...mapActions([
      'fetchRoomsList',
      'fetchRoomHistory'
    ])
  }
}
</script>

<style  lang="scss" scoped>
.chat-header {
  background-color: rgba(0,0, 139,0.1);
}

.chat-messages-wrapper {
  height: calc(90vh - 50px);
  overflow-y: auto;
  .msg-time {
    font-size: 12px;
    color: rgba(0, 0, 139, 0.4);
  }
}

</style>
