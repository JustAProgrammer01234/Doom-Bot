const { SlashCommandBuilder, strikethrough, time } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("botinfo").setDescription("Sends info about the bot (which is me btw)."),
    execute: async (interaction) => {
        const doomBot = interaction.client
        const readyAt = Math.floor(doomBot.readyTimestamp / 1000)
        const botinfoEmbed = new MessageEmbed()
            .setTitle("Some info about me:")
            .setDescription(`Creator: ${strikethrough("Davoth")} ${doomBot.application.owner.username}
            Started logging into discord at: 
            ${time(Math.floor(readyAt), "F")} (${time(Math.floor(readyAt), "R")})
            Servers I'm in: ${doomBot.guilds.cache.size}`)
            .setColor("#FF0000")
            .setThumbnail(doomBot.user.avatarURL())
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Source")
                    .setStyle("LINK")
                    .setURL("https://github.com/JustAProgrammer01234/Doom-Bot")
                    .setEmoji("923803162148741130")
            )
        await interaction.reply({ embeds: [botinfoEmbed], components: [row] })
    }
}