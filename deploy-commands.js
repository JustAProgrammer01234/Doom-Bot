const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const token = process.env.TOKEN
const clientId = process.env.CLIENTID

const commands = []
const commandFiles = fs.readdirSync('./commands')

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	console.log(`Loading command: ${command.data.name}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered them fucking commands.'))
	.catch(console.error)