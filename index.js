const fs = require("fs")
const {Client, Intents, Collection} = require("discord.js");
const token = process.env.TOKEN;

const doom_bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

doom_bot.commands = new Collection();
const cmd_files = fs.readdirSync("./commands");

for (const file of cmd_files) {
    const command = require(`./commands/${file}`);
    doom_bot.commands.set(command.data.name, command);
}

function run() {
    doom_bot.user.setActivity("DOOM", { type: "PLAYING" });
    doom_bot.user.setStatus("dnd");
	console.log("Ready to RIP AND TEAR!");
}

doom_bot.once("ready", run);

doom_bot.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        command = doom_bot.commands.get(interaction.commandName)
        if (command) {
            try {
                await command.execute(interaction)
            } catch (error) {
                console.log(error)
                await interaction.reply({ content: 'Sorry to inform you but there was an error while I was executing this command!', ephemeral: true });
            } 
        }
    }
});

doom_bot.login(token);