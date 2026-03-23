/**
 * Ready event handler for the Discord Bot.
 * Executes once when the bot successfully connects to Discord.
 *
 * @module events/ready
 */

const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   * Called when the client is ready.
   *
   * @param {import('discord.js').Client} client - The Discord client.
   */
  execute(client) {
    logger.success(`Ready! Logged in as ${client.user.tag}`);
  },
};
