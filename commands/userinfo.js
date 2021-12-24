const { MessageEmbed, GuildMember } = require('discord.js')
const { SlashCommandBuilder, inlineCode, bold, time } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("userinfo").setDescription("Sends info about a user in discord.")
            .addUserOption((option) => option.setName("user").setDescription("The user to get info from.").setRequired(true)),
    execute: async (interaction) => {
        const botId = interaction.client.user.id
        const user = interaction.options.getUser("user")
        const createdTimestamp = Math.floor(user.createdTimestamp / 1000)
        const isMe = user.id === botId

        let embedTitle
        let isaBot
        let isnotMe 
        let isaMember
        let memberObject

        if (isMe) {
            embedTitle = `About ${user.username}: (Hey that's me!)`
            isaBot = inlineCode("If your dumbass mind thinks I'm not a bot then consider going to a mental hospital.")
            isaMember = inlineCode("That should be self explanatory.")
        } else {
            isnotMe = true 
        }

        if (isnotMe) {
            embedTitle = `About ${user.username}:`
            if (user.bot) {
                isaBot = inlineCode("Yup, just like me.")
            } else {
                isaBot = inlineCode("Nah.")
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
            .setAuthor(`${user.username}#${user.discriminator} | ID: ${user.id}`, user.displayAvatarURL())
            .setTitle(`${embedTitle}`)
            .setColor("#FF0000")
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "Are they a bot?", value: `${isaBot}` },
                { name: "Are they a member of this server?", value: `${isaMember}`},
                { name: "When was this account created?", value: `${time(createdTimestamp, "F")} (${time(createdTimestamp, "R")})`}
            )
            .setTimestamp()

        if (memberObject instanceof GuildMember) {
            const status = (!memberObject.presence) ? "offline":memberObject.presence.status
            const joinedTimestamp = Math.floor(memberObject.joinedTimestamp / 1000)
             
            let activity = memberObject.presence?.activities
            let activitiesDoing = ""

            if (activity instanceof Array) {
                activity = activity.slice(1)
                if (activity.length > 0) {
                    for (const act of activity) {
                        activitiesDoing += `${bold(act.type)}: ${inlineCode(act.name)}\n`
                    }
                } else {
                    activitiesDoing += inlineCode("They aren't doing anything yet LMAO.")
                }
            } else {
                activitiesDoing += inlineCode("They aren't doing anything yet since they're REALLY offline.")
            }

            infoEmbed.setDescription(`Status: ${status}\nRoles assigned: ${memberObject.roles.cache.size}`)
            infoEmbed.addFields(
                { name: "When did they join this server?", value: `${time(joinedTimestamp, "F")} (${time(joinedTimestamp, "R")})`},
                { name: "Activities doing:", value: activitiesDoing}
            )
        } else if (isMe) {
            infoEmbed.setFooter("For more info about me try using the /botinfo command.")
        } else {
            infoEmbed.setFooter("Unfortunately I cannot get more info from this user since they ain't a member of this server. (Blame discord for this bullshit!)")
        }
    
        await interaction.reply({ embeds: [ infoEmbed ] })
    }
}