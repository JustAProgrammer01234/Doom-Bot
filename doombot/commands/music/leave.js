const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("leave").setDescription("Tells the bot to leave vc."),
    execute: async (interaction, assets) => {
        if (!interaction.guild.me.voice.channel) {
            return await interaction.reply("I'm not in a vc lmao.")
        }
        const guildId = interaction.guild.id
        const player = assets.music.get(guildId)
        const exitMessages = [
            "Please don't make me leave! There's more music to play!",
            "Let's beat it -- This is turning into a bloodbath!",
            "I wouldn't make myself leave if I were you. Other music bots are much worse.",
            "Don't leave yet -- There's so much things that we can do here!",
            "Ya know, next time you make me join a vc, I'm gonna toast ya.",
            "Go ahead and make me leave. See if I care.",
            "Are you sure you want to quit this great experience?"
        ]
        const exitMessage = exitMessages[Math.floor(Math.random() * exitMessages.length)]
        const yesButton = new MessageButton()
            .setCustomId("yes")
            .setLabel("Yes")
            .setStyle("SUCCESS")
        const noButton = new MessageButton()
            .setCustomId("no")
            .setLabel("No")
            .setStyle("DANGER")
        const buttons = new MessageActionRow().addComponents(yesButton, noButton)
        const leaveEmbed = new MessageEmbed()
            .setTitle("Wanna quit?")
            .setDescription(exitMessage)
        const message = await interaction.reply({ embeds: [ leaveEmbed ], components: [ buttons ], fetchReply: true })
        const buttonCollector = message.createMessageComponentCollector({ componentType: "BUTTON" })

        buttonCollector.on("collect", async (i) => {

            function disableButtons() {
                return new MessageActionRow().addComponents(
                    yesButton.setDisabled(),
                    noButton.setDisabled()
                )
            }

            if (i.user.id === interaction.user.id) {
                await i.deferUpdate()
                if (i.customId == "yes") {
                    player.destroy()
                    await i.editReply({ components: [ disableButtons() ]})
                } else {
                    await i.editReply({ components: [ disableButtons() ]})
                }
            } else {
                await i.reply({ content: "This isn't for you lmao.", ephemeral: true })
            }
        })
    }
}