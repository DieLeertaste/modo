// Importing
const { SlashCommandBuilder } = require('discord.js')

// Creating Slash Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    //Command code
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
};
