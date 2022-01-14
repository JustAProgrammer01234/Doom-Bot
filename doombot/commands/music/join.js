const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("join").setDescription("Tells the bot to join vc."),
    execute: async (interaction, assets) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return await interaction.reply("Bruh you must be in a vc.")
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