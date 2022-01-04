const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("leave").setDescription("Tells the bot to leave vc."),
    execute: async (interaction) => {
        await interaction.reply("In development.")
    }
}