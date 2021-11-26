const { SlashCommand } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommand().setName("glorykill").setDescription("Replies a glory kill."),
    async execute(interaction) {
        await interaction.reply("https://tenor.com/view/doom-doom-eternal-glory-kill-doom-glory-kill-doom-eternal-zombie-gif-18694440")
    }
};