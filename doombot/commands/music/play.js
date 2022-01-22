const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("play").setDescription("Tells the bot to play some damn music in vc.")
        .addStringOption((option) => option.setName("query").setDescription("The song to search for.").setRequired(true)),
    execute: async (interaction, assets) => {
        await interaction.reply("me too dumb to do this big sadge")
    }
}