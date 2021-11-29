const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const token = process.env.TOKEN
const clientId = process.env.CLIENTID
const devserverId = process.env.DEVSERVERID

const commands = [];
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

// Deploying the commands on dev server for debugging purposes.
rest.put(Routes.applicationGuildCommand(clientId, devserverId), { body: commands })
	.then(() => console.log("Successfully deployed the commands on dev server."))
	.catch(console.error)

// Deploying the commands globally.
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);