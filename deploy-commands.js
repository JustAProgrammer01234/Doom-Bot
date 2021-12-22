const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const token = process.env.TOKEN
const clientId = process.env.CLIENTID

const commands = []
const commandFiles = fs.readdirSync('./commands')

for (const file of commandFiles) {
	console.log(`Loading command: ${file.data.name}`)
	const command = require(`./commands/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)