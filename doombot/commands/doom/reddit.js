const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: SlashCommandBuilder().setName("reddit").setDescription("Sends a post in the r/Doom subreddit."),
    execute: async (interaction) => {
        await interaction.reply("In development.")
    }
}