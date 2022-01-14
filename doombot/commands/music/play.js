const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("play").setDescription("Tells the bot to play some damn music in vc.")
        .addStringOption(option => {
            option.setName("query")
                .setDescription("The song to search for.")
                .setRequired(true)
        }),
    execute: async (interaction, assets) => {
        const botVoice = interaction.guild.me.voice.channel
        const voiceChannel = interaction.member.voice.channel
        const query = interaction.options.getString("query")

        let player

        if (!voiceChannel) {
            return await interaction.reply("You must be in a vc lmao.")
        }

        if (!botVoice) {
            player = assets.music.create({
                guild: interaction.guild.id,
                voiceChannel: voiceChannel.id,
                textChannel: interaction.channel.id,
                selfDeafen: true
            })
            player.connect()   
        } else {
            player = assets.music.get(interaction.guild.id)
        }

        player = assets.music.get(interaction.guild.id)
        const result = await player.search(query, "soundcloud")
        player.queue.add(result.tracks[0])
        player.play()
    }
}