const { SlashCommandBuilder, time } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("aboutserver").setDescription("Sends info about this server."),
    execute: async (interaction) => {
        const guild = interaction.guild
        const guildDescription = guild.description ? "No badass description provided" : guild.description
        const guildCreatedTimestamp = Math.floor(guild.createdTimestamp / 1000)
        const guildInfoEmbed = new MessageEmbed()
            .setTitle(`Stuff about ${guild.name}`)
            .setDescription(guildDescription)
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