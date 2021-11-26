const { SlashCommand } = require("@discordjs/buiders")

module.exports = {
    data: new SlashCommand().setName("ping").setDescription("Replies with the message PONG!"),
    async execute(interaction) {
        await interaction.reply("PONG!")
    }
};