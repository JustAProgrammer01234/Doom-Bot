const fs = require("fs")
const {Client, Intents, Collection, MessageEmbed} = require("discord.js")
const token = process.env.TOKEN

const doomBot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] })
doomBot.commands = new Collection()

const cmd_files = fs.readdirSync("./commands")

for (const file of cmd_files) {
    const command = require(`./commands/${file}`)
    doomBot.commands.set(command.data.name, command)
}

async function client_can_be_param(exec_func, interaction, client) {
    try {
        await exec_func(interaction, client)
    } catch {
        await exec_func(interaction)
    }
}

doomBot.once("ready", () => {
    doomBot.user.setActivity("DOOM", { type: "PLAYING" })
    doomBot.user.setStatus("dnd")
    console.log("Ready to RIP AND TEAR!")
})

doomBot.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        command = doomBot.commands.get(interaction.commandName)
        if (command) {
            try {
                await client_can_be_param(command.execute, interaction, doomBot)
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