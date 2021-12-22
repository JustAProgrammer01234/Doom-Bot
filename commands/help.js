const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Sends all the commands and stuff about Doom Bot FYI."),
    execute: async (interaction) => {
        const cmdList = []
        const commands = await interaction.client.application.commands.fetch()
            .then((cmds) => {
                return cmds
            })
            .catch(console.error)

        console.log(commands)

        for (const cmd of commands) {
            cmdList.push(`\`/${cmd.name}\` **->** ${cmd.description}`)
        }

        helpEmbed = new MessageEmbed()
            .setTitle("All help is down below!")
            .setThumbnail("https://i.imgflip.com/5lxovb.png")
            .addField("Commands:", cmdList.join("\n"))
            .setColor("#FF0000")
        await interaction.reply({ embeds: [ helpEmbed ] })
    }
}