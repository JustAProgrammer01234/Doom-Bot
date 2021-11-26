const {Client, Intents} = require('discord.js');
const token = process.env.TOKEN;

const doom_bot = new Client({ intents: [Intents.FLAGS.GUILDS]});

function run() {
    doom_bot.user.setActivity("DOOM", { type: "PLAYING" });
    doom_bot.user.setStatus("dnd");
	console.log("Ready to RIP AND TEAR!");
}

doom_bot.once("ready", run);

doom_bot.login(token);