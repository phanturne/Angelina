const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Ignore the event if it is not a chat input command
        if (!interaction.isChatInputCommand()) return;

        // Get matching command from client.commands
        const command = interaction.client.commands.get(interaction.commandName);

        // If no matching command is found, log the error to the error and ignore the event
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        // Call the command's execute(). Catch any log any errors to the console.
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};