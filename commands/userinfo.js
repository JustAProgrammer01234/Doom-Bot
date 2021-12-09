const { MessageEmbed} = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: SlashCommandBuilder().setName("userinfo").setDescription("Sends info about a user in discord.")
        .addUserOption((option) => {
            option.setName("user").setDescription("The user to get info from.")
        }),
    execute: async (interaction) => {
        const botId = interaction.client.user.id
        const user = interaction.options.getUser("user")

        let embedTitle = null
        let isaBot = null
        let isaMember = null

        if (user.id === botId) {
            embedTitle = `About ${user.username}: (Hey that's me!)`
            isaBot = "`If your puny little mind thinks I'm not a bot then consider going to a mental hospital.`"
            isaMember = "`That should be self explanatory.`"
        } else {
            if (user.bot) {
                isaBot = "`Nah.`"
            } else {
                isaBot = "`Yup, just like me.`"
            }
            await interaction.guild.member.fetch(user.id)
            .then(() => {
                isaMember = "`Yes. (He/She could be stalking you, better watch out.)`"
            })
            .catch(() => {
                isaMember = "`Nah.`"
            })
        }

        const infoEmbed = MessageEmbed()
            .setTitle(`${embedTitle}`)
            .setColor(user.accentColor)
            .setThumbnail(user.avatarURL())
            .addField("General info:", `Is it a bot? ${isaBot}\nWhen was this account created? \`${user.createdAt.now()}\`\nIs it member of this server? ${isaMember}`)
            
        await interaction.reply({ embeds: [ infoEmbed ] })
    }
}