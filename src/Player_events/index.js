var glob = require("glob");

async function getEvents(callback, playerclass) {
    const player_events = []
    await glob("**/*.player.event.js", {cwd: './src/Player_events/'}, (err, files) => {
        files.forEach((val, i) => {
            //console.log(val)
            var e = require('./' + val);
            player_events.push(e);
        });
        callback(player_events, playerclass)
    });
}

module.exports = {
    getEvents
}

