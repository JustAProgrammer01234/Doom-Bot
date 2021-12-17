const { MessageEmbed, GuildMember } = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("userinfo").setDescription("Sends info about a user in discord.")
            .addUserOption((option) => option.setName("user").setDescription("The user to get info from.")),
    execute: async (interaction) => {
        const botId = interaction.client.user.id
        const user = interaction.options.getUser("user")
        const createdTimestamp = Math.round(user.createdTimestamp / 1000)

        let embedTitle
        let isaBot
        let isnotMe 
        let isaMember
        let memberObject

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
            [isaMember, memberObject] = await interaction.guild.members.fetch(user.id)
                .then((data) => {
                    return ["`Yes. (They could be stalking you, better watch out.)`", data]
                })
                .catch(() => {
                    return ["`Nah.`", null]
                })
        }

        const infoEmbed = new MessageEmbed()
            .setAuthor(`${user.username}#${user.discriminator}|ID: ${user.id}`, user.displayAvatarURL())
            .setTitle(`${embedTitle}`)
            .setColor("#FF0000")
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "Are they a bot?", value: `${isaBot}` },
                { name: "Are they a member of this server?", value: `${isaMember}`},
                { name: "When was this account created?", value: `<t:${createdTimestamp}:F> (<t:${createdTimestamp}:R>)`}
            )
            .setTimestamp()

        if (memberObject instanceof GuildMember) {
            let status = memberObject.presence.status
            let activity = memberObject.presence.activities
            let joinedTimestamp = Math.round(memberObject.joinedTimestamp / 1000)
            let activityList = []

            for (const act of activity) {
                if (act.type != "CUSTOM") {
                    activityList.push(`**${act.type}:** \`${act.name}\``)
                }
            }

            infoEmbed.addFields(
                { name: "When did they join this server?", value: `<t:${joinedTimestamp}:F> (<t:${joinedTimestamp}:R>)`},
                { name: "Status:", value: `\`${status}\``},
                { name: "Activity:", value: activityList.join("\n")}
            )
        } else {
            infoEmbed.setFooter("Unfortunately I cannot get more info from this user since they ain't a member of this server. (Blame discord for this bullshit!)")
        }
    
        await interaction.reply({ embeds: [ infoEmbed ] })
    }
}