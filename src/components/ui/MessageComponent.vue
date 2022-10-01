<template>
  <v-container class="pa-0">
    <div>
      <div class="user-name">{{ message.sender.username }}</div>
      <div class="msg-time">
        {{ moment(message.created).format('HH:mm:ss DD/MM/YYYY') }}
      </div>
    </div>

    <div class="mt-2"> {{message.text}}</div>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "MessageComponent",
  props: {
    message: {
      type: Object,
      required: true,
    }
  },
  methods: {
    moment,
  }
}
</script>

<style lang="scss" scoped>
.user-name {
  color: #00008b;
}

.msg-time {
  font-size: 12px;
  color: rgba(0, 0, 139, 0.4);
}

</style>
