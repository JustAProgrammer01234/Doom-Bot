const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("play").setDescription("Tells the bot to play some damn music in vc."),
    execute: async (interaction) => {
        await interaction.reply("In development.")
    }
}