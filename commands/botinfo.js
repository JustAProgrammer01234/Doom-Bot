const { SlashCommandBuilder, strikethrough, inlineCode, time } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("botinfo").setDescription("Sends info about the bot (which is me btw)."),
    execute: async (interaction) => {
        const doomBot = interaction.client
        const readyAt = Math.floor(doomBot.readyTimestamp / 1000)

        await doomBot.application.fetch()

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Source")
                    .setStyle("LINK")
                    .setURL("https://github.com/JustAProgrammer01234/Doom-Bot")
                    .setEmoji("923803162148741130")
            )
        const botinfoEmbed = new MessageEmbed()
            .setTitle("Some info about me:")
            .setColor("#FF0000")
            .setThumbnail(doomBot.user.avatarURL())
            .setDescription(doomBot.application.description)
            .addFields(
                { name: "Creator:", value: `${strikethrough(inlineCode("Davoth"))} ${inlineCode(doomBot.application.owner.username)}`},
                { name: "Started logging into Discord at:", value: `${time(readyAt, "F")} (${time(readyAt, "R")})`},
                { name: "Stats:", value: `Servers I'm in: ${doomBot.guilds.cache.size}\n` +
                `Channels I'm currently handling: ${doomBot.channels.cache.size}` 
                }
            )
        await interaction.reply({ embeds: [ botinfoEmbed ], components: [ row ] })
    }
}