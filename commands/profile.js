const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder().setName("profile").setDescription("Sends the profile of a user.")
        .addUserOption((option) => option.setName("user").setDescription("The user to get the profile from.").setRequired(true)),
    execute: async (interaction) => {
        const user = interaction.options.getUser("user")
        await interaction.reply(user.displayAvatarURL())
    }
}