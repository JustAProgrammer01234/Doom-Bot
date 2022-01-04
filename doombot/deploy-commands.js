const { navigateCommands } = require("./utils.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")

const token = process.env.TOKEN
const clientId = process.env.CLIENTID

const commands = []

navigateCommands((category, cmdFile) => {
    const cmd = require(`./commands/${category}/${cmdFile}`)
    console.log(`Preparing command: ${cmd.data.name}`)
    commands.push(cmd.data.applicationCommandstoJSON())
})

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered them fucking commands.'))
	.catch(console.error)