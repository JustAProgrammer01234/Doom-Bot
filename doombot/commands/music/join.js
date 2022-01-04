const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: SlashCommandBuilder().setName("join").setDescription("Tells the bot to join vc."),
    execute: async (interaction) => {
        await interaction.reply("In development.")
    }
}