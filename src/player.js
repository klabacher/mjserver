const { getEvents } = require('./Player_events');

module.exports = class Player {
    constructor(Socket) {
        this.id = Socket.id; this.socket = Socket;
    };

    async RegListeners() {
        await getEvents(async function (events, playerclass) {
            await events.map(async function (v, i) {
                playerclass = await playerclass.socket.on(v.name, (playerclass, data) => {
                    v.callback(playerclass, data)
                })
            });
        }, this)
    };
    async init() {
        console.log("initing player", this.id)
        await this.RegListeners()
    };
}