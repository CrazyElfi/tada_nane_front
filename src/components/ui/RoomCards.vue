<template>
  <v-row dense>
    <v-col v-for="(item, index) in rooms" :key="index" cols="12">
<!--      <room-card :room="item" @open="openChat(item.name)"/>-->
      <v-card>
        <v-card-title class="text-h6">
          Room: {{ item.name }}
        </v-card-title>

        <v-card-subtitle>
          <div>Last message:</div>
          <message-component
              :message = item.last_message
          />
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
              class="ma-2"
              outlined
              small
              color="indigo"
              @click="openChat(item.name)">
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
import MessageComponent from "@/components/ui/MessageComponent";
import {mapActions} from "vuex";

export default {
  name: "RoomCards",
  components: {
    "message-component": MessageComponent
  },
  props: {
    rooms: {
      type: Array,
      required: true,
    }
  },
  methods: {
    async openChat(nameRoom) {
      await this.fetchRoomName(nameRoom)
      await this.fetchRoomHistory()
    },

    ...mapActions([
      'fetchRoomName',
      'fetchRoomHistory',
    ])

  }
}
</script>

<style scoped>

</style>
