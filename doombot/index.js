const {Client, Intents, Collection, MessageEmbed} = require("discord.js")
const { navigateCommands, listCommands } = require("./utils.js")
const { secrets } = require("docker-secret")
const commands = new Collection()
const token = secrets.token
const doomBot = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_PRESENCES
    ], 
    presence: {
        status: "dnd",
        activities: [{
            name: "DOOM",
            type: "PLAYING"
        }]
    } 
})
const assets = {commandList: listCommands()}

navigateCommands((cmdFile) => {
    const cmd = require(`./commands/${cmdFile}`)
    const cmdName = cmd.data.name 
    console.log(`Loading command: ${cmdName}`)
    commands.set(cmdName, cmd)
})

doomBot.once("ready", () => {
    console.log("Ready to RIP AND TEAR!")
})

doomBot.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        command = commands.get(interaction.commandName)
        if (command) {
            try {
                if (command.execute.length < 1) {
                    await command.execute(interaction)
                } else {
                    await command.execute(interaction, assets)
                }
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

doomBot.login(token)