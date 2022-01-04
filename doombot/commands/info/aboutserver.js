const { SlashCommandBuilder, time } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: SlashCommandBuilder().setName("aboutserver").setDescription("Sends info about this server."),
    execute: async (interaction) => {
        const guild = interaction.guild
        const guildCreatedTimestamp = Math.floor(guild.createdTimestamp / 1000)
        const guildInfoEmbed = new MessageEmbed()
            .setTitle(`Stuff about ${guild.name}`)
            .setDescription(guild.description)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor("#FF0000")
            .addFields(
                { name: "When was this server created?", value: `${time(guildCreatedTimestamp, "F")} (${time(guildCreatedTimestamp, "R")})`},
                { name: "Number of:", value: `Members: ${guild.members.cache.size}\n` + 
                `Channels: ${guild.channels.cache.size}\n` + 
                `Roles: ${guild.roles.cache.size}\n` + 
                `Banned users: ${guild.bans.cache.size}\n` + 
                `Emojis: ${guild.emojis.cache.size}\n` + 
                `Stickers: ${guild.stickers.cache.size}`
                }
            )
        await interaction.reply({ embeds: [ guildInfoEmbed ]})
    }
}