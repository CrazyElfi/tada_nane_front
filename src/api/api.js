import axios from "axios"

export default {
    async getRooms() {
        const data = await axios.get('https://nane.tada.team/api/rooms');
        return data.data?.result;
    },

    async getRoomHistory(nameRoom) {
        const data = await axios.get(`https://nane.tada.team/api/rooms/${nameRoom}/history`);
        return data.data?.result;
    },

    async getSettings() {
        const data = await axios.get(`https://nane.tada.team/api/settings`);
        return data.data?.result;
    },

    connectToWebsocket() {
        this.ws = new WebSocket( `wss://nane.tada.team/ws?username=${this.username}` );
        this.ws.addEventListener('open', (event) => { this.onWebsocketOpen(event) });
    },

    onWebsocketOpen() {
        console.log("connected to WS!");
    },

    sendMessageToWebsocket(msg) {
            this.ws.send(JSON.stringify(msg));
    }

}
