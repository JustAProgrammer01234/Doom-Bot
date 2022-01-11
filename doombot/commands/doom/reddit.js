const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("reddit").setDescription("Sends a post from the r/Doom subreddit."),
    execute: async (interaction) => {
        await interaction.reply("In development.")
    }
}