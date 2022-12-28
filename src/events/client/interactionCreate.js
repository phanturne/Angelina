const { Events, InteractionType } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            // Get matching command from client.commands
            const command = interaction.client.commands.get(interaction.commandName);

            // If no matching command is found, log the error to the error and ignore the event
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            // Call the command's execute(). Catch any log any errors to the console.
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return new Error('Button has not been set up.');

            try {
                await button.execute(interaction, client)
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isStringSelectMenu()) {
            const menu = client.selectMenus.get(interaction.customId);
            if (!menu) return new Error('Select menu has not been set up.');

            try {
                await menu.execute(interaction, client)
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const modal = client.modals.get(interaction.customId);
            if (!modal) return new Error('Modal has not been set up');

            try {
                await modal.execute(interaction, client)
            } catch (error) {
                console.error(error);
            }
        }
    },
    // @ TODO: Autocomplete doesn't work for some reason
    // async autocomplete(interaction) {
    //     console.log("auto");
    //     // Ignore the event if it is not a chat input command
    //     if (!interaction.isAutocomplete()) return;
    //
    //     // Get matching command from client.commands
    //     const command = interaction.client.commands.get(interaction.commandName);
    //
    //     // If no matching command is found, log the error to the error and ignore the event
    //     if (!command) {
    //         console.error(`No command matching ${interaction.commandName} was found.`);
    //         return;
    //     }
    //
    //     // Call the command's execute(). Catch any log any errors to the console.
    //     try {
    //         await command.autocomplete(interaction);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },
};