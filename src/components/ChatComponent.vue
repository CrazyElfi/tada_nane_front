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

export default {
  name: "ChatComponent",
  components: {
    "message-component": MessageComponent
  },
  props: {
    nameRoom: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    rooms: null,
    selectedRoom: null,
    history: null,
    isShowChat: false,
    message: '',
    ws: null,
    username: "Козьма Прутков",
    newRoomName: ''
  }),
  async mounted() {
    this.history = null
    await this.openChat(this.nameRoom);
    this.connectToWebsocket(ws);
    this.scrollToLastMessage();
  },
  methods: {
    moment,
    async openChat(nameRoom) {
      try {
        this.history = await Api.getRoomHistory(this.nameRoom);

        this.selectedRoom = nameRoom;
      } catch (e) {
        console.log(e);
      }
    },

    closeRooms() {
      this.history = null;
    },

    async sendMessage(msg) {
      let message = {
        "room": this.selectedRoom,
        "text": msg,
      }

      if(this.history === null) {
        message.created = new Date().toISOString();
        message.sender = { "username": this.username };
      }

      if (msg !== "") {
        Api.sendMessageToWebsocket(message)
        this.message = ""; // есть ли сценарий обезопасить себя от удаления сообщения если в сокете будет ошибка?
        await Api.getRooms()  // ошибка
      }

      this.history = await Api.getRoomHistory(this.selectedRoom);
    },

    scrollToLastMessage() {
      const hiddenElem = document.getElementById('hidden-block')
      hiddenElem.scrollIntoView({block: "end"});
    }
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
