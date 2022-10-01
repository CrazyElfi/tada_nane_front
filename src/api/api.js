import axios from "axios"

let ws = null;

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

    connectWebsocket(userName) {
        ws = new WebSocket(`wss://nane.tada.team/ws?username=${userName}`);
        ws.addEventListener('open', () => {
            console.log("connected to WS!");
        });
    },

    sendMessageToWebsocket(msg) {
        ws.send(JSON.stringify(msg));
    }
}
