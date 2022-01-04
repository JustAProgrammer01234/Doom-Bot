const { SlashCommandBuilder, inlineCode} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    execute: async (interaction, assets) => {
        const fields = []
        const options = []
        for (const i of assets) {
            options.push({
                label: `${i[0]}`,
                description: `Contains ${i[0]} commands.`,
                value: `${i[0]}`
            })
        }
        for (const j of assets) {
            fields.push(
                {
                    name: `${j[0]}`,
                    description: inlineCode(`Contains ${j[0]} commands.`)
                }
            )
        }
        const helpEmbed = MessageEmbed()
            .setTitle("All help is down below")
            .setThumbnail("https://i.imgflip.com/5lxovb.png")
            .setColor("#FF0000")
            .addFields(...fields)
        const helpSelectMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("help_select")
                    .setPlaceHolder("Select a category lmao.")
                    .setOptions(...options)
            )
        await interaction.reply({ embeds: [ helpEmbed ], components: [ helpSelectMenu ]})
    }
}