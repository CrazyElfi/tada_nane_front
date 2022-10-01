<template>
  <v-col cols="4">
    <v-container>
      <v-row>
        <v-col cols="5">
              <v-btn
                  :disabled="newRoomName === ''"
                  outlined
                  color="indigo"
                  @click="createNewRoom()"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
                new chat
              </v-btn>
        </v-col>

        <v-col cols="7">
          <input
              v-model="newRoomName"
              class="input pa-1"
              type="text"
              placeholder="Type new room name"
          />
        </v-col>
      </v-row>

<!--      <v-row dense>-->
<!--        <v-col v-for="(item, index) in rooms" :key="index" cols="12">-->
<!--          -->
<!--        </v-col>-->
<!--      </v-row>-->
      <room-cards v-if="rooms" :rooms="rooms" @open="openChat"/>
    </v-container>
  </v-col>
</template>

<script>
import RoomCards from "@/components/ui/RoomCards";
import Api  from "@/api/api"

export default {
  name: "RoomsList",
  components: {
    "room-cards": RoomCards
  },
  data: () => ({
    rooms: null,
    selectedRoom: null,
    ws: null,
    username: "Козьма Прутков",
    newRoomName: ''
  }),
  async mounted() {
    await this.loadRooms();
  },
  methods: {
    async loadRooms() {
      this.rooms = await Api.getRooms();
    },

    async openChat(data) {
      this.$emit("room", {
        nameRoom: data.nameRoom,
        show: true,
      })
    },

    createNewRoom() {
      this.isShowChat = true;
      this.selectedRoom = this.newRoomName;

      this.$emit("room", {
        nameRoom: this.selectedRoom,
        show: true,
        status: "new"
      })
    }
  }
}
</script>

<style scoped>

</style>
