<template>
  <v-app>
   <v-main class="rooms-list">
     <v-row>
       <rooms-list @room="chooseRoom"/>
       <chat-component
           v-if="isShowChat"
           :name-room="selectedRoom"
           :show="isShowChat"
       />
     </v-row>
   </v-main>
  </v-app>
</template>

<script>
import RoomsList from "@/components/RoomsList";
import ChatComponent from "@/components/ChatComponent";

export default {
  name: 'App',

  components: {
    'rooms-list': RoomsList,
    "chat-component": ChatComponent,

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
  methods: {
    chooseRoom(data) {
      this.selectedRoom = data.nameRoom
      this.isShowChat = data.show
    }
  }
};
</script>

<style lang="scss">
.user-name {
  color: #00008b;
}

.input {
  width: 100%;
  border: 1px solid darkblue;
  outline: none;
}
</style>
