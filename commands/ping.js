const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Sends the bot's websocket heartbeat."),
    execute: async (interaction, client) => {
        await interaction.reply(`**PONG!** \`${client.ws.ping}ms\``);
    }
};