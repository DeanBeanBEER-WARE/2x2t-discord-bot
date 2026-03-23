/**
 * InteractionCreate event handler.
 * Listens for slash command executions and routes them to the correct command module.
 *
 * @module events/interactionCreate
 */

const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
  name: Events.InteractionCreate,
  /**
   * Called whenever an interaction is created (e.g., slash command).
   *
   * @param {import('discord.js').Interaction} interaction - The interaction object.
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(`Error executing ${interaction.commandName}`, error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  },
};
