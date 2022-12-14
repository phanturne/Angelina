const { SlashCommandBuilder } = require("discord.js");
const { showCard } = require("../../tcgHelper/showInfo");

// @TODO: Implement unique card copy support and card statistics
module.exports = {
    data: new SlashCommandBuilder()
        .setName("card")
        .setDescription("Display a card and its stats. ")
        .addStringOption(option =>
            option.setName('id')
                .setDescription('Enter a card ID or a the unique ID of a specific copy of the card.')
                .setRequired(true)),
    async execute(interaction) {
        const cardId = interaction.options.getString("id");
        await showCard(interaction, cardId);
    }
}
