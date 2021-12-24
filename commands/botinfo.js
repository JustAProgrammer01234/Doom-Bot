const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: SlashCommandBuilder().setName("botinfo").setDescription("Sends info about the bot (which is me btw)."),
    execute: async (interaction) => {
        await interaction.reply("This command is still in development!")
    }
}