const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("userinfo").setDescription("Sends info about a user in discord.")
            .addUserOption((option) => option.setName("user").setDescription("The user to get info from.")),
    execute: async (interaction) => {
        const botId = interaction.client.user.id
        const user = interaction.options.getUser("user")

        let embedTitle = null
        let embedColor = null
        let isaBot = null
        let isaMember = null
        let isnotMe = false 

        if (user.id === botId) {
            embedTitle = `About ${user.username}: (Hey that's me!)`
            isaBot = "`If your puny little mind thinks I'm not a bot then consider going to a mental hospital.`"
            isaMember = "`That should be self explanatory.`"
            embedColor = "#FF0000"
        } else {
            isnotMe = true 
        }

        if (isnotMe) {
            embedColor = user.accentColor
            if (user.bot) {
                isaBot = "`Nah.`"
            } else {
                isaBot = "`Yup, just like me.`"
            }
            interaction.guild.member.fetch(user.id)
                .then(() => isaMember = "`Yes. (He/She could be stalking you, better watch out.)`")
                .catch(() => isaMember = "`Nah.`")
        }

        const infoEmbed = new MessageEmbed()
            .setTitle(`${embedTitle}`)
            .setColor(embedColor)
            .setThumbnail(user.avatarURL())
            .addField("General info:", `> Is it a bot?\n    **->** ${isaBot}\n> When was this account created?\n    **->** \`${user.createdAt.now}\`\n> Is it member of this server?\n  **->** ${isaMember}`)
            
        await interaction.reply({ embeds: [ infoEmbed ] })
    }
}