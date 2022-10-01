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
      <v-row>
        <v-col cols="3">Your name</v-col>
        <v-col cols="9">
          <input
              v-model="username"
              class="input pa-1"
              type="text"
              placeholder="Type your name"
          />
        </v-col>
      </v-row>

      <room-cards v-if="rooms" :rooms="rooms"/>

    </v-container>
  </v-col>
</template>

<script>
import RoomCards from "@/components/ui/RoomCards";
import {mapActions} from "vuex";

export default {
  name: "RoomsList",
  components: {
    "room-cards": RoomCards
  },
  data: () => ({
    newRoomName: ""
  }),
  computed: {
    rooms() {
      return this.$store.state.rooms
    },
    username: {
      get: function () {
        return this.$store.state.username
      },
      set: async function (newName) {
        await this.fetchUserName(newName)
        await this.$store.commit('updateRoomHistory', null)
        await this.$store.commit('updateRoomName', null)
      }
    }
  },

  async mounted() {
    await this.fetchRoomsList()
  },
  methods: {
    async createNewRoom() {
      await this.fetchRoomName(this.newRoomName)
      await this.$store.commit('updateRoomHistory', null)
      this.newRoomName = ""
    },

    ...mapActions([
      'fetchRoomsList',
      'fetchRoomName',
      'fetchUserName',
    ])
  }
}
</script>

<style scoped>

</style>
