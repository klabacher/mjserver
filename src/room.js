const R = require('./Rooms.json');

module.exports = class World {
    constructor() {
        // store all players class
        this.players = []
        this.room = []
        R.Rooms.map((element) => {
            this.room[element.name] = element
            this.room[element.name].players = []
            if (this.room[element.name].default == true) {
                console.log("//Spawning all player on", this.room[element.name].name);
                this.spawnroom = this.room[element.name].name
            };
        });
        console.log("Loaded", R.Rooms.length, "rooms")
    };

    getRoom(name) {
        return this.room[name];
    };

    AddPlayerToRoom(room, player) {
        this.getRoom(room).players.push(player);
        console.log(this.getRoom(room).players.length)
        player.actualRoom = room
    }

    remPlayer(player) {
        const i = this.getRoom(player.actualRoom).players.findIndex((element) => {
            return element === player
        })
        this.getRoom(player.actualRoom).players.splice(i,i);
    }

    MovePlayerToOtherRoom(room, player) {
        //remove
        this.remPlayer(player);
        //add
        this.AddPlayerToRoom(room, player)
        player.actualRoom = room
    }
}