const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    async execute(interaction, client) {
        helpEmbed = new MessageEmbed()
            .setTitle("All help is down below!")
            .setThumbnail("https://tenor.com/view/brutal-doom-doom-fighting-gif-15617995")
            .setColor("#FF0000");
        for (const cmd of client.commands) {
            helpEmbed.addField(cmd.data.name, cmd.data.description);
        }
        await interaction.reply({ embeds: [ helpEmbed ] });
    }
}