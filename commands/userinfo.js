const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("userinfo").setDescription("Sends info about a user in discord.")
            .addUserOption((option) => option.setName("user").setDescription("The user to get info from.")),
    execute: async (interaction) => {
        const botId = interaction.client.user.id
        const user = interaction.options.getUser("user")

        let embedTitle = null
        let isaBot = null
        let isaMember = null
        let isnotMe = false 

        if (user.id === botId) {
            embedTitle = `About ${user.username}: (Hey that's me!)`
            isaBot = "`If your puny little mind thinks I'm not a bot then consider going to a mental hospital.`"
            isaMember = "`That should be self explanatory.`"
        } else {
            isnotMe = true 
        }

        if (isnotMe) {
            embedTitle = `About ${user.username}:`
            if (user.bot) {
                isaBot = "`Yup, just like me.`"
            } else {
                isaBot = "`Nah.`" 
            }
            interaction.guild.members.fetch(user.id)
                .then((guildMember) => {
                    isaMember = true
                    console.log(isaMember) 
                })
                .catch((error) => {
                    isaMember = false 
                    console.log(isaMember)
                })
        }

        const infoEmbed = new MessageEmbed()
            .setTitle(`${embedTitle}`)
            .setColor("#FF0000")
            .setThumbnail(user.avatarURL())
            .addField("General info:", `> Is it a bot?\n**->** ${isaBot}\n> When was this account created?\n**->** <t:${user.createdTimestamp}:F>\n> Is it member of this server?\n**->** ${isaMember}`)
    
        await interaction.reply({ embeds: [ infoEmbed ] })
    }
}