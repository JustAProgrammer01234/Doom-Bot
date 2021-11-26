const fs = require("fs")
const {Client, Intents, Collection} = require("discord.js");
const token = process.env.TOKEN;

const doom_bot = new Client({ intents: [Intents.FLAGS.GUILDS]});

doom_bot.commands = new Collection();
const cmd_files = fs.readdirSync("./commands");

for (var file of cmd_files) {
    var command = require(`./commands/${file}`);
    doom_bot.commands.set(command.data.name, command);
}

function run() {
    doom_bot.user.setActivity("DOOM", { type: "PLAYING" });
    doom_bot.user.setStatus("dnd");
	console.log("Ready to RIP AND TEAR!");
}

doom_bot.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        if (doom_bot.commands.get(interaction.commandName)) {
            try {
                await command.execute(interaction)
            } catch (error) {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }   
        }
    }
})

doom_bot.once("ready", run);
doom_bot.login(token);