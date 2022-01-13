const {Client, Intents, Collection } = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { navigateCommands, listCommands } = require("./utils.js")
const { getSecret } = require("docker-secret")
const { Manager } = require("erela.js")
const fs = require("fs")
const commands = new Collection()
const token = getSecret("token")
const clientId = process.env.CLIENTID
const doomBot = new Client({ 
    intents: [   
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ], 
    presence: {
        status: "dnd",
        activities: [{
            name: "DOOM",
            type: "PLAYING"
        }]
    } 
})
const nodes = [
    {
        host: "localhost",
        password: "youshallnotpass",
        port: 2333
    }
]
const lavalinkClient = new Manager({
    nodes,
    send: (id, payload) => {
        const guild = doomBot.guilds.get(id)
        if (guild) {
            guild.shard.send(payload)
        }
    }
})
doomBot.assets = {
    commandList: listCommands(),
    music: lavalinkClient
}
const eventFiles = fs.readdirSync("./events")

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

doomBot.assets.commands = commands

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        doomBot.once(event.name, () => {
            doomBot.assets.music.init(doomBot.user.id) 
            event.execute() 
        })
    } else {
        doomBot.on(event.name, async (interaction) => { 
            await event.execute(interaction, doomBot.assets)
        })
    }
}

deployCommands()
    .then(() => { console.log("Successfully registered them fucking commands.") })
    .catch(console.error)
doomBot.login(token)