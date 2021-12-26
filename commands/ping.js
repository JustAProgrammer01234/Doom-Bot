const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Sends the bot's websocket heartbeat."),
    execute: async (interaction) => {
        await interaction.reply(`**PONG!** \`${interaction.client.ws.ping}ms\``)
    }
}