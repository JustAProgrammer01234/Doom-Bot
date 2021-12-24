const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("botinfo").setDescription("Sends info about the bot (which is me btw)."),
    execute: async (interaction) => {
        const botinfoEmbed = MessageEmbed()
            .setTitle("Some info about me:")
            .setDescription("Never gonna give you up.")
            .setColor("#FF0000")
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Source")
                    .setStyle("LINK")
                    .setURL("https://github.com/JustAProgrammer01234/Doom-Bot")
                    .setEmoji("923803162148741130")
            )
        await interaction.reply({ embeds: [botinfoEmbed], components: [row]})
    }
}