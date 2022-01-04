const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: SlashCommandBuilder().setName("play").setDescription("Tells the bot to play some damn music in vc."),
    execute: async (interaction) => {
        await interaction.reply("In development.")
    }
}