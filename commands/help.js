const { SlashCommandBuilder, quote, bold } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    execute: async (interaction) => {
        const commands = await interaction.client.application.commands.fetch()
            .then((cmds) => {
                return cmds
            })
        let cmdList = ""
            
        for (const cmd of commands.values()) {
            cmdList += `${quote(cmd.name)} ${bold("->")} ${cmd.description}\n`
        }

        helpEmbed = new MessageEmbed()
            .setTitle("All help is down below!")
            .setThumbnail("https://i.imgflip.com/5lxovb.png")
            .addField("Commands:", cmdList)
            .setColor("#FF0000")
        await interaction.reply({ embeds: [ helpEmbed ] })
    }
}