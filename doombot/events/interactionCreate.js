const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "interactionCreate",
    execute: async (interaction, assets) => {
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
    }
}