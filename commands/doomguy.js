const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder().setName("doomguy").setDescription("Sends a pic of doomguy."),
    async execute(interaction) {
        doomguyEmbed = new MessageEmbed()
            .setTitle("Doomguy:")
            .setColor("#FF0000")
            .setImage("https://www.denofgeek.com/wp-content/uploads/2017/07/doom.png?fit=1250%2C895");
            await interaction.reply({embeds: [ doomguyEmbed ]});
    }
}