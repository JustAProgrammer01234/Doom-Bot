const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("join").setDescription("Tells the bot to join vc."),
    execute: async (interaction, assets) => {
        const botVoice = interaction.guild.me.channel
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return await interaction.reply("Bruh you must be in a vc.")
        }
        if (botVoice) {
            if (botVoice.id !== voiceChannel.id) {
                assets.music.destroy(interaction.guild.id)
            }
        }
        const player = assets.music.create({
            guild: interaction.guild.id,
            voiceChannel: voiceChannel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true
        })
        player.connect()
        await interaction.reply("Successfully connected to voice channel.")
    }
}