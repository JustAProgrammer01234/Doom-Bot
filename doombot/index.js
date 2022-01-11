const {Client, Intents, Collection, MessageEmbed} = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { navigateCommands, listCommands } = require("./utils.js")
const { getSecret } = require("docker-secret")
const commands = new Collection()
const token = getSecret("token")
const clientId = process.env.CLIENTID
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

async function deployCommands() {
    const commands = []
    const rest = new REST({ version: "9" }).setToken(token)

    navigateCommands((cmdFile) => {
        const cmd = require(`./commands/${cmdFile}`)
        console.log(`Preparing command: ${cmd.data.name}`)
        commands.push(cmd.data.toJSON())
    })
    
    await rest.put(Routes.applicationCommands(clientId), { body: commands })
}

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
                const sendOptions = { embeds: [ errorEmbed ] }
                if (!interaction.replied) {
                    await interaction.reply(sendOptions)
                } else {
                    await interaction.channel.send(sendOptions)
                }
            } 
        }
    }
})

doomBot.on("error", async (error) => {
    console.error(error)
})

deployCommands()
    .then(() => { console.log("Successfully registerd them fucking commands.") })
    .catch(console.error)
doomBot.login(token)