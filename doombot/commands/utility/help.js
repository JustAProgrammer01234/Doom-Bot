const { SlashCommandBuilder, inlineCode, bold} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

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
        const exitButton = new MessageButton()
            .setCustomId("exit")
            .setLabel("Exit")
            .setStyle("DANGER")
        const helpSelectMenu = new MessageSelectMenu()
            .setCustomId("help_select")     
            .setPlaceholder("Select a category.")
            .setOptions(options)
        const menu = new MessageActionRow().addComponents(helpSelectMenu)
        const button = new MessageActionRow().addComponents(exitButton)
        const message = await interaction.reply({ embeds: [ helpEmbed ], components: [ menu, button ], fetchReply: true })
        const menuCollector = message.createMessageComponentCollector({ componentType: "SELECT_MENU" })
        const buttonCollector = message.createMessageComponentCollector({ componentType: "BUTTON" })

        menuCollector.on("collect", async (i) => {
            if (i.user.id === interaction.user.id) {
                commands = ""
                chosenCategory = i.values.toString()
                for (cmd of assets.get(chosenCategory)) {
                    commands += `${inlinecode(`/${cmd[0]}`)} ${bold("->")} ${cmd[1]}\n`
                }
                const helpEditedEmbed = new MessageEmbed()
                    .setTitle(`${chosenCategory[0].toUpperCase() + chosenCategory.slice(1)} category`)
                    .setColor("#FF0000")
                    .setThumbnail("https://i.imgflip.com/5lxovb.png")
                    .addField("Commands:", commands) 
                    
                await i.deferUpdate()
                await i.editReply({ embeds: [ helpEditedEmbed ] })  
            } else {
                await i.reply({ content: "This isn't for you lmao.", ephemeral: true })
            }
        })
    
        buttonCollector.on("collect", async (i) => {
            await i.deferUpdate()
            await i.editReply({ components: [
                new MessageActionRow().addComponents(helpSelectMenu.setDisabled(true)),
                new MessageActionRow().addComponents(exitButton.setDisabled(true))
            ]})
        })
    }
}