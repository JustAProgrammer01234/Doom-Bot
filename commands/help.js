const { commands } = require("../index.js")
const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    execute: async (interaction) => {
        cmdList = []
        for (const cmd of commands.values()) {
            cmd_list.push(`\`/${cmd.data.name}\` **->** ${cmd.data.description}`)
        }
        helpEmbed = new MessageEmbed()
            .setTitle("All help is down below!")
            .setThumbnail("https://i.imgflip.com/5lxovb.png")
            .addField("Commands:", cmdList.join("\n"))
            .setColor("#FF0000")
        await interaction.reply({ embeds: [ helpEmbed ] })
    }
}