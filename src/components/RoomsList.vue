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
              v-model="$v.newRoomName.$model"
              class="input pa-1"
              type="text"
              placeholder="Type new room name"
          />
          <div class="error--text" v-if="!$v.newRoomName.maxLength">
            Максимальный размер имени комнаты {{ validationRules.maxRoomTitleLength }}
          </div>
        </v-col>
      </v-row>
      <v-row  class="d-flex justify-space-between align-center">
        <v-col cols="3">Your name</v-col>
        <v-col cols="9">
          <input
              v-model="$v.username.$model"
              class="input pa-1"
              type="text"
              placeholder="Type your name"
          />
          <div class="error--text" v-if="!$v.username.maxLength">
            Максимальный размер имени {{ validationRules.maxUsernameLength  }}
          </div>
        </v-col>
      </v-row>

      <room-cards v-if="rooms" :rooms="rooms"/>
      <v-row v-else>
        <v-col>
          <h2 class="d-flex justify-space-between align-center mt-5">
            Rooms list empty
          </h2>
          <p>Не удалось подключиться к серверу</p>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import RoomCards from "@/components/ui/RoomCards";
import {mapActions} from "vuex";
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "RoomsList",
  components: {
    "room-cards": RoomCards,
  },
  data: () => ({
    newRoomName: "",
  }),
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },

    username: {
      get: function () {
        return this.$store.state.username;
      },
      set: async function (newName) {
        await this.fetchUserName(newName);
        await this.$store.commit('updateRoomHistory', null);
        await this.$store.commit('updateRoomName', null);
      }
    },

    validationRules() {
      return this.$store.state?.settings;
    }
  },
  async mounted() {
    await this.fetchRoomsList();
    await this.fetchSettings();
  },
  methods: {
    async createNewRoom() {
      await this.fetchRoomName(this.newRoomName);
      await this.$store.commit('updateRoomHistory', null);
      this.newRoomName = "";
    },

    ...mapActions([
      'fetchRoomsList',
      'fetchRoomName',
      'fetchUserName',
      'fetchSettings',
    ])
  },

  validations() {
    return {
      newRoomName: {
        required,
        maxLength: maxLength(this.validationRules?.maxRoomTitleLength),
      },
      username: {
        required,
        maxLength: maxLength(this.validationRules?.maxUsernameLength),
      },
    }
  },
}
</script>

<style scoped>
  .error--text {
    font-size: 12px;
  }
</style>
