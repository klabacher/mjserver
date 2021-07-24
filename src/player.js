const { getEvents } = require('./Player_events');

class PlayerData {
    position = {
        x: 0,
        y: 0
    }
    clothes = {
    }
};

module.exports = class Player {
    constructor(Socket) {
        this.position = {
            x: 0,
            y: 0
        };
        this.id = Socket.id; this.socket = Socket;
    };
    async RegListeners() {
        await getEvents(async function (events, playerclass) {
            await events.map(async function (v, i) {
                playerclass = await playerclass.socket.on(v.name, (data) => {
                    v.callback(playerclass, data)
                })
            });
        }, this);
    };
    async init() {
        console.log("initing player", this.id)
        await this.RegListeners()
    };
}