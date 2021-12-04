const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("glorykill").setDescription("Replies a random glory kill."),
    async execute(interaction) {
        const glory_kills = [
            "https://tenor.com/view/doom-doom-eternal-glory-kill-doom-glory-kill-doom-eternal-zombie-gif-18694440",
            "https://tenor.com/view/doomslayer-glory-kill-doom-gif-16808615",
            "https://tenor.com/view/doom-eternal-doom-glory-kill-hell-knight-gif-18709596",
            "https://tenor.com/view/doom-eternal-doom-glory-kill-gif-18709574",
            "https://tenor.com/view/doomslayer-doom-eternal-glory-kill-gif-16808609",
            "https://tenor.com/view/doom-pain-elemental-pain-elemental-eternal-gif-15693009",
            "https://tenor.com/view/glory-kill-doom2016-doom-baron-of-hell-gif-18693904",
            "https://tenor.com/view/doom-glory-kill-gif-15907019"
        ];
        random_glory_kill = glory_kills[Math.floor(Math.random() * glory_kills.length)]
        await interaction.reply(random_glory_kill)
    }
}