<template>
  <v-app>
   <v-main class="rooms-list">
     <v-row>
       <rooms-list />
       <chat-component
           v-if="isShowChat"
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
    selectedRoom: null,
  }),
  computed: {
    nameRoom() {
      return this.$store.state.roomName
    },
    isShowChat() {
      return !!this.nameRoom
    },
  },
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
