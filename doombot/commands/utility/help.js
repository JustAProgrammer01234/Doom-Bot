const { SlashCommandBuilder, inlineCode} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    execute: async (interaction, assets) => {
        const fields = []
        const options = []

        for (const i of assets.commandList) {
            const category = i[0]
            options.push({
                label: `${category[0].toUpperCase() + category.slice(1)}`,
                description: `Contains ${category} commands.`,
                value: `${category}`
            })
            fields.push({
                name: `${category[0].toUpperCase() + category.slice(1)}`,
                value: inlineCode(`Contains ${category} commands.`)
            })
        }
        
        const helpEmbed = new MessageEmbed()
            .setTitle("All help is down below!")
            .setThumbnail("https://i.imgflip.com/5lxovb.png")
            .setColor("#FF0000")
            .addFields(fields)
        const helpSelectMenu = new MessageSelectMenu()
            .setCustomId("help_select")     
            .setPlaceholder("Select a category.")
            .setOptions(options)
        const actionRow = new MessageActionRow().addComponents(helpSelectMenu)
        const message = await interaction.reply({ embeds: [ helpEmbed ], components: [ actionRow ], fetchReply: true })
        const filter = async (i) => { await i.deferUpdate() }
        const menuCollector = message.createMessageComponentCollector({ filter, componentType: "SELECT_MENU", time: 10000 })

        menuCollector.on("collect", async (i) => {
            if (i.user.id === interaction.user.id) {
                const helpEditedEmbed = new MessageEmbed()
                    .setTitle("A message!")
                    .setColor("#FF0000")
                    .setThumbnail("https://i.imgflip.com/5lxovb.png")
                    .setDescription("Hey Scripto, better finish this help command.")
                    .addField("Values Chosen:", i.values.toString())    
                await i.editReply({ embeds: [ helpEditedEmbed ] })  
            } else {
                await i.reply({ content: "This isn't for you lmao.", ephemeral: true })
            }
        })
    }
}