const fs = require("fs")
const {Client, Intents, Collection, MessageEmbed} = require("discord.js")
const token = process.env.TOKEN
const commands = new Collection()
const cmdFiles = fs.readdirSync("./commands")

module.exports = {commands}

const doomBot = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES], 
    presence: {
        status: "dnd",
        activities: [{
            name: "DOOM",
            type: "PLAYING"
        }]
    } 
})

for (const file of cmdFiles) {
    const command = require(`./commands/${file}`)
    const cmdName = command.data.name
    console.log(`Loading command: ${cmdName}`)
    commands.set(cmdName, command)
}

doomBot.once("ready", () => {
    console.log("Ready to RIP AND TEAR!")
})

doomBot.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        command = commands.get(interaction.commandName)
        if (command) {
            try {
                command.execute(interaction)
            } catch (error) {
                const errorEmbed = new MessageEmbed()
                    .setTitle("An error occured!")
                    .setColor("#FF0000")
                    .setDescription(`${error}`)
                await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true })
            } 
        }
    }
})

doomBot.login(token);