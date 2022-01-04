const { SlashCommandBuilder, inlineCode} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    execute: async (interaction, assets) => {
        const fields = []
        const options = []
        for (const i of assets.commandList) {
            options.push({
                label: `${i[0]}`,
                description: `Contains ${i[0]} commands.`,
                value: `${i[0]}`
            })
            fields.push({
                name: `${i[0]}`,
                value: inlineCode(`Contains ${i[0]} commands.`)
            })
        }
        const helpEmbed = new MessageEmbed()
            .setTitle("All help is down below")
            .setThumbnail("https://i.imgflip.com/5lxovb.png")
            .setColor("#FF0000")
            .addFields(fields)
        const helpSelectMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("help_select")
                    .setPlaceholder("Select a category.")
                    .setOptions(options)
            )
        await interaction.reply({ embeds: [ helpEmbed ], components: [ helpSelectMenu ] })
    }
}